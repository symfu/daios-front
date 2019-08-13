import Vue from "vue";
import Vuex from "vuex";

import theme from './modules/theme.js'
import work from './modules/work.js'
import project from './modules/project.js'
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
   theme,
    work,
   project
  }
})