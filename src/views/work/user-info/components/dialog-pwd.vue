<template>
  <el-dialog :visible="visible" width="360px" :close-on-click-modal="false" @close="closeHandle">
    <span slot="title">
      修改密码
    </span>
    <div>
      <el-form label-width="84px" status-icon :model="form" ref="form" :rules="rules" size="small">
        <el-form-item label="原密码" prop="oldPassWord">
          <el-input v-model="form.oldPassWord" type="password" ref="passwordInput"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password" class="is-required">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="rePassword" class="is-required">
          <el-input v-model="form.rePassword" type="password"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button type="blue" @click="onSubmit" :loading="loading" :disabled="loading" size="small">确 定</el-button>
      <el-button @click="closeHandle" size="small">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Store from 'store'
  export default {
    props: ['visible'],
    data () {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.form.rePassword !== '') {
            this.$refs.form.validateField('rePassword');
          }
          callback();
        }
      };
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        form: {
          oldPassWord: "",
          password: "",
          rePassword: ""
        },
        loading: false,
        rules: {
          oldPassWord: [
            {required: true, message: '旧密码不能为空', trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          rePassword: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.$refs.passwordInput.$refs.input.focus()
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
              userId: Store.get("userData").userId,
              oldPassWord: this.form.oldPassWord,
              newPassWord: this.form.password
            }
            this.$api.core.modifyPassword(params).then(res => {
              if(res.resCode == 10000) {
                this.$message.success('密码修改成功')
                this.loading = false
                this.$emit("success", true)
              } else {
                this.$message.error(res.resMsg)
                this.loading = false
              }
            })
          }
        })
      }
    }
  }
</script>

<style>

 
</style>
