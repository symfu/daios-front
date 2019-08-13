import Vue from "vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import Store from 'store'
import './registerServiceWorker'
import './assets/font/iconfont/iconfont.css'
// import './assets/font/normal/iconfont.css'



Vue.config.productionTip = false;

Vue.use(ElementUI);

import api from './api/index'
Vue.prototype.$api = api

import infiniteScroll from "vue-infinite-scroll"; //滚动插件
Vue.use(infiniteScroll)
import 'splitpanes/dist/splitpanes.css'

import VueClipboard from 'vue-clipboard2';
Vue.use(VueClipboard)
import _ from 'lodash'
Vue.prototype._ = _

import util from './lib/utils'
Vue.prototype.$util = util
//console.log(process.env);

//快捷键插件
Vue.use(require('vue-shortkey'))
new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    if (Store.get("userData") == undefined) {
      // this.$message.error("登录已失效，请重新登陆")
      router.replace("/login");
    } else {
      //console.log('校验登录状态');
      api.core.checkLogin().then(res => {
        if (res.resCode == -2010) {
          util.logout();
          this.$message.error(res.resMsg)
          router.replace("/login");
        }
        // else {
        //   api.admin.getSettingForEditor(Store.get("userData").userId).then(res => {
        //     util.saveTheme(res.data.themeStyle);
        //   });
        // }
      });
    }
  }
}).$mount("#app");