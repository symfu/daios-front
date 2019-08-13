<template>
  <div class="res_footer_tools">
    <div class="fl">
      <!-- <div
        class="res_footer_tools_item"
        v-show="toolsData.resultButoon"
        style="cursor: not-allowed;"
      >
        <i class="res_add"></i>
        <span>添加</span>
      </div>
      <div
        class="res_footer_tools_item"
        v-show="toolsData.resultButoon"
        style="cursor: not-allowed;"
      >
        <i class="res_del"></i>
        <span>删除</span>
      </div>-->
      <div
        class="res_footer_tools_item"
        
        v-show="toolsData.resultButoon"
        @click="submit(toolsData)"
      >
        <i class="res_sub"></i>
        <span>提交</span>
      </div>
      <div
        class="res_footer_tools_item"
        v-show="toolsData.resultButoon"
        
        @click="refreResTable(toolsData)"
      >
        <i class="res_exit"></i>
        <span>取消</span>
      </div>
      <div
        class="res_footer_tools_item"
        v-show="toolsData.resultButoon"
        @click="refreResTable(toolsData)"
      >
        <i class="res_fre"></i>
        <span>刷新</span>
      </div>
      <div class="res_footer_tools_item" v-show="toolsData.leadOutResult" @click="addExport">
        <i class="res_export"></i>
        <span>导出表格</span>
      </div>
    </div>
    <div class="fr">
      <!-- <div class="res_footer_tools_item_r">msg</div> -->
      <div class="res_footer_tools_item_r res_table_tools_first" @click="toFirst"></div>
      <div class="res_footer_tools_item_r res_table_tools_pre" @click="toPre"></div>
      <div class="res_footer_tools_item_r">
        <el-input
          v-model="toolsData.currentPage"
          @blur="unKnownPage"
          @change="changePage"
          @keyup.enter.native="unKnownPage"
          placeholder
          size="mini"
        ></el-input>
      </div>
      <div
        class="res_footer_tools_item_r res_table_tools_next"
        @click="toNext"
        style="margin-left:29px"
      ></div>
      <div class="res_footer_tools_item_r res_table_tools_last" @click="toLast"></div>
      <div class="res_footer_tools_item_r last">共{{toolsData.total}}条记录</div>
    </div>
    <addExport :dialog="dialog" v-on:clickSubmit="clickSubmit" v-on:closeDialog="closeDialog"></addExport>
    <viewSql
      :dialog="viewSqldialog"
      :List="sqlList"
      v-on:clickSubmit="clickviewSqlSubmit"
      v-on:closeDialog="closeviewSqlDialog"
    ></viewSql>
  </div>
</template>

