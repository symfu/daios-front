<template>
  <div class="tongji">
    <div class="tongji_tit">
      <div class="tit_l">统计</div>
      <div class="tit_r">
        <div @click="refreData" title="刷新">
          <i class="iconfont daiosshuaxin"></i>
        </div>
      </div>
    </div>
    <div class="tongji_tree">
      <div style="position: relative;padding:0 6px;">
        <el-input placeholder="请输入关键字" v-model="filterText" size="mini"></el-input>
        <div class="data_tree_filter data_filter" @click="filterHandle"></div>
      </div>
    </div>
    <div class="tongji_list">
      <template v-for="item,i in listData">
        <div class="item" @click="handleClick(item)" :class="{'active':item.isActive}">
          <!-- <img :src="item.iconL" width="13" height="17" class="logo-img"> -->
           <i  :class="item.iconL" style="font-size:14px"></i>
          {{item.label}}
          <i class="fr" :class="item.iconR" style="font-size:16px"></i>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterText: "", //筛选关键字,
      listData: [
        {
          label: "统计概览",
          iconR: "iconfont daiosyuan",
          iconL: `iconfont daiostongjigailan`,
          // iconL: `${process.env.BASE_URL}img/images/pro_man_xmxx.svg`,
          isActive: false,
          id: "1"
        }
      ] //左侧二级菜单数据
    };
  },

  methods: {
    /**
     * @description 刷新数据
     * @param
     */
    refreData() {},
    /**
     * @description 点击筛选
     * @param
     */
    filterHandle() {},
    /**
     * @description 点击列表
     * @param
     */
    handleClick(data) {
      data.isActive = true;
      for (let i = 0; i < this.listData.length; i++) {
        let element = this.listData[i];
        if (element.id == data.id) {
        } else {
          element.isActive = false;
        }
      }
      this.openTab(data);
    },
    /**
     * @description 打开新窗口
     * @param
     */
    openTab(data) {
      let page = {};
      if (data.id == 1) {
        page = {
          name: "tongji_tjgl",
          type: "tongji_tjgl",
          title: `统计概览`,
          icon: `${data.iconL}`
        };
      }
      this.$util.openNewPage(page);
      this.$store.commit("setCurrentPage", page);
    }
  },

  created() {}
};
</script>

<style lang='scss'>
@import "./tongji.scss";
</style>
