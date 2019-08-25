/**
 * descripe: 定义城市定位及其城市搜索推荐等接口
 * author: umbrella
 * date: 2018-6-28PM17:12:09
 * --------------------说明-----------------------
 * --koa-router路由 || 引入mongoose配置的模型表 || 引入封装的axios数据通讯
 * --定义路由主体的前缀
 * --获取redis客户端
 * --定位服务的接口getPosition || 全国省份province || 请求页面菜单中全部分类的接口menu || 登出接口exit || 
 *   获取信息接口getUser || 获取对应省份当前的城市接口 province/:id || 获取所有城市的接口city || 
 *   获取热门城市的接口 hotcity
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

// 获取线上所有省份接口
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

// 获取对应省份当前的城市接口
router.get('/province/:id', async (ctx) => {
    // let city = await City.findOne({id: ctx.params.id})
    //
    // ctx.body = {
    //   code: 0,
    //   city: city.value.map(item => {
    //     return {province: item.province, id: item.id, name: item.name}
    //   })
    // }
    let {status, data: {
        city
      }} = await axios.get(`http://cp-tools.cn/geo/province/${ctx.params.id}?sign`)
    if (status === 200) {
      ctx.body = {
        city
      }
    } else {
      ctx.body = {
        city: []
      }
    }
})

// 获取所有城市的接口
router.get('/city', async (ctx) => {
    // let city = []
    // let result = await City.find()
    // result.forEach(item => {
    //   city = city.concat(item.value)
    // })
    // ctx.body = {
    //   code: 0,
    //   city: city.map(item => {
    //     return {
    //       province: item.province,
    //       id: item.id,
    //       name: item.name === '市辖区' || item.name === '省直辖县级行政区划'
    //         ? item.province
    //         : item.name
    //     }
    //   })
    // }
    let {status, data: {
        city
      }} = await axios.get('http://cp-tools.cn/geo/city?sign');
    if (status === 200) {
      ctx.body = {
        city
      }
    } else {
      ctx.body = {
        city: []
      }
    }
})

// 获取热门城市的接口
router.get('/hotCity', async (ctx) => {
    // let list = [
    //   '北京市',
    //   '上海市',
    //   '广州市',
    //   '深圳市',
    //   '天津市',
    //   '西安市',
    //   '杭州市',
    //   '南京市',
    //   '武汉市',
    //   '成都市'
    // ]
    // let result = await City.find()
    // let nList = []
    // result.forEach(item => {
    //   nList = nList.concat(item.value.filter(k => list.includes(k.name) || list.includes(k.province)))
    // })
    // ctx.body = {
    //   hots: nList
    // }
    let {status, data: {
        hots
      }} = await axios.get('http://cp-tools.cn/geo/hotCity?sign');
    if (status === 200) {
      ctx.body = {
        hots
      }
    } else {
      ctx.body = {
        hots: []
      }
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
