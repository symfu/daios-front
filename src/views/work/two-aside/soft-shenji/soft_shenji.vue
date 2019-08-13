<template>
  <div class="soft_shenji">
    <div class="soft_shenji_tit">
      <div class="tit_l">安全审计</div>
      <div class="tit_r">
        <div @click="refreData" title="刷新">
          <i class="iconfont daiosshuaxin"></i>
        </div>
      </div>
    </div>
    <div class="soft_shenji_tree">
      <div style="position: relative;padding:0 6px;">
        <el-input placeholder="请输入关键字" v-model="filterText" size="mini"></el-input>
        <div class="data_tree_filter data_filter" @click="filterHandle"></div>
      </div>
    </div>
    <div class="soft_shenji_list">
      <template v-for="item,i in listData">
        <div class="item" @click="handleClick(item)" :class="{'active':item.isActive}">
          <!-- <img :src="item.iconL" width="13" height="17" class="logo-img"> -->
          <i :class="item.iconL" style="font-size:14px"></i>
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
          label: "活动审计",
          iconR: "iconfont daiosyuan",
          iconL: `iconfont daioshuodongshenji`,
          isActive: false,
          id: "1"
        },
        {
          label: "慢SQL",
          iconR: "iconfont daiosyuan",
          iconL: `iconfont daiosredis`,
          isActive: false,
          id: "2"
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
          name: "soft_shenji_hdsj",
          type: "soft_shenji_hdsj",
          title: `活动审计`,
          icon: `${data.iconL}`
        };
      } else if (data.id == 2) {
        page = {
          name: "soft_shenji_msql",
          type: "soft_shenji_msql",
          title: `慢SQL`,
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
@import "./soft_shenji.scss";
</style>
