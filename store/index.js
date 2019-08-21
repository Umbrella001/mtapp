/**
 * descripe: 创建store实例 配合SSR 提供给页面调用Store库中的方法及获取内部的数据
 * author: umbrella
 * data: 2019-6-30AM13:07:48
 * -------------说明--------------
 * -- 导入Vue、Vuex必备包 || 其次导入需要被页面调用的Store库geo、home
 * -- 配置各自管理的模版名称geo、home,之后页面拿state中的数据就是通过modules区分,
 *    例如拿geo中state容器中的数据city → $store.state.geo.position.city
 * -- 使用nuxt中的nuxtServerInit生命周期函数 → 进行页面载入时就已经执行了Store中相关的路由方法
 * -- 注意点：由于页面实例还没渲染到页面，因此只能通过app根节点进行$axios的请求
 */
import Vue from 'vue'
import Vuex from 'vuex'
import geo from './modules/geo'
import home from './modules/home'

Vue.use(Vuex)

const store = () => new Vuex.Store({
    modules: {
        geo,
        home
    },
    actions: {
        async nuxtServerInit({
            commit
        }, {
            req,
            app
        }) {

            const {
                status,
                data: {
                    province,
                    city
                }
            } = await app.$axios.get('/geo/getPosition')
            commit('geo/setPosition', status === 200 ? {
                city,
                province
            } : {
                city: '',
                province: ''
            })

            const {
                status: status2,
                data: {
                    menu
                }
            } = await app.$axios.get('/geo/menu')
            commit('home/setMenu', status2 === 200 ? menu : [])

            const {
                status: status3,
                data: {
                    result
                }
            } = await app.$axios.get('/search/hotPlace', {
                params: {
                    city: app.store.state.geo.position.city.replace('市', '')
                }
            })
            commit('home/setHotPlace', status3 === 200 ? result.slice(0, 4) : [])

        }
    }
})
export default store
