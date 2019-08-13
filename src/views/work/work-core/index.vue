<template>
  <div class="work_core">
    <div style="height:100%">
      <template v-if="pageList.length>0">
        <div
          class="multiple-page-control-body"
          :id="item.name"
          v-for="(item,index) in pageList"
          :key="item.name"
          v-show="item.name == pageCurrent.name"
        >
          <!-- 编辑器查询模块 -->
          <keep-alive>
            <m-sql-query ref="sqlQuery" :name="item.name" v-if="item.type=='sqlQuery'"></m-sql-query>
          </keep-alive>

          <!-- 导入导出模块 -->
          <m-export ref="export" :name="item.name" v-if="item.type=='export'"></m-export>
          <!-- 个人信息模块 -->
          <m-user-info ref="userInfo" :name="item.name" v-if="item.type=='userInfo'"></m-user-info>
          <!-- 终端模块 -->
          <m-terminal ref="terminal" :name="item.name" v-if="item.type=='terminal'"></m-terminal>
          <!-- 项目模块 -->
          <!-- 项目信息 -->
          <m-pro-man-xmxx ref="pro_man_xmxx" :name="item.name" v-if="item.type=='pro_man_xmxx'"></m-pro-man-xmxx>
          <!-- 项目成员 -->
          <m-pro-man-xmcy ref="pro_man_xmcy" :name="item.name" v-if="item.type=='pro_man_xmcy'"></m-pro-man-xmcy>
          <!-- 项目广场 -->
          <m-pro-man-xmgc ref="pro_man_xmgc" :name="item.name" v-if="item.type=='pro_man_xmgc'"></m-pro-man-xmgc>
          <!-- 统计模块 -->
          <!-- 统计概览 -->
          <m-tongji-tjgl ref="tongji_tjgl" :name="item.name" v-if="item.type=='tongji_tjgl'"></m-tongji-tjgl>
          <!-- 数据字典 -->
          <m-data-dictionary
            ref="data_dictionary"
            :name="item.name"
            v-if="item.type=='data_dictionary'"
          ></m-data-dictionary>
          <!-- 工单 -->
          <!-- 待处理工单 -->
          <m-work-order-dclgd
            ref="work_order_dclgd"
            :name="item.name"
            v-if="item.type=='work_order_dclgd'"
          ></m-work-order-dclgd>
          <!-- 我发起的工单 -->
          <m-work-order-wfqdgd
            ref="work_order_wfqdgd"
            :name="item.name"
            v-if="item.type=='work_order_wfqdgd'"
          ></m-work-order-wfqdgd>
          <!-- 所有工单 -->
          <m-work-order-sygd
            ref="work_order_sygd"
            :name="item.name"
            v-if="item.type=='work_order_sygd'"
          ></m-work-order-sygd>
          <!-- 安全审计 -->
          <!-- 活动审计 -->
          <m-soft-shenji-hdsj
            ref="soft_shenji_hdsj"
            :name="item.name"
            v-if="item.type=='soft_shenji_hdsj'"
          ></m-soft-shenji-hdsj>
          <!-- 慢SQL -->
          <m-soft-shenji-msql
            ref="soft_shenji_msql"
            :name="item.name"
            v-if="item.type=='soft_shenji_msql'"
          ></m-soft-shenji-msql>
          <!-- 数据脱敏 -->
          <m-data-desensitization
            ref="data-desensitization"
            :name="item.name"
            v-if="item.type=='data-desensitization'"
          ></m-data-desensitization>
        </div>
      </template>
      <template v-else>
        <!-- 欢迎页 -->
        <m-init-page ref="initPage"></m-init-page>
      </template>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import multiplePage from "../components/multiple-page-control/multiple.page"; //多页签控制器
import { clearInterval } from "timers";

