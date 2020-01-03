import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const types = {
    SET_IS_AUTNENTIATED: 'SET_IS_AUTNENTIATED', // 是否认证通过
    SET_USER: 'SET_USER' // 用户信息
}

const state = {
    isAutnenticated: false, // 是否认证
    user: {}, // 存储用户信息
    isfold:Boolean, // 是否展开侧边栏
}
const getters = {
    isAutnenticated: state => state.isAutnenticated,
    user: state => state.user
}
const mutations = {
    TOGGLE_SIDEBAR:state=>{
        state.isfold = !state.isfold
    },
    [types.SET_IS_AUTNENTIATED](state, isAutnenticated) {
        if (isAutnenticated)
            state.isAutnenticated = isAutnenticated
        else
            state.isAutnenticated = false
    },
    [types.SET_USER](state, user) {
        if (user)
            state.user = user
        else
            state.user = {}
    }
}
const actions = {
    toggleSideBar({ commit }) {
        commit('TOGGLE_SIDEBAR')
      },
    setIsAutnenticated: ({ commit }, isAutnenticated) => {
        commit(types.SET_IS_AUTNENTIATED, isAutnenticated)
    },
    setUser: ({ commit }, user) => {
        commit(types.SET_USER, user)
    },
    clearCurrentState: ({ commit }) => {
        commit(types.SET_IS_AUTNENTIATED, false)
        commit(types.SET_USER, null)
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})