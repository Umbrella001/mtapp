import Router from 'koa-router'
import Redis from 'koa-redis'
import nodeMailer from 'nodemailer'
import User from '../dbs/models/users'
import Passport from './utils/passport'
import Email from '../dbs/config'
import axios from './utils/axios'

let router = new Router({
    prefix:'/users'
})

let Store = new Redis().client

router.post('/signup',async(ctx)=>{
    const {
        username,
        password,
        email,
        code
    } = ctx.request.body

    if(code){
        const saveCode = await Store.hget(`nodemail:${username}`,'code');
        const saceExpire = await Store.hget(`nodemail:${username}`,'expire');
        if(code === saveCode){
            if(new Date().getTime() - saceExpire > 0){
                ctx.body = {
                    code: -1,
                    msg: '验证码已过期,请重新发送'   
                }
                return false
              }
            }else{
                ctx.body={
                    code: -1,
                    msg:'请填写正确的验证码'
                }
            }
        }else{
            ctx.body = {
               code: -1,
               msg: '请填写验证码' 
            }
        }
        let user = await User.find({
            username
        })
        if(user.length){
            ctx.body = {
                code: -1,
                msg: '已被注册'
            }
            return 
        }
        let nuser = await User.create({
            username,
            password,
            email
        })
        if(nuser){
            let res = await axios.post('/user/signin',{
                username,
                password
            })
            if(res.data && res.data.code === 0){
                ctx.body = {
                    code: 0,
                    msg: '注册成功',
                    user: res.data.user
                }
            }else{
                ctx.body = {
                    code: -1,
                    msg: 'error'
                } 
            }
        }else{
            ctx.body = {
                code: -1,
                msg: '注册失败'
            }
        }
    })

// 调用passport-local 登录接口
router.post('/signin',async (ctx,next)=>{
    return Passport.authenticate('local',function(err,user,info,status){
        if(err){
            ctx.body = {
                code: -1,
                msg: err
            }
        }else{
            if(user){
                ctx.body = {
                    code: 0,
                    msg: '登录成功',
                    user
                }
                return ctx.login(user)
            }else{
                ctx.body = {
                    code: 1,
                    msg: info
                }
            }
        }
    })(ctx,next)
})

// 验证码接口
router.post('verify',async(ctx,next)=>{
   let username = ctx.require.body.username
   const saceExpire = await Store.hget(`nodemail:${username}`,'expire')
   if(saceExpire && new Date().getTime()-saceExpire<0){
       ctx.body = {
           code: -1,
           msg: '验证请求发送过于频繁,一分钟内请求一次'
       }
       return false
   }
   let transporter = nodeMailer.createTransport({
       host: Email.smtp.host,
       port: 587,
       secure: false,
       auto: {
           user: Email.smtp.user,
           pass: Email.smtp.pass
       }
   })
   let ko = {
       code: Email.smtp.code(),
       expire: Email.smtp.expire(),
       email: ctx.request.body.email,
       user: ctx.request.body.username
   }
   let mailOptions = {
       from: `"认证邮箱"<${Email.smtp.user}>`,
       to: ko.email,
       subject: "《高仿美团模拟项目》注册码",
       html: `您在《高仿美团模拟项目》课程中注册，您的邀请码是${ko.code}`
   }
   await transporter.sendMail(mailOptions,(error,info)=>{
       if(error){
           return console.log('error')
       }else{
           Store.hmset(`nodemail:${ko.user}`,'code',ko.code,'expire',ko.expire,'email',ko.email)
       }
   })
   ctx.body = {
       code: 0,
       msg: '验证码已发送，可能会有延迟，有效期为1分钟'
   }
})

router.get('/exit', async(ctx,next)=>{
    await ctx.logout(); 
    if(!ctx.isAuthenticated()){
        ctx.body = {
           code: 0
        }
    }else{
        ctx.body = {
            code: -1
        }
    }
})

router.get('/getUser',async (ctx)=>{
    if(ctx.isAuthenticated()){
        const {username,email} = ctx.session.Passport.user
        ctx.body = {
            user: username,
            email
        }
    }else{
        ctx.body = {
            user: '',
            email: ''
        }
    }
})