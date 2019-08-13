import {
  axiosGet,
  axiosPost,
  axiosPut,
  axiosDelete,
} from '../Plugin/axios'
import axios from 'axios'
export default {
  /* 项目模块相关 */
  pro: {
    //获取指定项目信息
    getLitePm(params) {
      return axiosGet(`/ee/pm/${params}`)
    },
    //获取已加入的项目列表
    getOwnPmList(params) {
      return axiosGet(`/ee/pm/users/${params}`)
    },
    //获取项目下人员
    getPmPeople(params) {
      return axiosGet(`/ee/pm/project?projectId=${params.projectId}&groupId=${params.groupId}`)
    },
    //获取项目下用户组
    getPmGroup(params) {
      return axiosGet(`/ee/pm/group/${params}`)
    },
    //新增项目
    addPm(params) {
      return axiosPost(`/ee/pm/`, params)
    },
    //项目新增成员
    addPmPeople(params) {
      return axiosPost(`/ee/pm/users`, params)
    },
    //编辑项目名称
    putPmName(params) {
      return axiosPut(`/ee/pm/name`, params)
    },
    //编辑项目范围
    putPmRange(params) {
      return axiosPut(`/ee/pm/range`, params)
    },
    //删除项目
    delPm(params) {
       return axiosDelete(`/ee/pm/${params}`)
    },
    //删除用户
    deluser(params) {
       return axiosDelete(`/ee/pm/users/${params.projectId}/${params.userId}`)
    },
    //切换项目，后端记录切换的项目信息
    qieHuanPm(params) {
       return axiosGet(`/dms/metadata/change/project/${params}`)
    },
    //项目广场
    getPmGc(params) {
       return axiosGet(`/ee/pm/square?userId=${params.userId}&condition=${params.condition}`)
    },
    //退出项目
    lyoutPm(params) {
       return axiosGet(`/ee/pm/exit?projectId=${params.projectId}&userId=${params.userId}`)
    },
    //根据用户昵称搜索用户
    searchPmUseer(params) {
       return axiosGet(`/ee/pm/users/search/${params}`)
    },
  },
 
}