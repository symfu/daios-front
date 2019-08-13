import {
  axiosGet,
  axiosPost,
  axiosPut,
  axiosDelete,
} from '../Plugin/axios'
import axios from 'axios'
export default {
  /* 操作tree部分 */
  data_opera: {
    //获取枚举列表
    getDmsCommonEnums(params) {
      return axiosGet('/dms/common/enums')
    },
    //心跳连接
    heartBeatMonitor(params) {
      return axios.get(`/dms/helper/heartbeat/${params}`, {
        withCredentials: false
      })
    },
    //获取所有数据源连接信息
    getMetadataDm_info_list(params) {
      return axiosGet('/dms/metadata/load_connection_nodes')
    },
    // 打开连接
    getDmsOpen_connection(params) {
      return axiosPost('/dms/metadata/open_connection', params)
    },
    // 关闭连接
    getDmsClose_connection(params) {
      return axiosPost('/dms/metadata/close_connection', params)
    },
    // 加载meta节点信息列表
    getDmsLoad_meta_node_infos(params) {
      return axiosPost('/dms/metadata/load_tree_node_infos', params)
    },
    // 缓存连接节点列表
    getDmscache_meta_node_infos(params) {
      return axiosPost('/dms/metadata/cache_connection_nodes', params)
    },
    // 刷新连接节点列表
    getDmsrefresh_meta_node_infos(params) {
      return axiosGet('/dms/metadata/refresh_connection_nodes')
    },
    // 加载meta右键菜单
    getDmsLoad_menu(params) {
      return axiosPost('/dms/metadata/load_menu', params)
    },
    // 根据连接id获取meta信息加载导航树, 不包括连接节点
    getDm_meta_tree(params) {
      return axiosGet('/dms/metadata/load_tree/' + params)
    },
    // 创建连接配置
    getDmconnection_profile(params) {
      return axiosPost('/dms/metadata/connection_profile', params)
    },
    // 创建连接配置测试连接
    testDmconnection_profile(params) {
      return axiosPost('/dms/metadata/test_connection', params)
    },

    //更新连接配置
    putDmconnection_profile(params) {
      return axiosPut('/dms/metadata/connection_profile', params)
    },
    //删除连接配置
    delDmconnection_profile(params) {
      axios.defaults.baseURL = axios.defaults.baseURL2
      return axios.delete('/dms/metadata/connection_profile/' + params)
    },
    // 获取数据库信息列表
    getDm_databases_infos(params) {
      return axiosGet(`/dms/metadata/database_infos?databaseType=${params}`)
    },
    // 根据条件筛选数据库信息
    getFliterDm_databases_infos(params) {
      return axiosGet(`/dms/metadata/screen/database_infos?term=${params}`)
    },
    // 加载表单
    getDm_forms(params) {
      return axiosPost('/dms/metadata/load_form', params)
    },
    // 解析右键菜单操作
    getDmParse_menu_operation(params) {
      return axiosPost('/dms/metadata/parse_menu_operation', params)
    },
    // 将菜单操作得到的字符串展示在SQL编辑器上
    getOpenxxxString(params) {
      return axiosPost('/dms/metadata/menu_sql', params)
    },
    // 打开shell编辑窗口
    getShellUrl(params) {
      return axiosPost('/dms/metadata/menu_shell', params)
    },

  },
  /* sql窗口部分 */
  sql_tab: {
    //用户输入信息执行
    doDDL(connId, params) {
      return axiosPost('/dms/editor/command/' + connId, params)
    },
    //PLSQL执行(Oracle专属)
    doPLSQLDDL(connId, params) {
      return axiosPost('/dms/editor/plsql/' + connId, params)
    },
    //停止当前执行
    stopDDL(params) {
      return axiosGet('/dms/editor/command/stop/' + params)
    },
    // 查询编辑框功能渲染
    getSqlEditorSelect(params) {
      return axiosGet(`/dms/editor/query/path/${params}`)
    },
    // 修改编辑框查询路径
    putSqlEditorSelect(params) {
      return axiosPut(`/dms/editor/query/path`, params)
    },

  },
  /* sql窗口右侧部分 */
  sql_model: {
    //数据源连接信息
    getLinkInfos(params) {
      return axiosPost(`/dms/helper/database/${params}`)
    },
  },
  /* 结果集 */
  res_table: {
    //结果集操作
    updateResTable(connId, params) {
      return axiosPost('/dms/result_set/sentences/' + connId, params)
    },
  }
}