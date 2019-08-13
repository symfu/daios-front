/* 这里是工作台页面（编辑器，结果集，二级侧边栏）状态 */


export default {
  state: {
    toProjectId: null,
    updataRefrePro:null,
    delRefrePro: null,
    addRefrePro: false,
  },
  mutations: {
    /**
     * @description 顶栏切换项目存储id方便tab页面切换
     * @param 
     */
    toProjectId: (state, toProjectId) => {
      state.toProjectId = toProjectId;
      console.log(state.toProjectId)
    },
    /**
     * @description 项目进行修改，需要的地方得刷新
     * @param 
     */
    updataRefrePro: (state, updataRefrePro) => {
      state.updataRefrePro = updataRefrePro;
    },
    /**
     * @description 项目进行删除或退出，需要的地方得刷新
     * @param 
     */
    delRefrePro: (state, delRefrePro) => {
      state.delRefrePro = delRefrePro;
    },
    /**
     * @description 添加新项目，需要的地方得刷新
     * @param 
     */
    addRefrePro: (state, addRefrePro) => {
      state.addRefrePro = addRefrePro;
    },
    


  },
  getters: {

  },

}