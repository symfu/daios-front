<template>
  <el-dialog :visible="visible" title="新增用户" width="420px" :close-on-click-modal="false" @close="closeHandle">
    <el-form label-width="84px" status-icon :model="form" ref="form" :rules="rules" size="small">
      <el-form-item label="姓名" prop="nickName">
        <el-input v-model="form.nickName" ref="nickNameInput"></el-input>
      </el-form-item>
      <el-form-item label="账户" prop="userName">
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="telPhone">
        <el-input v-model="form.telPhone" maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <!-- <el-form-item label="用户身份" prop="role">
        <el-radio v-model="form.role" label="ADMIN">管理员</el-radio>
        <el-radio v-model="form.role" label="GENERAL">普通用户</el-radio>
      </el-form-item> -->
      <el-form-item label="密码" class="is-required" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" class="is-required" prop="rePassword">
        <el-input v-model="form.rePassword" type="password"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button type="blue" @click="onSubmit" :loading="loading" :disabled="loading" size="small">确 定</el-button>
      <el-button @click="closeHandle" size="small">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>

  export default {
    props: ['visible'],
    directive: {
      focus: {
        inserted(el) {
          el.focus()
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.$refs.nickNameInput.$refs.input.focus()
      })
    },
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
      const checkPhoneNumber = (rule, value, callback) => {
        if (value === '') {
          callback();
        } else if (!(/^1[34578]\d{9}$/.test(value))) {
          callback(new Error('手机号格式不正确!'));
        } else {
          callback();
        }
      }
      return {
        form: {
          nickName: '',
          userName: '',
          email: '',
          telPhone: '',
          role: 'GENERAL',
          password: '',
          rePassword: ''
        },
        loading: false,
        rules: {
          nickName: [
            {required: true, message: '姓名不能为空', trigger: 'blur' }
          ],
          userName: [
            {required: true, message: '账户不能为空', trigger: 'blur' }
          ],
          telPhone: [
            { validator: checkPhoneNumber, trigger: 'blur' }
          ],
          email: [
            { type: 'email', message: '邮箱格式不正确', trigger: 'blur'}
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          rePassword: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      closeHandle() {
        this.$emit('update:visible', false)
      },
      onSubmit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.loading = true
            const params = {
              dataSource: 'LOCAL',
              ...this.form
            }
            this.$api.admin.createUser(params).then(res => {
              if(res.resCode == 10000) {
                this.$message.success('创建成功')
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
    }
  }
</script>

<style>

 
</style>
