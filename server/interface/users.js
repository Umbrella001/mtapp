/**
 * descripe: 创建mongoose数据库模型面板,并配置必须的库类型
 * author: umbrella
 * date: 2018-6-28PM17:12:09
 * --------------------说明-----------------------
 * --koa-router路由 || koa-redis处理多用户配对多验证码如何准确对号入座(撇去hash表使用redis库) ||
 *   nodeMailer处理使用config配置的邮箱像其他用户邮箱发送邮件的功能包 || 引入mongoose配置的模型表 ||
 *   引入封装的axios数据通讯 || 引入Passport及Email的包配置
 * --定义路由主体的前缀
 * --获取redis客户端
 * --定义注册接口signup || 登录接口signin || 验证码接口verify || 登出接口exit || 获取信息接口getUser
 * --导出路由router  
 */
import Router from 'koa-router'
import Redis from 'koa-redis'
import nodeMailer from 'nodemailer'
import User from '../dbs/models/users'
import Passport from './utils/passport'
import Email from '../dbs/config'
import axios from './utils/axios'

let router = new Router({
    prefix: '/users'
})

// 在Redis创建数据服务端
let Store = new Redis().client

// 用户注册接口
router.post('/signup', async (ctx) => {
    // 通过ES6的解构赋值获取用户输入表单的值,这也是如何拿到post请求体的最简单的方法
    const {
        username,
        password,
        email,
        code
    } = ctx.request.body;

    // 校验验证码 在邮件发验证码时redis立刻存储该验证码,然后业务从redis获取储存的验证码和用户处输入的进行对比
    if (code) {
        // 从Redis使用Store.hget读取hash值,并且拿到当前用户的username和该验证码绑定 key值储存 同理过期时间
        const saveCode = await Store.hget(`nodemail:${username}`, 'code');
        const saveExpire = await Store.hget(`nodemail:${username}`, 'expire');
        // 如果验证码两者相等的话,再判断有效时间
        if (code === saveCode) {
            if (new Date().getTime() - saveExpire > 0) {
                ctx.body = {
                    code: -1,
                    msg: '验证码已过期,请重新发送'
                }
                return false
            }
        } else {
            ctx.body = {
                code: -1,
                msg: '请填写正确的验证码'
            }
        }
    } else {
        ctx.body = {
            code: -1,
            msg: '请填写验证码'
        }
    }
    // 先查验证码是否正确,在判断用户名和密码
    let user = await User.find({
        username
    })
    // 如果在模型数据库表中返回有,则存在该用户名
    if (user.length) {
        ctx.body = {
            code: -1,
            msg: '已被注册'
        }
        return
    }
    // 当没有该用户名,则可以执行数据入库操作
    let nuser = await User.create({
        username,
        password,
        email
    })
    // 写库之后自动执行登录接口,否则则说明写库失败或者网络不稳定
    if (nuser) {
        let res = await axios.post('/users/signin', {
            username,
            password
        })
        if (res.data && res.data.code === 0) {
            ctx.body = {
                code: 0,
                msg: '注册成功',
                user: res.data.user
            }
        } else {
            ctx.body = {
                code: -1,
                msg: 'error'
            }
        }
    } else {
        ctx.body = {
            code: -1,
            msg: '注册失败'
        }
    }
})

// 用户登陆接口
router.post('/signin', async (ctx, next) => {
    // 调用passport中的本地策略local的方法authenticate
    return Passport.authenticate('local', function (err, user, info, status) {
        if (err) {
            ctx.body = {
                code: -1,
                msg: err
            }
        } else {
            if (user) {
                ctx.body = {
                    code: 0,
                    msg: '登录成功',
                    user
                }
                return ctx.login(user) // 执行登录操作
            } else {
                ctx.body = {
                    code: 1,
                    msg: info
                }
            }
        }
    })(ctx, next) // 要传递ctx,next参数给authenticate
})

// 验证码接口
router.post('/verify', async (ctx, next) => {
    let username = ctx.request.body.username;
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire');
    // 防止频繁发送验证码
    if (saveExpire && new Date().getTime() - saveExpire < 0) {
        ctx.body = {
            code: -1,
            msg: '验证请求发送过于频繁,一分钟内请求一次'
        }
        return false
    }
    // 使用nodeMailer实现发邮件的功能
    let transporter = nodeMailer.createTransport({
        host: Email.smtp.host,
        port: 587,
        secure: false, // 监听其他端口
        auth: {
            user: Email.smtp.user,
            pass: Email.smtp.pass
        } // 拿到发邮件的主体邮箱及其授权码
    })
    // ko即为发送的对象邮箱 code即为配置中的验证码 || expire验证码 || email和user都是用户信息
    let ko = {
        code: Email.smtp.code(),
        expire: Email.smtp.expire(),
        email: ctx.request.body.email,
        user: ctx.request.body.username
    }
    // 自定义发送的邮件内容mailOptions
    let mailOptions = {
        from: `"认证邮箱"<${Email.smtp.user}>`, // 发件者
        to: ko.email, // 接收者
        subject: "《高仿美团模拟全栈项目》注册码", // 邮件主体
        html: `您在《高仿美团模拟全栈项目》课程中注册，您的邀请码是${ko.code}` // 邮件内容
    }
    // 完成邮件的相关配置准备,接下来开始发送邮件，Store.hmset向redis存储对应的键值对
    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error)
        } else {
            Store.hmset(`nodemail:${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email)
        }
    })
    // 接口发送成功响应体body
    ctx.body = {
        code: 0,
        msg: '验证码已发送，可能会有延迟，有效期为1分钟'
    }
})

// 用户退出安全保护接口
router.get('/exit', async (ctx, next) => {
    await ctx.logout(); // 执行退出操作
    // 为了安全,执行注销后再次检查是否还为登录状态,isAuthenticated表示为是否登录状态
    if (!ctx.isAuthenticated()) {
        ctx.body = {
            code: 0
        }
    } else {
        ctx.body = {
            code: -1
        }
    }
})

// 用户获取用户名接口
router.get('/getUser', async (ctx) => {
    // 判断为登录状态时,就可以去session中拿到passport存储的user
    if (ctx.isAuthenticated()) {
        const {
            username,
            email
        } = ctx.session.passport.user
        ctx.body = {
            user: username,
            email
        }
    } else {
        ctx.body = {
            user: '',
            email: ''
        }
    }
})

export default router
