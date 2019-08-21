/**
 * descripe: 配置geo数据的vuex管理状态store
 * author: umbrella
 * data: 2019-6-29PM22:59:53
 * --------------说明-----------------
 * --state相当于数据的储存库
 * --mutations放置同步逻辑去操纵请求数据放入state中
 * --actions放置异步逻辑并且通过commit启用mutations
 * --最后对外暴露state mutations actions
 */
const state = () => ({
    position: {}
})

const mutations = {
    setPosition(state, val) {
        state.position = val
    }
}

const actions = {
    setPosition: ({
        commit
    }, position) => {
        commit('setPosition', position)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
