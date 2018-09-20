import Vue from 'vue'

export const ORDERMSG_SIGN = 'ORDERMSG_SIGN' //选择的定位
export const ORDERMSG_SIGNOUT = 'ORDERMSG_SIGNOUT' //退出登录

export default {
    state: JSON.parse(sessionStorage.getItem('ordermsg')) || {},
    mutations: {
        [ORDERMSG_SIGN](state, ordermsg) {
            sessionStorage.setItem('ordermsg', JSON.stringify(ordermsg))
            Object.assign(state, ordermsg)
        },
         [ORDERMSG_SIGNOUT](state) {
            sessionStorage.removeItem('ordermsg')
            Object.keys(state).forEach(k => Vue.delete(state, k))
        }
        
    },
    actions: {
        [ORDERMSG_SIGN]({commit}, ordermsg) {
            commit(ORDERMSG_SIGN, ordermsg)
        },
         [ORDERMSG_SIGNOUT]({commit}) {
            commit(ORDERMSG_SIGNOUT)
        }
       
    }
}