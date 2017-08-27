import Vue from 'vue'
import Vuex from 'vuex'

import { vuexToLocalStorage } from './vuexPlugin'
// import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex)

const state = {
    count: 0
}

const mutations = {
    increment(state) {
        state.count++
    },
    decrement(state) {
        state.count--
    }
}

const actions = {
    increment: function(context) {
        context.commit('increment')
    },
    decrement: function(context) {
        context.commit('decrement')
    },
    incrementIfOdd: function(context) {
        if ((context.state.count + 1) % 2 === 0) {
            context.commit('increment')
        }
    },
    incrementAsync: function(context) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                context.commit('increment')
                resolve()
            }, 1000)
        })
    }
}


const getters = {
    evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
}


export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    plugins: [vuexToLocalStorage]
})