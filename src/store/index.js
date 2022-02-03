import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

 const state={
   userInfo:{}
 }

 const mutations={
   GETUSER(state,data){
    state.userInfo = data
   }
 }

  const actions={
    getUser({commit}){
      let result = this.$axios.get('user/user/')
      if(result.code==200){
        commit('GETUSER',result.data)
      }
  }
  }
  const getters={}

export default{
    state,
    mutations,
    actions,
    getters
}