import {
  axiosGet,
  axiosPost,
  axiosPut,
  axiosDelete,
} from '../Plugin/axios'
import axios from 'axios'
export default {
  // xxxx(params) {
  //   return axiosPost('xxx?id=' + params)
  // },
  /* 工作台历史记录 */
  history: {
    //根据用户id获取最后一小时用户历史记录列表
    getUserHistory_hour_one(params) {
      return axiosGet(`/ee/users/info/history/hour/one?userId=${params.userId}&pageSize=${params.pageSize}&currentPage=${params.currentPage}&condition=${params.condition}&type=${params.type}`)
    },
    //根据用户id获取最后一天用户历史记录列表
    getUserHistory_Day_one(params) {
      return axiosGet(`/ee/users/info/history/day/one?userId=${params.userId}&pageSize=${params.pageSize}&currentPage=${params.currentPage}&condition=${params.condition}&type=${params.type}`)
    },
    //根据用户id获取最后三天用户历史记录列表
    getUserHistory_Day_Three(params) {
      return axiosGet(`/ee/users/info/history/day/three?userId=${params.userId}&pageSize=${params.pageSize}&currentPage=${params.currentPage}&condition=${params.condition}&type=${params.type}`)
    },
    //近三天操作数量
    getUserHistoryNum(params) {
      return axiosGet(`/ee/users/info/history/total?userId=${params}`)
    },

  },
  //导入导出
  export: {
    //新增导出任务复制文
    addIeExport(params) {
      return axiosPost(`/ee/ie/export`, params)
    },
    //删除导出任务
    delIeExport(params) {
      return axiosDelete(`/ee/ie/export/${params}`)
    },
    //删除导出任务
    clearExport(params) {
      return axiosDelete(`/ee/ie/export/invalid/${params}`)
    },
    //获取导出详情
    getExportDetail(params) {
      return axiosGet(`/ee/ie/export/detail/${params}`)
    },
    // //查看用户导出任务列表
    // lookIeExport(params) {
    //   return axiosGet(`/ee/ie/export?userId=${params.userId}&condition=${params.condition}`)
    // },
    //查看用户导出任务列表
    lookIeExport(params) {
      return axiosPost(`/ee/ie/export/search`, params)
    },
    //下载文件
    downFile(params) {
      // return axiosGet(`/ee/ie/export/download/${params}`)
      return new Promise(
        function (resolve, reject) {
          axios.defaults.baseURL = axios.defaults.baseURL2
          axios.get(`/ee/ie/export/download/${params}`, {
            responseType: 'blob',
            headers: {
              'Accept': 'application/vnd.ms-excel',
            },
          }).then(res => {
            //console.log(res)
            resolve(res.data)
          }).catch(res => {
            //console.log(res)
            resolve(res.data)
          })
        }
      )
    },
    
    //获取字符集列表
    getChartset(params) {
      return axiosGet(`/ee/ie/export/charset`)
    },
    //获取字符集列表
    getExportType(params) {
      return axiosGet(`/ee/ie/export/type`)
    },
  },
  //收藏
  collection: {
    //新增收藏
    addCollection(params) {
      return axiosPost(`/ee/users/info/collections`, params)
    },
    //获取收藏夹列表
    getCollectionList(params) {
      return axiosGet(`/ee/users/info/collections/directory/${params}`)
    },
    //获取指定用户在某连接下的收藏夹
    getCollection(params) {
      return axiosGet(`/ee/users/info/collections?connectId=${params.connectId}&userId=${params.userId}`)
    },
    //新增收藏夹
    addCollectionDirectory(params) {
      return axiosPost(`/ee/users/info/collections/directory`, params)
    },
    //删除收藏夹
    delCollections(params) {
      return axiosDelete(`/ee/users/info/collections/directory/${params}`)
    },
    //删除收藏记录
    delCollection(params) {
      return axiosDelete(`/ee/users/info/collections/${params}`)
    },
    //编辑收藏记录
    updateCollection(params) {
      return axiosPut(`/dms/users/info/collections`, params)
    },
  },
  //sql模板
  template: {
    // 获取当前用户激活模板
    getCurrentActivityTemp(params) {
      return axiosGet("/ee/users/info/settings/template/activity/" + params)
    },
  },
  //版本
  ver: {
     //根据用户id获取最后一小时用户历史记录列表
     getVer(params) {
       return axiosGet(`/ee/apps/version`)
     },
  }
}