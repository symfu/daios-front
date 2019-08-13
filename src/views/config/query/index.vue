<template>
  <div class="ui-main padding full bg-white" v-loading="pageLoading">
    <h3 class="row-title">查询设置</h3>
    <div class="ui-form mt mb">
      <el-form label-width="150px" v-model="form" :form="form" size="small">
        <el-form-item label="默认分页大小">
          <el-input type="number" v-model="form.pageSize" style="width:330px"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="blue" style="width: 200px;" @click="onSubmit" :loading="loading" :disabled="loading">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Store from "store";
  export default {
    data () {
      return {
        loading: false,
        form: {
          pageSize: 0
        },
        pageLoading: true,
      }
    },
    created() {
      this.pageLoading = true
      this.loadData()
    },
    methods: {
      loadData() {
        this.$api.admin.getSettingForPageSize(Store.get("userData").userId).then(res => {
          this.form.pageSize = res.data.pageSize
          this.pageLoading = false
        })
      },
      onSubmit() {
        this.loading = true
        const params = {
          userId: Store.get("userData").userId,
          pageSize: this.form.pageSize
        }
        this.$api.admin.settingForPageSize(params).then(res => {
          if(res.resCode == 10000) {
            this.loading = false
            this.$message.success("保存成功")
          } else {
            this.loading = false
            this.$message.error(res.resMsg)
          }
        })
      }
    }
  }
</script>

<style>

 
</style>