<script>
import { mapState } from "vuex";
import addExport from "../../../../two-aside/Import-export/components/addexport.form";
import viewSql from "./view.result.sql";
export default {
  components: {
    addExport,
    viewSql
  },
  props: {
    toolsData: Object,
  },
  computed: {
    ...mapState({
      pageCurrent: state => state.work.pageCurrent
    })
  },
  watch: {
    toolsData(val) {
      //console.log(val)
      this.updateRestable(val)
    }
  },
  data() {
    return {
      pageNum: 1,
      dialog: false, //打开新增弹框
      viewSqldialog: false,
      sqlList: []
    };
  },

  methods: {
    /**
     * @description 分页第一页
     * @param
     */
    toFirst() {
      this.pageNum = 1;
      this.doDDL();
    },
    /**
     * @description 分页最后一页
     * @param
     */
    toLast() {
      let totalPage = Math.ceil(this.toolsData.total / 10);
      this.pageNum = totalPage;
      if (this.pageNum == this.toolsData.currentPage) {
        this.$message.error("当前已经是最后一页");
        return false;
      } else {
        this.doDDL();
      }
    },
    /**
     * @description 分页上一页
     * @param
     */
    toPre() {
      let totalPage = Math.ceil(this.toolsData.total / 10);

      if (this.toolsData.currentPage == 1) {
        this.$message.error("当前已经是第一页");
        return false;
      } else {
        if (
          this.toolsData.currentPage < 1 ||
          this.toolsData.currentPage > totalPage
        ) {
          this.$message.error("请输入正确的页数");
          return false;
        } else {
          this.pageNum = Number(this.toolsData.currentPage) - 1;
          this.doDDL();
        }
      }
    },
    /**
     * @description 分页下一页
     * @param
     */
    toNext() {
      let totalPage = Math.ceil(this.toolsData.total / 10);
      //console.log(totalPage);
      if (this.toolsData.currentPage == totalPage) {
        this.$message.error("当前已经是最后一页");
        return false;
      } else {
        if (
          this.toolsData.currentPage < 1 ||
          this.toolsData.currentPage > totalPage
        ) {
          this.$message.error("请输入正确的页数");
          return false;
        }
        this.pageNum = Number(this.toolsData.currentPage) + 1;
        //console.log(this.pageNum);
        this.doDDL();
      }
    },
    /**
     * @description 页数改变
     * @param
     */
    changePage() {
      let totalPage = Math.ceil(this.toolsData.total / 10);
      if (
        this.toolsData.currentPage < 1 ||
        this.toolsData.currentPage > totalPage
      ) {
        this.$message.error("请输入正确的页数");
        return false;
      }
    },
    /**
     * @description 跳页
     * @param
     */
    unKnownPage() {
      //console.log(this.toolsData.currentPage);
      this.pageNum = this.toolsData.currentPage;
      this.doDDL();
    },
    /**
     * @description 执行DDL
     * @param
     */
    doDDL() {
      let params = {
        dataBaseType: this.pageCurrent.dataSource,
        databaseName: this.pageCurrent.selectSchemaOrku,
        inputHint: "DML",
        pageNum: Number(this.pageNum),
        currentPageize: 10,
        sortColumnName: "",
        sortType: "CANCEL",
        sql: this.pageCurrent.sql
      };
      //console.log(this.pageCurrent.title.split("@")[1]);
      this.$store.commit("setlinkId", this.pageCurrent.dataSourceId);
      if (this.pageCurrent.title.split("@")[1] !== "PL/SQL") {
        this.$api.sql.sql_tab
          .doDDL(this.pageCurrent.connId, params)
          .then(res => {
            if (res.resCode == 10000) {
              // this.$message.success(res.resMsg);
              this.resTable = _.cloneDeep(res.data);
              //console.log("查询结果集", this.resTable);
              this.$emit("updataRes", this.resTable);
              // setTimeout(() => {
              //   this.updateRestable(this.resTable);
              // }, 300);
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
              this.$emit("updataRes", this.resTable);
              // setTimeout(() => {
              //   this.updateRestable(this.resTable);
              // }, 300);
            } else {
              this.$message.error(res.resMsg);
            }
          });
      }
    },
    /**
     * @description 增删改
     * @param
     */
    updateDDL(data) {
      let params = {
        dataBaseType: this.pageCurrent.dataSource,
        databaseName: this.pageCurrent.selectSchemaOrku,
        inputHint: "DML",
        pageNum: Number(this.pageNum),
        currentPageize: 10,
        sortColumnName: "",
        sortType: "CANCEL",
        sql: data.join(" ")
      };
      //console.log(this.pageCurrent.title.split("@")[1]);
      this.$store.commit("setlinkId", this.pageCurrent.dataSourceId);
      if (this.pageCurrent.title.split("@")[1] !== "PL/SQL") {
        this.$api.sql.sql_tab
          .doDDL(this.pageCurrent.connId, params)
          .then(res => {
            if (res.resCode == 10000) {
              this.viewSqldialog = false;
              this.resTable = _.cloneDeep(res.data);
              //console.log("查询结果集", this.resTable);
              this.$message.success('更新结果集成功')
              // //console.log(this.$parent);
              // this.$emit("updateResultTable", this.resTable);
              this.doDDL();
            } else {
              this.$message.error(res.resMsg);
            }
          });
      } else {
        this.$api.sql.sql_tab
          .doPLSQLDDL(this.pageCurrent.connId, params)
          .then(res => {
            if (res.resCode == 10000) {
              this.viewSqldialog = false;
              this.resTable = _.cloneDeep(res.data);
              //console.log("查询结果集", this.resTable);
              this.$parent.loadData(this.resTable);
            } else {
              this.$message.error(res.resMsg);
            }
          });
      }
    },
    /**
     * @description 执行之后，除了更新表格数据，还要更新工具栏数据
     * @param
     */
    updateRestable(data) {
      //console.log(data);
      // let _data = _.cloneDeep(data);
      // for (let i = 0; i < _data.length; i++) {
      //   let element = _data[i];
        this.toolsData = {
          updateRowData: data.updateRowData,
          deleteRowData: data.deleteRowData,
          columnsInfo: data.columnInfo,
          pkNameList: data.pkName,
          total: data.total,
          pages: data.pages,
          currentPage: data.currentPage,
          executeSentence: data.executeSentence,
          excuteTime: data.excuteTime,
          leadOutResult: data.leadOutResult,
          resultButoon: data.resultButoon,
          resultState: data.resultState
        };
      // }
      // //console.log(this.toolsData);
    },
    /**
     * @description 刷新结果集表格
     * @param
     */
    refreResTable(data) {
      this.doDDL();
    },
    /**
     * @description 新增导出任务
     * @param
     */
    addExport() {
      this.dialog = true;
    },
    /**
     * @description 弹框提交
     * @param
     */
    clickSubmit(data) {
      this.dialog = data;
    },
    /**
     * @description 弹框关闭
     * @param
     */
    closeDialog(data) {
      this.dialog = data;
    },
    closeviewSqlDialog(data) {
      this.viewSqldialog = data;
    },
    /**
     * @description 提交
     * @param
     */
    submit(data) {
      //console.log(data);
      if (data.updateRowData.length==0) {
         this.changeResult(data, data.deleteRowData, "DELETE");
      }else {
        this.changeResult(data, data.updateRowData, "UPDATE");
      }
    },
    /**
     * @description 结果集增删改
     * @param
     */
    changeResult(resData, updateData, type) {
      let params = {
        columnsInfo: resData.columnsInfo,
        operation: type,
        pkNameList: resData.pkNameList,
        resultInput: resData.executeSentence,
        schemaName: this.pageCurrent.selectSchemaOrku,
        userInput: updateData
      };
      //console.log(params);
      this.$api.sql.res_table
        .updateResTable(Number(this.pageCurrent.connId), params)
        .then(res => {
          if (res.resCode == 10000) {
            // this.selectData = res.data;
            this.viewSqldialog = true;
            this.sqlList = res.data;
          } else {
            this.$message.error(res.resMsg);
          }
        });
    },
    clickviewSqlSubmit() {

    }
  },

  created() {},
  mounted() {
    //console.log(this.toolsData);
  }
};
</script>

<style lang='scss'>
.res_footer_tools_item_r {
  .el-input {
    .el-input__inner {
      width: 50px;
      text-align: center;
      padding: 0px;
    }
  }
}
</style>
