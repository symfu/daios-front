/* 这里是布局部分状态 */
export default {
  state: {
    isCollapse: false, //左侧折叠
    platformTitle: "", //标题
    theme: "", //样式主题
  },
  mutations: {
    changeCollapse: (state, isCollapse) => {
      state.isCollapse = isCollapse;
    },
    changePlatformTitle: (state, title) => {
      state.platformTitle = title;
    },
    changeTheme: (state, theme) => {
      state.theme = theme;
    }
  },
  getters: {
    
  }
};
