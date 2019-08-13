/* 这里是工作台页面（编辑器，结果集，二级侧边栏）状态 */


export default {
  state: {
    // 工具页面
    pageList: [
      // {
      // name: "initPage",
      // type: "initPage",
      // title: "欢迎页",
      // icon: "el-icon-date",
      // },

    ],
    // 当前页面
    pageCurrent: {
      // name: "initPage",
      // type: "initPage",
      // title: "欢迎页",
      // icon: "el-icon-date",
    },
    //存储获取表单需要的参数数据
    reqFormParams: {

    },
    //存储左侧树的数据，然后遍历会的打开的数量
    linkNUm: [],
    //存储最近一次连接id
    linkId: 0,
    sqlEditBigScreen: true,
    importSql: {},
    openxxxSql: '',
    editorSuccess:false,//编辑器加载状态
    refreCollection: false,
    reSizeResTable: false, //结果集表格再左右拖动时候需要自适应
    editUserSuccess: false, //编辑用户成功后，欢迎您的名字也要变化
  },
  mutations: {
    /**
     * @description 设置tab列表
     * @param 
     */
    pageList: (state, pageList) => {
      state.pageList = pageList;
    },
    /**
     * @class pageCurrent
     * @description 设置当前激活的页面 name
     * @param {state} state vuex state
     * @param {string} pageCurrent new pageCurrent
     */
    setCurrentPage(state, pageCurrent) {
      state.pageCurrent = pageCurrent
    },
    /**
     * @class pageList, pageCurrent
     * @description 新开页面 name
     * @param {state} state vuex state
     * @param {string} page new page
     */
    openNewPage(state, page) {
      state.pageList.push(page)
      state.pageCurrent = page
    },
    /**
     * @class pageList, pageCurrent
     * @description 关闭页面 name
     * @param {state} state vuex state
     * @param {string} page new page
     */
    closeTagPage(state, index) {
      state.pageList.splice(index, 1)
    },
    closeAllpage(state, params) {
      state.pageList = []
    },
    /**
     * @description 存储获取表单要的参数
     * @param 
     */
    setGetFormParams(state, params) {
      state.reqFormParams = params
      //console.log(state.reqFormParams)
    },
    /**
     * @description 存储树的连接数量
     * @param 
     */
    setlinkNUm(state, params) {
      state.linkNUm = params
      //console.log(state.linkNUm)
    },
    /**
     * @description 存储最近一次连接id
     * @param 
     */
    setlinkId(state, params) {
      state.linkId = params
      //console.log(state.linkId)
    },
    /**
     * @description 设置编辑器全屏
     * @param 
     */
    setSqlEditBigScreen(state, params) {
      state.sqlEditBigScreen = params
      //console.log(state.sqlEditBigScreen)
    },
    /**
     * @description 设置运行SQL文件的数据
     * @param 
     */
    setImportSql(state, params) {
      state.importSql = params
      //console.log(state.importSql)
    },
    /**
     * @description 设置打开XXX获取的sql
     * @param 
     */
    setOpenxxxSql(state, params) {
      state.openxxxSql = params
      //console.log(state.openxxxSql)
    },
    /**
     * @description 编辑器加载状态
     * @param 
     */
    editorSuccess(state, params) {
      state.editorSuccess = params
      //console.log(state.openxxxSql)
    },
    /**
     * @description 收藏成功后编辑器右侧需要刷新
     * @param 
     */
    setRefreCollection(state, params) {
      state.refreCollection = params
      //console.log(state.refreCollection)
    },
    /**
     * @description 结果集表格再左右拖动的时候需要自适应
     * @param 
     */
    reSizeResTable(state, params) {
      state.reSizeResTable = params
      // //console.log(state.reSizeResTable)
    },
    /**
     * @description 编辑用户成功后， 欢迎您的名字也要变化
     * @param 
     */
    editUserSuccess(state, params) {
      state.editUserSuccess = params
      // //console.log(state.reSizeResTable)
    },


  },
  getters: {

  },

}