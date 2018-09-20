import Vue from 'vue'

export const USERINFO_SIGN = 'USERINFO_SIGN' //微信用户信息
export const USERINFO_SIGNOUT = 'USERINFO_SIGNOUT' //清楚用户信息

export default {
    state: JSON.parse(sessionStorage.getItem('userinfo')) || {},
    mutations: {
        [USERINFO_SIGN](state, userinfo) {
            sessionStorage.setItem('userinfo', JSON.stringify(userinfo))
            Object.assign(state, userinfo)
        },
         [USERINFO_SIGNOUT](state) {
            sessionStorage.removeItem('userinfo')
            Object.keys(state).forEach(k => Vue.delete(state, k))
        }
        
    },
    actions: {
        [USERINFO_SIGN]({commit}, userinfo) {
            commit(USERINFO_SIGN, userinfo)
        },
         [USERINFO_SIGNOUT]({commit}) {
            commit(USERINFO_SIGNOUT)
        }
       
    }
}