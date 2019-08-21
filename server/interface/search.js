/**
 * descripe: 搜索栏及推荐列表的接口设置
 * author: umbrella
 * date: 2018-6-28PM21:39:01
 * --------------------说明-----------------------
 * --koa-router路由 || 引入封装的axios数据通讯 || 引入相对应的线下数据表Poi（如果使用的话）
 * --定义路由主体的前缀
 * --定义接口  获取搜索时显示的内容接口top || 根据定位获取推荐景点接口hotPlace || 获取当前城市推荐的图文数据接口resultsByKeywords
 * --导出路由router  
 */
import Router from 'koa-router'
import axios from './utils/axios'
import Poi from '../dbs/models/poi'

// 请求页面接口请求前缀
let router = new Router({
    prefix: '/search'
})

// 获取搜索时显示的内容接口
router.get('/top', async (ctx) => {
    let {
        status,
        data: {
            top
        }
    } = await axios.get('http://cp-tools.cn/search/top?sign', {
        params: {
            input: ctx.query.input,
            city: ctx.query.city
        }
    })
    ctx.body = {
        top: status === 200 ? top : []
    }
})

// 获取当前城市推荐的图文数据接口
router.get('/resultsByKeywords', async (ctx) => {
    const {
        city,
        keyword
    } = ctx.query
    let {
        status,
        data: {
            count,
            pois
        }
    } = await axios.get('http://cp-tools.cn/search/resultsByKeywords?sign', {
        params: {
            city,
            keyword
        }
    })
    ctx.body = {
        count: status === 200 ? count : 0,
        pois: status === 200 ? pois : []
    }
})

// 根据定位获取推荐景点接口
router.get('/hotPlace', async (ctx) => {
    let city = ctx.store ? ctx.store.geo.position.city : ctx.query.city;
    let {
        status,
        data: {
            result
        }
    } = await axios.get('http://cp-tools.cn/search/hotPlace?sign', {
        params: {
            city
        }
    })
    ctx.body = {
        result: status === 200 ? result : []
    }
})
export default router