export default {
  components: {
    multiplePage,
    "m-init-page": () => import("../init-page/index.vue"),
    "m-sql-query": () => import("../sql-query/index"),
    "m-export": () =>
      import("../two-aside/Import-export/import.export.tab.vue"),
    "m-user-info": () => import("../user-info/index.vue"),
    "m-terminal": () => import("../terminal/terminal"),
    /* 项目多个模块 */
    "m-pro-man-xmxx": () => import("../two-aside/pro-man/tabs/pro_man_xmxx"),
    "m-pro-man-xmcy": () => import("../two-aside/pro-man/tabs/pro_man_xmcy"),
    "m-pro-man-xmgc": () => import("../two-aside/pro-man/tabs/pro_man_xmgc"),
    /* 统计模块 */
    "m-tongji-tjgl": () => import("../two-aside/tongji/tabs/tongji_tjgl"),
    /* 数据字典模块 */

    "m-data-dictionary": () =>
      import("../two-aside/data-dictionary/tabs/detail"),
    /* 工单模块  */
    "m-work-order-dclgd": () =>
      import("../two-aside/work-order/tabs/work_order_dclgd.vue"),
    "m-work-order-wfqdgd": () =>
      import("../two-aside/work-order/tabs/work_order_wfqdgd.vue"),
    "m-work-order-sygd": () =>
      import("../two-aside/work-order/tabs/work_order_sygd.vue"),
    /* 安全审计模块 */
    "m-soft-shenji-hdsj": () =>
      import("../two-aside/soft-shenji/tabs/soft_shenji_hdsj.vue"),
    "m-soft-shenji-msql": () =>
      import("../two-aside/soft-shenji/tabs/soft_shenji_msql.vue"),
    /* 数据脱敏模块 */
    "m-data-desensitization": () =>
      import("../two-aside/data-desensitization/tabs/data-desensitization.tab")
  },
  computed: {
    ...mapState({
      pageList: state => state.work.pageList,
      pageCurrent: state => state.work.pageCurrent,
      importSql: state => state.work.importSql,
      openxxxSql: state => state.work.openxxxSql,
      editorSuccess: state => state.work.editorSuccess
    })
  },
  watch: {
    importSql(val) {
      //console.log(val);
      if (val.sql !== "") {
        this.importSqlto(val);
      }
    },
    openxxxSql(val) {
      console.log(val, "接收到SQL了");
      console.log(this.editorSuccess);
      if (this.editorSuccess && val !== "") {
        this.openTable_View(val);
      } else if (!this.editorSuccess && val !== "") {
        this.timer = setInterval(() => {
          this.openTable_View(val);
        }, 200);
      }
    },
    editorSuccess(val) {
      if (val) {
        console.log("清除定时器");
        setTimeout(() => {
          window.clearInterval(this.timer);
          this.$store.commit("editorSuccess", false);
        }, 400);
      } else {
      }
    }
  },
  data() {
    return {
      timer: null
    };
  },

  methods: {
    /**
     * @description 运行SQL文件
     * @param
     */
    importSqlto(data) {
      //导入sql执行，将上传数据加到编辑器
      // let num;
      // //console.log(data.cpId)
      // for (let i = 0; i < this.pageList.length; i++) {
      //   let element = this.pageList[i];
      //   //console.log(element)
      //   if (data.cpId == element.dataSourceId && element.title.split('@')[1]!='PL/SQL') {
      //     num = i;
      //   }
      // }
      // // //console.log(this.$refs.sqlQuery)
      // //console.log(num);
      // this.$refs.sqlQuery[num].importSql(data.sql);
      for (let i = 0; i < this.pageList.length; i++) {
        const element = this.pageList[i];
        if (this.pageCurrent.name == element.name) {
          this.$refs.sqlQuery[i].importSql(data.sql);
        }
      }
    },
    /**
     * @description 打开表视图等操作
     * @param
     */
    openTable_View(data) {
      for (let i = 0; i < this.pageList.length; i++) {
        const element = this.pageList[i];
        if (this.pageCurrent.name == element.name) {
          console.log("向窗口填数据");
          this.$refs.sqlQuery[i].openTable_View(data);
        }
      }
    }
  },

  created() {}
};
</script>

<style lang='scss'>
@import "./index.scss";
</style>
