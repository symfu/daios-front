<template>
  <div class="pro_man">
    <div class="pro_man_tit">
      <div class="tit_l">项目管理</div>
      <div class="tit_r">
        <!-- <div @click="refreData" title="刷新">
          <i class="iconfont daiosshuaxin"></i>
        </div> -->
      </div>
    </div>
    <div class="pro_man_tree">
      <div style="position: relative;padding:0 6px;">
        <el-input placeholder="请输入关键字" v-model="filterText" size="mini"></el-input>
        <div class="data_tree_filter data_filter" @click="filterHandle"></div>
      </div>
    </div>
    <div class="pro_man_list">
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
          label: "项目信息",
          iconR: "iconfont daiosyuan",
          // iconL: `${process.env.BASE_URL}img/images/pro_man_xmxx.svg`,
          iconL: `iconfont daiosjibenxinxi`,
          isActive: false,
          id: "1"
        },
        {
          label: "项目成员",
          iconR: "iconfont daiosyuan",
          // iconL: `${process.env.BASE_URL}img/images/pro_man_xmxx.svg`,
          iconL: `iconfont daiosxiangmuchengyuan`,
          isActive: false,
          id: "2"
        },
        // {
        //   label: "用户组织权限",
        //   iconR: "iconfont daiosgongdan",
        //   iconL: `${process.env.BASE_URL}img/images/pro_man_xmxx.svg`,
        //   isActive: false,
        //   id: "3"
        // },
        {
          label: "项目广场",
          iconR: "iconfont daiosyuan",
          // iconL: `${process.env.BASE_URL}img/images/pro_man_xmxx.svg`,
          iconL: `iconfont daiosxiangmuguangchang`,
          isActive: false,
          id: "4"
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
          name: "pro_man_xmxx",
          type: "pro_man_xmxx",
          title: `项目信息`,
          icon: `${data.iconL}`
        };
      } else if (data.id == 2) {
        page = {
          name: "pro_man_xmcy",
          type: "pro_man_xmcy",
          title: `项目成员`,
          icon: `${data.iconL}`
        };
      } else if (data.id == 4) {
        page = {
          name: "pro_man_xmgc",
          type: "pro_man_xmgc",
          title: `项目广场`,
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
@import "./pro_man.scss";
</style>
