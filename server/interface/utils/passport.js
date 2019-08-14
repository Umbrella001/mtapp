/**
 * descripe: 配置相关的passpost
 * author: umbrella
 * date: 018-6-28PM19:44:18
 * ---------------说明----------------
 * --导包passport 适用于koa的passport实现路由进入前登陆验证 || 同理适用于koa的Local策略包 ||
 *   导入mongoose模型
 * --参考passport官网：http://www.passportjs.org/
 * --使用本地策略LocalStrategy实现简单的登陆查询,注册添加的校验
 * --参数说明 username用户输入的账户名 || password用户输入的密码 || done回调函数
 * --导出passport
 */
import passport from 'koa-passport'
import LocalStrategy from 'passport-local'
import UserModel from '../../dbs/models/users'

passport.use(new LocalStrategy(async function(username,password,done){
    // 使用koa特色的异步async和await完成校验
    let where = {
        username
    };
    // 在数据库mongoose模型中查询username用户名
    let result = await UserModel.findOne(where)
    if(result!=null){
        // 用户名存在时,检查数据库存储的密码是否一致
        if(result.password===password){
            return done(null,result)
        }else{
            return done(null,false,'密码错误')
        }
    }else{
        return done(null,false,'用户名不存在')
    }
}))

// 用户每次登陆成功时,将数据存储进筛选中，然后通过筛选读取用户对象序列化及反序列化
passport.serializeUser(function(user,done){
    done(null,user)
})

passport.deserializeUser(function(user,done){
    return done(null,user)
})

export default passport