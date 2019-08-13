<template>
  <div class="editor_top_tools">
    <el-select
      class="editor_tools_select"
      v-show="isShowSelect"
      v-model="selectText"
      size="mini"
      placeholder="请选择数据库/Schema"
      @change="changeSelect(selectText)"
    >
      <el-option  v-for="item,i in selectData" :key="i" :label="item.name" :value="item.name"></el-option>
    </el-select>
    <template v-for="item,i in tools">
      <div class="editor_top_tools_item" v-shortkey.once="['f'+(item.keys)]" 
      @shortkey="handleTopMenu(item)"
      @click="handleTopMenu(item)">
        <i :class="item.icon"></i>
        <span>{{item.label}}</span>
      </div>
    </template>

    <addCollection v-on:closeDialog="closeDialog" :dialog="addCollection"></addCollection>
  </div>
</template>

<script>
import { mapState } from "vuex";
import addCollection from "./components/addcollection.form";
export default {
  components: {
    addCollection
  },
  props: {
    toolsListData: Object
  },
  computed: {
    ...mapState({
      pageCurrent: state => state.work.pageCurrent
    })
  },
  data() {
    return {
      isShowSelect: false,
      addCollection: false, //是否打开收藏堂狂
      tools: [
        // {
        //   label: "保存",
        //   icon: "sql_save"
        // },
        // {
        //   label: "格式化",
        //   icon: "sql_format"
        // },
        // {
        //   label: "执行",
        //   icon: "sql_ddl"
        // },
        // {
        //   label: "停止",
        //   icon: "sql_stop"
        // },
        // {
        //   label: "收藏",
        //   icon: "sql_collection"
        // }
      ],
      selectText: "",
      selectData: []
    };
  },

  methods: {
    /**
     * @description 初始化动态工具栏
     * @param
     */
    initTools() {

      //console.log("编辑器工具栏", this.toolsListData);
      for (let i = 0; i < this.toolsListData.length; i++) {
        const element = this.toolsListData[i];
        let obj = {};

        if (element.action == "FORMAT") {
          //有格式化能力
          obj.label = "格式化";
          obj.icon = "sql_format";
          obj.keys = "3";
        } else if (element.action == "RUN") {
          //有执行能力
          obj.label = "执行";
          obj.icon = "sql_ddl";
          obj.keys = "8";
        } else if (element.action == "STOP") {
          //有停止能力
          obj.label = "停止";
          obj.icon = "sql_stop";
          obj.keys = "9";
        } else if (element.action == "SAVE" && element.target == "QUERY") {
          //有收藏能力
          obj.label = "收藏";
          obj.icon = "sql_collection";
          obj.keys = "4";
        } else if (element.action == "EXPLAIN") {
          //有解释能力
        } else if (element.action == "SELECTQUERYPATH") {
          //选择框框能力
          this.isShowSelect = true;
          this.getSelect();
        }
        this.tools.push(obj);
      }
    },
    /**
     * @description 点击编辑器顶部工具
     * @param
     */
    handleTopMenu(data) {
      //console.log('11',data)
      if (data.label == "保存") {
      } else if (data.label == "格式化") {
        //去执行格式化
        this.$emit("toolsClick", data);
      } else if (data.label == "执行") {
        //去执行ddl
        if (this.isShowSelect && this.selectText == "") {
          this.$message.error("请先选择数据库或SCHEMA，再执行语句");
          return false;
        }
        this.$emit("toolsClick", data);
      } else if (data.label == "停止") {
        //停止执行

        this.$emit("toolsClick", data);
      } else if (data.label == "收藏") {
        //新增收藏
        this.addCollection = true;
      }
    },
    /**
     * @description 获取查询编辑框数据
     * @param
     */
    getSelect() {
      this.$api.sql.sql_tab
        .getSqlEditorSelect(Number(this.pageCurrent.connId))
        .then(res => {
          if (res.resCode == 10000) {
            this.selectData = res.data;
          } else {
            this.$message.error(res.resMsg);
          }
        });
    },
    /**
     * @description 选择查询框
     * @param
     */
    changeSelect(data) {
      // //console.log("查询框", data);
      this.pageCurrent['selectSchemaOrku'] = data;
      this.$store.commit("setCurrentPage", this.pageCurrent);
      let params = {
        connId: Number(this.pageCurrent.connId),
        pathInfo: data
      };
      this.$api.sql.sql_tab.putSqlEditorSelect(params).then(res => {
        if (res.resCode == 10000) {
        } else {
          this.$message.error(res.resMsg);
        }
      });
    },
    /**
     * @description 关闭弹框
     * @param
     */
    closeDialog(data) {
      this.addCollection = data;
    }
  },

  created() {
    this.initTools();
  }
};
</script>

<style lang='scss' >
.editor_top_tools {
  .el-select.editor_tools_select {
    .el-input.el-input--suffix {
      .el-input__inner {
        background-color: #323437;
      }
      .el-input__icon {
        line-height: 29px;
      }
    }
  }
  .popper__arrow::after {
    background-color: #fff !important;
  }
}
</style>
