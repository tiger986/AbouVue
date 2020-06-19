import Vue from 'vue'
import Vuex from 'vuex'
//import {CHANGEHEADERTITLE, GETDATA} from './mutation-types.js'
import * as mutationTypes from './mutation-types.js'
import * as actionTypes from './mutation-types.js'

Vue.use(Vuex)

import $ from 'axios'

export default new Vuex.Store({
  state: {
    headerTitle: '',
    movieList: {
      in_theaters: {},
      coming_soon: {},
      new_movies: {},
      top250: {}
    }
  },
  mutations: {
    [mutationTypes.CHANGEHEADERTITLE](state, payload){
      state.headerTitle = payload;
    },
    [mutationTypes.GETDATA](state, payload){
      state.movieList = payload;
    }
  },
  actions: {
    [actionTypes.GETDATA](context){
      const in_theaters = $.get('/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a')
        .then((res) => {
          return res;
        })
      const coming_soon = $.get('/v2/movie/coming_soon?apikey=0df993c66c0c636e29ecbb5344252a4a')
        .then((res) => {
          return res;
        })
      const new_movies = $.get('/v2/movie/new_movies?apikey=0df993c66c0c636e29ecbb5344252a4a')
        .then((res) => {
          return res;
        })
      const top250 = $.get('/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a')
        .then((res) => {
          return res;
        })
      Promise.all([in_theaters, coming_soon, new_movies, top250]) 
      //上面的$.get返回的是一个promise(ajax也是)，所以可以这样用，用Promise.all()同时并行上面的3个函数，等上面的3个请求都拿到结果后再做下一步操作
        .then((res) => { //res是一个对应上面3个请求拿回来的结果所组成的一个数组
          //console.log(res);
          context.commit(mutationTypes.GETDATA, {
            in_theaters: res[0].data,
            coming_soon: res[1].data,
            new_movies: res[2].data,
            top250: res[3].data
          });
        })
    }
  },
  modules: {
  }
})
