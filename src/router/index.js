import Vue from "vue";
import Router from "vue-router";

// 路由数据
import routes from "./router.js";

Vue.use(Router);

const router = new Router({
  routes
});

/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach((to, from, next) => {
   next();
});

// router.afterEach(to => {
// })

export default router;
