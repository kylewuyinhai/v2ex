import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    hid:false,
    user:true,
    add: false,
    actvie: 0,
    apiToken:'',
    username: '',
  },
  mutations: {
    setHidT(state){
      state.hid = true;
    },
    setHidF(state){
      state.hid = false;
    },
    setUserF(state){
      state.user = false;
    },
    setUserT(state){
      state.user = true;
    },
    setAddT(state){
      state.add = true;
    },
    setAddF(state){
      state.add = false;
    },
    setActive(state){
      state.active = 0;
    },
    setApiToken(state, data){
      state.apiToken = data;
    },
    setUsername(state,data){
      state.username = data;
    }
  },
});
