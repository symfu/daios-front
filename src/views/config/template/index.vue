<template>
  <div class="ui-main padding full bg-white" v-loading="pageLoading">
    <h3 class="row-title">模板管理</h3>
    <div class="ui-form mt mb">
      <el-table class="ui-tabler" :data="tableData" size="small">
        <el-table-column label="模板名称" prop="templateName"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="onView(scope.row)" size="small">查看</el-button>
            <el-button v-if="scope.row.activity==0" type="text" @click="doEdit(scope.row, true)" size="small">启用</el-button>
            <el-button v-if="scope.row.activity==1" type="text" @click="doEdit(scope.row, false)" size="small">停用</el-button>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.activity==1" class="status-start">已启用</span>
            <span v-else class="status-stop">已停用</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="代码模板" width="600px" :visible.sync="detailVisible" @close="detailVisible=false">
      <div style="max-height:320px;overflow-y:auto;line-height:1.5;padding:8px 0">
        <div v-html="editData.templateContent" style="border:1px solid #33BDFE;padding:15px;"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Store from "store";
export default {
  data() {
    return {
      pageLoading: false,
      tableData: [],
      editData: {},
      detailVisible: false,
      loading: false
    };
  },
  created() {
    this.pageLoading = true;
    this.loadData();
  },
  methods: {
    loadData() {
      this.$api.admin
        .getSettingForTemplate(Store.get("userData").userId)
        .then(res => {
          this.tableData = res.data;
          this.pageLoading = false;
        });
    },
    onView(e) {
      this.$api.admin.getSettingForTemplateDetail(e.templateId).then(res => {
        let _data = res.data
        _data.templateContent = _data.templateContent.replace(/\n/g, '<br>')
        this.editData = _data
        this.detailVisible = true;
      })
    },
    doEdit(e, type) {
      const params = {
        templateId: e.templateId,
        userId: Store.get("userData").userId,
        temSwitch: type
      }
      this.$api.admin.settingForTemplate(params).then(res => {
        this.$message.success('设置成功')
        this.loadData()
      });
      const id = e;
    },
    // onSubmit() {
    //   if (this.editData.templateContent.trim() == "") {
    //     this.$message.error("代码模板不能为空");
    //     return false;
    //   }
      
    // }
  }
};
</script>

<style lang="scss" scoped>
.status-start {
  color: #67C23A;
  &:before {
    content: "";
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 6px;
    background: #67C23A;
    border: 3px solid rgba(103,194,58,.3);
    vertical-align: middle;
    margin-right: 5px;
  }
}
.status-stop {
  color: #F56060;
  &:before {
    content: "";
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 6px;
    background: #F56060;
    border: 3px solid rgba(255,178,178,.3);
    vertical-align: middle;
    margin-right: 5px;
  }
}
</style>
