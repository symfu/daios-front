<template>
  <el-dialog
    :visible.sync="dialog"
    width="30%"
    :modal="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="cancle"
  >
    <span slot="title">新增导出任务</span>
    <el-form style="padding:20px" label-width="100px" :model="form">
      <el-form-item label="任务名称">
        <el-input v-model="form.exportName" size="mini" placeholder></el-input>
      </el-form-item>
      <el-form-item label="文件类型">
        <el-select class="isblack" size="mini" v-model="form.exportType" placeholder style="width:100%">
          <el-option v-for="item,i in exportTypeList" :key="i" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="字符集类型">
        <el-select
          class="isblack"
          size="mini"
          v-model="form.charsetType"
          placeholder="请选择字符集类型"
          style="width:100%"
        >
          <el-option v-for="item,i in charsetTypeList" :key="i" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="字符集行数限">
        <el-select class="isblack" size="mini" v-model="form.rowLimit" placeholder="请选择行数" style="width:100%">
          <el-option label="10000" value="10000"></el-option>
          <el-option label="20000" value="20000"></el-option>
          <el-option label="50000" value="50000"></el-option>
          <el-option label="100000" value="100000"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="源SQL">
        <el-input type="textarea" size="mini" disabled v-model="pageCurrent.sql" placeholder></el-input>
      </el-form-item>
      <el-form-item label="说明">
        <el-input v-model="form.exportDesc" size="mini" placeholder></el-input>
      </el-form-item>
      <el-form-item label="高级设置">
        <el-checkbox label="导出时携带表头" v-model="form.takeTableHead"></el-checkbox>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="submit" type="blue" size="mini">确定</el-button>
      <el-button @click="cancle" type="gary" size="mini">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from "vuex";
import Store from "store";
export default {
  props: {
    dialog: Boolean
  },
  computed: {
    ...mapState({
      pageCurrent: state => state.work.pageCurrent
    })
  },
  watch: {
    dialog(val) {
      if (val == true) {
        this.load();
        this.getChartset();
        this.getExportType();
      }
    }
  },
  data() {
    return {
      charsetTypeList: [],
      exportTypeList: [],
      form: {
        charsetType: "UTF-8",
        connectId: 0,
        connectName: "",
        executeSql: "",
        exportDesc: "",
        exportName: "结果集导出任务",
        exportType: "EXCEL",
        rowLimit: 10000,
        takeTableHead: true,
        userId: Store.get("userData").userId
      }
    };
  },

  methods: {
    /**
     * @description 初始化
     * @param
     */
    load() {
      this.form = {
        charsetType: "UTF-8",
        connectId: 0,
        connectName: "",
        executeSql: "",
        exportDesc: "",
        exportName: "结果集导出任务",
        exportType: "EXCEL",
        rowLimit: 10000,
        takeTableHead: true,
        userId: Store.get("userData").userId
      };
    },
    /**
     * @description 提交
     * @param
     */
    submit() {
      if (this.form.exportName.trim() == "") {
        this.$message.error("任务名称不能为空");
        return false;
      } else if (this.form.exportType == "") {
        this.$message.error("文件类型不能为空");
        return false;
      } else if (this.form.charsetType == "") {
        this.$message.error("字符集类型不能为空");
        return false;
      } else if (this.form.rowLimit == "") {
        this.$message.error("字符集行数限不能为空");
        return false;
      } else if (this.pageCurrent.sql == "") {
        this.$message.error("源SQL不能为空");
        return false;
      } else if (this.form.takeTableHead == false) {
        this.$message.error("导出时必须携带表头");
        return false;
      }
      let params = {
        databaseName: this.pageCurrent.selectSchemaOrku,
        charsetType: this.form.charsetType,
        connectId: this.pageCurrent.cpId,
        connectName: this.pageCurrent.dataSource,
        executeSql: this.pageCurrent.sql,
        exportDesc: this.form.exportDesc,
        exportName: this.form.exportName,
        exportType: this.form.exportType,
        rowLimit: this.form.rowLimit,
        takeTableHead: this.form.takeTableHead,
        userId: Store.get("userData").userId
      };
      //console.log(params);
      this.$api.user.export.addIeExport(params).then(res => {
        if (res.resCode == 10000) {
          //console.log(res.data);
          this.$message.success(res.resMsg);
          this.$emit("clickSubmit", false);
        } else {
          this.$message.error(res.resMsg);
        }
      });
    },
    /**
     * @description 取消
     * @param
     */
    cancle() {
      this.$emit("closeDialog", false);
    },
    /**
     * @description 获取字符集列表
     * @param
     */
    getChartset() {
      this.$api.user.export.getChartset().then(res => {
        if (res.resCode == 10000) {
          this.charsetTypeList = res.data;
        } else {
        }
      });
    },
    /**
     * @description 获取导出类型列表
     * @param
     */
    getExportType() {
      this.$api.user.export
        .getExportType(Store.get("userData").userId)
        .then(res => {
          if (res.resCode == 10000) {
            this.exportTypeList = res.data;
          } else {
          }
        });
    }
  },

  created() {}
};
</script>

<style lang='scss'>
</style>
