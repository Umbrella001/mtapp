/**
 * descripe: 配置home数据的vuex管理状态store
 * author: umbrella
 * data: 2019-6-29PM22:23:11
 * --------------说明-----------------
 * --state相当于数据的储存库
 * --mutations放置同步逻辑去操纵请求数据放入state中
 * --actions放置异步逻辑并且通过commit启用mutations
 * --最后对外暴露state mutations actions
 */
const state = () => ({
    menu: [],
    hotPlace: []
})

const mutations = {
    setMenu(state, val) {
        state.menu = val
    },
    setHotPlace(state, val) {
        state.hotPlace = val
    }
}

const actions = {
    setMenu: ({
        commit
    }, menu) => {
        commit('setMenu', menu)
    },
    setHotPlace: ({
        commit
    }, hotPlace) => {
        commit('setHotPlace', hotPlace)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
