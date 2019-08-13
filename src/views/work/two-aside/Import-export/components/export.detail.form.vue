<template>
  <el-dialog
    :visible.sync="dialog"
    width="30%"
    :modal="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="cancle"
  >
    <span slot="title">导出任务详情</span>
    <el-form style="padding:20px" label-width="100px" :model="form">
      <el-form-item label="任务名称">
        <el-input v-model="form.exportName" size="mini" disabled placeholder></el-input>
      </el-form-item>
      <el-form-item label="文件类型">
        <el-input v-model="form.exportType" size="mini" disabled placeholder style="width:100%"></el-input>
      </el-form-item>
      <el-form-item label="字符集类型">
        <el-input size="mini" v-model="form.charsetType" disabled placeholder style="width:100%"></el-input>
      </el-form-item>
      <el-form-item label="字符集行数限">
        <el-input v-model="form.rowLimit" size="mini" disabled style="width:100%"></el-input>
      </el-form-item>
      <el-form-item label="源SQL">
        <el-input
          type="textarea"
          class="export_detail_form_sql"
          disabled
          size="mini"
          v-model="form.executeSql"
          placeholder
        ></el-input>
      </el-form-item>
      <el-form-item label="说明">
        <el-input disabled v-model="form.exportDesc" placeholder size="mini"></el-input>
      </el-form-item>
      <!-- <el-form-item label="创建时间">
        <el-input disabled v-model="form.createTime" placeholder></el-input>
      </el-form-item>-->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancle" type="gary" size="mini">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from "vuex";
import Store from "store";
export default {
  props: {
    dialog: Boolean,
    formData: Object
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
      }
    }
  },
  data() {
    return {
      charsetTypeList: [],
      exportTypeList: [],
      form: {
        charsetType: "",
        connectId: 0,
        connectName: "",
        executeSql: "",
        exportDesc: "",
        exportName: "",
        exportType: "",
        createTime: "",
        rowLimit: 0,
        takeTableHead: false,
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
        
        charsetType: this.formData.charsetType,
        connectId: 0,
        connectName: "",
        executeSql: this.formData.executeSql,
        exportDesc: this.formData.exportDesc,
        exportName: this.formData.exportName,
        exportType: this.formData.exportType,
        createTime: this.formData.createTime,
        rowLimit: this.formData.rowLimit,
        takeTableHead: false,
        userId: Store.get("userData").userId
      };
    },

    /**
     * @description 取消
     * @param
     */
    cancle() {
      this.$emit("closeDialog", false);
    }
  },

  created() {}
};
</script>

<style lang='scss'>
.work .el-textarea.export_detail_form_sql .el-textarea__inner {
  height: 100px;
}
</style>
