export default {
    dbs: 'mongodb://127.0.0.1:27017/mtapp', // 连接默认mongondb（默认端口27017）/{数据库名称}
    redis:{   // 配置redis
        get host(){
            return '127.0.0.1'  // 只读host
        },
        get port(){
            return 6379         // 只读端口
        }
    },
    smtp:{    // 配置smtp服务
        get host(){
            return 'stmp.qq.com'        // stmpqq的host
        },
        get user(){
            return '2043278154@qq.com'  // 项目使用的qq邮箱
        },
        get pass(){
            return 'hrhypacrzilkedai'   // 授权码
        },
        get code(){                     // 随机生成16进制的4位随机码
            return ()=>{
                return Math.random().toString(16).slice(2,6).toUpperCase();
            }
        },
        get expire(){                   // 验证码有效时间1h
            return ()=>{
                return new Date().getTime()+60*60*1000
            }
        }

    }
}