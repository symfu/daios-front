import core from "./modules/core.js";
import work from "./modules/work.js";
import admin from "./modules/admin.js";
import config from "./modules/config.js";
/**
 * @description 框架内页面
 */
const frameIn = [{
    path: "/",
    name: "layout",
    redirect: "/work",
    children: []
  },
  work
]
/**
 * @description admin框架
 */
const doc = [
  {
    path: "/doc",
    name: "DOC",
    meta: {
      title: "文档中心",
      auth: false
    },
    component: () => import("../views/doc")
  }
];
/* 工作空间转页面 */
const workTrans = [{
  path: "/trans",
  name: "trans",
  meta: {
    title: "中转页",
    auth: false
  },
  component: () => import('../views/work/trans.vue')
}];

/**
 * @description 框架内错误页面
 * @param error 
 * @param noAuth
 * @param 404
 */
// const frameError = [

// ];

export default [
  ...frameIn,
  ...admin,
  // ...frameError,
  ...config,
  ...doc,
  ...core,
  ...workTrans
]