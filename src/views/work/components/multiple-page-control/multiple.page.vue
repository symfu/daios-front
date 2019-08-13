<template>
  <div class="multiple-page-control-group" v-show="pageList.length>0">
    <el-tabs
      class="multiple-page-control"
      :value="pageCurrent.name"
      type="card"
      @tab-click="handleClick"
      @edit="handleTabsEdit"
    >
      <el-tab-pane
        v-for="(page, index) in pageList "
        :key="page.name"
        :closable="index >= 0"
        :name="page.name"
      >
        <span slot="label">
          <i :style="'color:'+ page.iconColor" :class=" page.icon"></i>
          {{page.title}}
        </span>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      activeName: "first"
    };
  },
  computed: {
    ...mapState({
      pageList: state => state.work.pageList,
      pageCurrent: state => state.work.pageCurrent
    })
  },
  created() {
    //console.log("当前所有tab页列表", this.pageList);
    //console.log("当前激活的tab页", this.pageCurrent);
  },
  methods: {
    /**
     * @description 接收点击 tab 标签的事件
     */
    handleClick(tab, event) {
      //console.log(this.pageList);
      const page = this.pageList.find(page => page.name === tab.name);
      //console.log(page);
      this.$store.commit("setCurrentPage", page);
    },
    /**
     * @description 点击 tab 上的删除按钮后首先触发这里
     */
    handleTabsEdit(tagName, action) {
      console.log("关闭页面", tagName, this.pageCurrent, this.pageList);
      let _data = this.pageList;
      if (action === "remove") {
        const index = this.pageList.findIndex(page => page.name === tagName);
        if (tagName == this.pageCurrent.name) {
          // //console.log("最后一个");
          // 首页的删除按钮已经隐藏 因此这里不用判断是 index
          //console.log(index, this.pageList.length);
          if (index == 0 && this.pageList.length > 1) {
            this.$store.commit("setCurrentPage", this.pageList[1]);
          } else if (this.pageList.length == 1) {
          } else {
            this.$store.commit("setCurrentPage", this.pageList[index - 1]);
          }
        }

        this.$store.commit("closeTagPage", index);
      }
    },
    /**
     * @description 关闭一个指定的 tag
     */
    closeTag(tagName) {
      // 下个新的页面
      //console.log("关闭页面", tagName, this.pageCurrent);
      // let newPage = this.pageOpenedList[0];
      // 如果关闭的页面就是当前显示的页面
      if (this.pageCurrent === tagName) {
        // 去找一个新的页面
        let len = this.pageOpenedList.length;
        for (let i = 1; i < len; i++) {
          if (this.pageOpenedList[i].fullPath === tagName) {
            if (i < len - 1) {
              newPage = this.pageOpenedList[i + 1];
            } else {
              newPage = this.pageOpenedList[i - 1];
            }
            break;
          }
        }
      } else {
        // 关闭的页面不是当前的页面
        // 这里暂时不需要做什么
      }
    }
  }
};
</script>

<style lang="scss">
</style>
