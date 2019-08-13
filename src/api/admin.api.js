import { axiosGet, axiosPost, axiosPut, axiosDelete } from "../Plugin/axios";

export default {
  // 获取用户列表
  getUsesList(params) {
    return axiosGet(`/ee/users/info/?currentPage=${params.currentPage}&pageSize=${params.pageSize}&condition=${params.condition}&role=${params.role}`);
  },

  // 获取用户分类数量
  getUserCategory() {
    return axiosGet("/ee/users/info/types");
  },

  // 创建用户
  createUser(params) {
    return axiosPost("/ee/users/info/", params);
  },

  // 修改用户信息
  updateUser(params) {
    return axiosPut("/ee/users/info/", params);
  },

  // 删除用户
  deleteUsers(params) {
    return axiosDelete("/ee/users/info/?userId=" + params)
  },

  // 修改用户密码
  modifyPasswordByAdmin(params) {
    return axiosPut("/ee/users/info/admin/password", params)
  },

  // 修改用户角色
  modifyRoleByUser(params) {
    return axiosPut("/ee/users/info/role", params)
  },

  // 用户提交反馈
  feedback(params) {
    return axiosPost("http://v4.holytoolz.com:8008/toolz/feedback", params)
  },

  // 修改当前用户编辑器设置
  settingForEditor(params) {
    return axiosPut("/ee/users/info/settings/editor", params)
  },

  // 获取当前用户编辑器设置
  getSettingForEditor(params) {
    return axiosGet("/ee/users/info/settings/editor/" + params)
  },

  // 修改当前用户分页信息
  settingForPageSize(params) {
    return axiosPut("/ee/users/info/settings/pageSize", params);
  },

  // 获取当前用户分页信息
  getSettingForPageSize(params) {
    return axiosGet("/ee/users/info/settings/pageSize/" + params)
  },

  // 更换启用模板
  settingForTemplate(params) {
    return axiosPut(`/ee/users/info/settings/template?templateId=${params.templateId}&userId=${params.userId}&temSwitch=${params.temSwitch}`);
  },
  // 获取当前用户模板信息
  getSettingForTemplate(params) {
    return axiosGet(`/ee/users/info/settings/template/${params}`);
  },
  // 根据id获取模板详细信息
  getSettingForTemplateDetail(params) {
    return axiosGet(`/ee/users/info/settings/template/detail/${params}`);
  },
  // 获取系统标题
  getTitleBySystem() {
    return axiosGet("/ee/users/info/title");
  },

  setTitleBySystem(params) {
    return axiosPut(`/ee/users/info/title?title=${params}`)
  }

};
