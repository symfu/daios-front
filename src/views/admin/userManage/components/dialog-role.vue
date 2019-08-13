<template>
  <el-dialog :visible="visible" title="更改用户角色" width="360px" @close="closeHandle">
    <div class="t-center pt-lg pb-lg">
      <el-radio v-model="role" label="ADMIN">管理员</el-radio>
      <el-radio v-model="role" label="GENERAL">普通用户</el-radio>
    </div>
    <span slot="footer">
      <el-button type="blue" @click="onSubmit" :loading="loading" :disabled="loading" size="small">确 定</el-button>
      <el-button @click="closeHandle" size="small">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    props: ['visible', 'data'],
    data () {
      return {
        role: '',
        loading: false
      }
    },
    mounted() {
      this.role = this.data.role
    },
    methods: {
      closeHandle() {
        this.$emit('update:visible', false)
      },
      onSubmit() {
        this.loading = true
        const params = {
          userId: this.data.userId,
          role: this.role
        }
        
        this.$api.admin.modifyRoleByUser(params).then(res => {
          if(res.resCode == 10000) {
            this.$message.success('修改成功')
            this.loading = false
            this.$emit('success', true)
          } else {
            this.$message.error(res.resMsg)
          }
        })
      }
    }
  }
</script>

<style>

 
</style>
