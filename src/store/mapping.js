import Vue from 'vue'

export const MAPPING_SIGN = 'MAPPING_SIGN' //选择的定位
export const MAPPING_SIGNOUT = 'MAPPING_SIGNOUT' //退出登录

export default {
    state: JSON.parse(sessionStorage.getItem('mapping')) || {},
    mutations: {
        [MAPPING_SIGN](state, mapping) {
            sessionStorage.setItem('mapping', JSON.stringify(mapping))
            Object.assign(state, mapping)
        },
         [MAPPING_SIGNOUT](state) {
            sessionStorage.removeItem('mapping')
            Object.keys(state).forEach(k => Vue.delete(state, k))
        }
        
    },
    actions: {
        [MAPPING_SIGN]({commit}, mapping) {
            commit(MAPPING_SIGN, mapping)
        },
         [MAPPING_SIGNOUT]({commit}) {
            commit(MAPPING_SIGNOUT)
        }
       
    }
}