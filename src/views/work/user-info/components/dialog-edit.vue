<template>
  <el-dialog :visible="visible" width="420px" @close="closeHandle">
    <span slot="title">
      编辑个人信息
    </span>
    <el-form label-width="84px" status-icon :model="form" ref="form" :rules="rules" size="small">
      <el-form-item label="姓名" prop="nickName">
        <el-input v-model="form.nickName" ref="nickNameInput"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="telPhone" class="is-required">
        <el-input v-model="form.telPhone" maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button type="blue" @click="onSubmit" :loading="loading" :disabled="loading" size="small">确 定</el-button>
      <el-button @click="closeHandle" size="small">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import Store from 'store'
  export default {
    props: ['visible', 'data'],
    data () {
      const checkPhoneNumber = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('手机号不能为空'));
        } else if (!(/^1[34578]\d{9}$/.test(value))) {
          callback(new Error('手机号格式不正确!'));
        } else {
          callback();
        }
      }
      return {
        form: {},
        loading: false,
        rules: {
          nickName: [
            {required: true, message: '姓名不能为空', trigger: 'blur' }
          ],
          telPhone: [
            { validator: checkPhoneNumber, trigger: 'blur' }
          ],
          email: [
            { required: true, message: '邮箱不能为空', trigger: 'blur' },
            { type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
          ],
        }
      }
    },
    mounted() {
      this.form = JSON.parse(JSON.stringify(this.data))
      this.$nextTick(() => {
        this.$refs.nickNameInput.$refs.input.focus()
      })
    },
    methods: {
      closeHandle() {
        this.$emit("update:visible", false)
      },
      onSubmit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.loading = true
            const params = {
              nickName: this.form.nickName,
              telPhone: this.form.telPhone,
              email: this.form.email,
              userId: Store.get("userData").userId
            }
            this.$api.core.editUserInfoById(params).then(res => {
              if(res.resCode == 10000) {
                this.$message.success('修改成功')
                this.loading = false
                this.$emit('success', true)
              } else {
                this.loading = false
                this.$message.error(res.resMsg)
              }
            })
          }
        })
      }
    },
  }
</script>

<style>

 
</style>
