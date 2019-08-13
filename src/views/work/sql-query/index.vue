<template>
  <div class="work_sql">
    <splitpanes
      @resize="rezizeLog('resize', $event)"
      @resized="log('resized', $event)"
      @pane-maximize="log('pane-maximize', $event)"
      @pane-click="rezizeLog('pane-click', $event)"
      @ready="log('ready', $event)"
      @splitter-click="log('splitter-click', $event)"
      class="default-theme touch-example aaaa"
      watch-slots
      style="height:100%"
    >
      <div splitpanes-max="100" :splitpanes-size="paneSize" style="height:100%">
        <div class="flex full column">
          <!-- <splitpanes
            horizontal
            class="default-theme touch-example editor_and_result"
            style="height:100%"
          >
          <span :splitpanes-size="paneSize2">-->
          <editorTopTools
            :toolsListData="pageCurrent.dbDefinition.editorMap.SQL_EDITOR.abilities"
            v-on:toolsClick="toolsClick"
          ></editorTopTools>
          <oceanEditor
            :isShowResult="isShowResult"
            v-on:sqlContent="getSqlContent"
            :codes="content"
            ref="editor"
          ></oceanEditor>
          <!-- </span> -->

          <!-- <span :splitpanes-size="100-paneSize2"> -->
          <sqlResult ref="sqlResult" v-show="isShowResult"></sqlResult>
          <!-- </span> -->
          <!-- </splitpanes> -->
        </div>
      </div>
      <span :splitpanes-size="100 - paneSize">
        <editorRightModel v-on:openRightBox="openRightBox"></editorRightModel>
      </span>
    </splitpanes>
    <!-- 全屏 -->
    <!-- <div class="big_src_box" title="全屏/取消全屏" @click="bigSrc">
      <div class="big_src"></div>全屏
    </div>-->
  </div>
</template>

<script>
import { mapState } from "vuex";
import Store from "store";
import sqlFormatter from "sql-formatter";
import Splitpanes from "splitpanes";
import oceanEditor from "../components/editor/editor"; //编辑器
import sqlResult from "../components/result-table/result.table.vue"; //结果集
import editorRightModel from "../components/editor/components/editor-right-menu/editor.right.menu"; //编辑器右侧模块
import editorTopTools from "../components/editor/components/editor-top-status/editor.top.status";

export default {
  components: {
    Splitpanes,
    oceanEditor,
    sqlResult,
    editorRightModel,
    editorTopTools
  },
  computed: {
    ...mapState({
      pageCurrent: state => state.work.pageCurrent,
      sqlEditBigScreen: state => state.work.sqlEditBigScreen
    })
  },
  watch: {},
  data() {
    return {
      panesNumber: 0,
      paneSize: 100, //设为100，右侧某种语言的自己的模块不会显示
      paneSize2: 40, //设为100，右侧某种语言的自己的模块不会显示
      content:
        "--Daios SQL\n--***************************************************************\n--Source Server : sourceServerType sourceServerVersion \n--Author : author \n--Create Time : createTime \n--***************************************************************\n",
      isShowResult: false,
      isShowFirstResult: false,
      resTable: [] //结果集数据
    };
  },

  methods: {
    /**
     * @description 接收工具栏顶级事件
     * @param
     */
    toolsClick(data) {
      if (data.label == "保存") {
      } else if (data.label == "格式化") {
        //去执行格式化
        this.fomartSql();
      } else if (data.label == "执行") {
        //去执行ddl
        this.doDDL();
      } else if (data.label == "停止") {
        //停止执行
        this.stopDDL();
      } else if (data.label == "收藏") {
        //新增收藏
      }
    },
    /**
     * @description 执行DDL
     * @param
     */
    doDDL() {
      this.isShowResult = true;
      this.isShowFirstResult = true;
      this.$refs.sqlResult.clearresMsgList();
      this.$store.commit("setlinkId", this.pageCurrent.dataSourceId);
      let params = {
        dataBaseType: this.pageCurrent.dataSource,
        databaseName: this.pageCurrent.selectSchemaOrku,
        inputHint: "DML",
        pageNum: 1,
        pageSize: 10,
        sortColumnName: "",
        sortType: "CANCEL",
        sql: this.pageCurrent.sql
      };
      //console.log(this.pageCurrent);
      if (this.pageCurrent.title.split("@")[1] !== "PL/SQL") {
        this.$api.sql.sql_tab
          .doDDL(this.pageCurrent.connId, params)
          .then(res => {
            if (res.resCode == 10000) {
              this.resTable = _.cloneDeep(res.data);
              //console.log("查询结果集", this.resTable);
              this.$refs.sqlResult.loadData(this.resTable);
            } else {
              this.$message.error(res.resMsg);
            }
          });
      } else {
        this.$api.sql.sql_tab
          .doPLSQLDDL(this.pageCurrent.connId, params)
          .then(res => {
            if (res.resCode == 10000) {
              this.resTable = _.cloneDeep(res.data);
              //console.log("查询结果集", this.resTable);
              this.$refs.sqlResult.loadData(this.resTable);
            } else {
              this.$message.error(res.resMsg);
            }
          });
      }
    },
    /**
     * @description 停止执行
     * @param
     */
    stopDDL() {
      this.$api.sql.sql_tab.stopDDL(this.pageCurrent.connId).then(res => {
        if (res.resCode == 10000) {
          //console.log(res.data);
          this.$message.success(res.resMsg);
        } else {
          this.$message.error(res.resMsg);
        }
      });
    },
    /**
     * @description 点击拖动线事件
     * @param
     */
    rezizeLog(a, b) {
      console.log(a,b)
      setTimeout(() => {
        this.$store.commit("reSizeResTable", true);
      }, 50);
    },
    /**
     * @description 格式化
     * @param
     */
    fomartSql() {
      this.$refs.editor.fomartSql();
    },
    /**
     * @description 获取sql内容
     * @param
     */
    getSqlContent(data) {},
    /**
     * @description 点击全屏
     * @param
     */
    bigSrc() {
      if (this.isShowFirstResult) {
        this.isShowResult = !this.isShowResult;
      } else {
        this.isShowResult = false;
      }
    },
    /**
     * @description 控制侧边栏打开关闭
     * @param
     */
    openRightBox(data) {
      if (data) {
        //打开侧边栏
        this.paneSize = 70;
      } else {
        //关闭侧边栏
        this.paneSize = 100;
      }
    },
    /**
     * @description 运行SQL文件
     * @param
     */
    importSql(data) {
      //导入sql执行，将上传数据加到编辑器
      this.$refs.editor.importSql(data);
    },
    /**
     * @description 打开表视图等操作
     * @param
     */
    openTable_View(data) {
      this.$refs.editor.openTable_View(data);
    },
    log(a, b) {
      //console.log(a, b);
    }
  },

  created() {},
  mounted () {
    //窗口打开就连接wenbsoket
    this.$refs.sqlResult.initWebSocket();
  }
};
</script>

<style lang='scss'>
.big_src_box {
  cursor: pointer;
  position: fixed;
  right: 22px;
  line-height: 20px;
  bottom: 7px;
  color: #6d6d6f;
  z-index: 999999;
  .big_src {
    float: left;
    width: 17px;
    height: 17px;
    background: url("~@/assets/images/big_src.svg") no-repeat center center;
    background-size: 17px 17px;
  }
}
</style>
