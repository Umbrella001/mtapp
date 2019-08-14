/**
 * describe: 数据库mongodb、redis服务、smtp邮箱服务基本配置
 * author: umbrella
 * date: 2018-6-28PM16:36:54
 * --------------------说明------------------------
 * 导出一个对象export default即为配置mongodb的
 * --连接默认mongondb(默认端口27017)/{数据库名称}
 * --配置redis设置只读host(当前主机号)|| 只读端口6379(默认不要乱改)
 * --配置smtp邮箱服务,固定host(stmp.qq.com)|| 开启pop功能的对应邮箱 || 填写功能授权码pass
 *   模拟随机码code方法 || 验证码有效时间expire
 */
export default {
    
    dbs: 'mongodb://127.0.0.1:27017/mtapp', 
    redis:{   
        get host(){
            return '127.0.0.1'  
        },
        get port(){
            return 6379         
        }
    },
    smtp:{
        get host(){
            return 'stmp.qq.com'
        },
        get user(){
            return '2043278154@qq.com'
        },
        get pass(){
            return 'hrhypacrzilkedai'
        },
        get code(){
            return ()=>{
                return Math.random().toString(16).slice(2,6).toUpperCase();
            }
        },
        get expire(){
            return ()=>{
                return new Date().getTime()+60*60*1000
            }
        }

    }
}