/**
 * descripe: 定义城市定位及其城市搜索推荐等接口
 * author: umbrella
 * date: 2018-6-28PM17:12:09
 * --------------------说明-----------------------
 * --koa-router路由 || 引入mongoose配置的模型表 || 引入封装的axios数据通讯
 * --定义路由主体的前缀
 * --获取redis客户端
 * --定义注册接口signup || 登录接口signin || 验证码接口verify || 登出接口exit || 获取信息接口getUser
 * --导出路由router  
 */
import Router from 'koa-router'
import axios from './utils/axios'
import Province from '../dbs/models/province'

// 请求页面接口请求前缀
let router = new Router({
    prefix: '/geo'
})

// 请求页面载入时定位服务的接口
router.get('/getPosition', async (ctx) => {
    let {
        status,
        data: {
            province,
            city
        }
    } = await axios.get('http://cp-tools.cn/geo/getPosition?sign')
    if (status === 200) {
        ctx.body = {
            province,
            city
        }
    } else {
        ctx.body = {
            province: '',
            city: ''
        }
    }
})

//
router.get('/province', async (ctx) => {
    // let province = await Province.find()
    // ctx.body = {
    //     province: province.map(item => {
    //         return {
    //             id: item.id,
    //             name: item.value[0]
    //         }
    //     })
    // }
    let {status,data:{
        province
    }} = await axios.get('http://cp-tools.cn/geo/province?sign')
    ctx.body = {
        province: status === 200 ? province : []
    }
})

// 请求页面菜单中全部分类的接口
router.get('/menu', async (ctx) => {
    let {
        status,
        data: {
            menu
        }
    } = await axios.get('http://cp-tools.cn/geo/menu?sign')
    if (status === 200) {
        ctx.body = {
            menu
        }
    } else {
        ctx.body = {
            menu: []
        }
    }
})

export default router;
