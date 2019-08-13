import { axiosPost, axiosGet, axiosPut } from "../Plugin/axios";
import axios from "axios";

export default {
  getCaptcha() {
    return axios.defaults.baseURL + "/ee/users/index/getCaptchaForUser?captchaHeader=" +
      new Date().getTime()
  },
 
  login(params) {
    return axiosPost("/ee/users/index/login", params);
  },
  checkCaptcha(params) {
    return axiosGet(`/ee/users/index/checkCaptcha?checkCode=${params}`);
  },
  verifyUserAccount(params) {
    return axiosPost("/ee/users/index/verify", params);
  },
  importUsers(params) {
    return axiosPost("/ee/users/index/importUsers", params);
  },
  logout() {
    return axiosGet("/ee/users/index/logout")
  },
  register(params) {
    return axiosPost("/ee/users/index/registered", params)
  },

  //获取用户信息
  getUseInfo(params) {
    return axiosGet(`/ee/users/info/${params}`)
  },

  // 修改用户信息
  editUserInfoById(params) {
    return axiosPut('/ee/users/info/', params)
  },

  // 修改密码
  modifyPassword(params) {
    return axiosPut('/ee/users/info/password', params)
  },

  // 检验登录状态
  checkLogin() {
    return axiosGet('/ee/users/index/checkLogin')
  }
};
