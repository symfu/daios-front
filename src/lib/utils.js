import vuex from "../store/index";
import Store from "store";
import Router from "@/router/index.js";

export default {
  /**
   * @description 时间格式化
   * @param dateObj 时间
   * @param format 转化后格式
   */
  dateFormat(dateObj, format) {
    let date = {
      "M+": dateObj.getMonth() + 1,
      "d+": dateObj.getDate(),
      "h+": dateObj.getHours(),
      "m+": dateObj.getMinutes(),
      "s+": dateObj.getSeconds(),
      "q+": Math.floor((dateObj.getMonth() + 3) / 3),
      "S+": dateObj.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
      format = format.replace(RegExp.$1, (dateObj.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in date) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length === 1 ?
          date[k] : ('00' + date[k]).substr(('' + date[k]).length))
      }
    }
    return format
  },
  /**
   * @description 在工具页面每次打开新页面的时候调用 打开一个新的 tab
   */
  openNewPage(page) {
    let pageList = vuex.state.work.pageList
    //console.log(pageList)
    const pageOpend = pageList.find(item => item.name == page.name)
    if (pageOpend) {
       vuex.commit('setCurrentPage', page)
    } else {
      vuex.commit('openNewPage', page)
    }
    
  },
  /**
   * @description 退出登录，清除的storage和cookie
   */
  logout() {
    Store.remove("userData");
    vuex.commit('closeAllpage', true)
    localStorage.clear();
    Router.replace("/login");
  },
  /**
   * @description 加载主题
   */
  saveTheme(theme) {
    document.body.className = `theme-${theme}`;
  }
}