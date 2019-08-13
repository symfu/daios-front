<template>
  <div class="register-content-card">
    <div class="register-form">
      <h2>免费注册</h2>
      <el-form label-width="80px" ref="form" :model="form" size="small" :rules="rules" class="mt">
        <el-form-item label="姓　　名" prop="nickName">
          <el-input v-model="form.nickName"></el-input>
        </el-form-item>
        <el-form-item label="账　　户" prop="userName">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="密　　码" class="is-required" prop="password">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="密码确认" class="is-required" prop="rePassword">
          <el-input v-model="form.rePassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="telPhone">
          <el-input v-model="form.telPhone" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="邮　　箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
      </el-form>
      <div class="t-center">
        <el-button
          type="blue"
          class="reg-btn"
          :loading="loading"
          :disabled="loading"
          round
          @click="onSubmit"
        >注册新用户</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
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
          nickName: "",
          userName: "",
          password: "",
          rePassword: "",
          telPhone: "",
          email: ""
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
      onSubmit() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.loading = true
            const params = {
              dataSource: 'LOCAL',
              role: 'GENERAL',
              ...this.form
            }
            this.$api.core.register(params).then(res => {
              if(res.resCode == 10000) {
                this.$message.success('注册成功')
                this.$emit('toLogin',true)
                this.loading = false
                this.$router.push('/login')
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

<style lang="scss" scoped>
.register-content-card {
  width: 300px;
  height: 450px; 
  position: absolute;
  box-sizing: border-box;
  background: #FFFFFF;
  box-shadow: 0 2px 8px 0 rgba(163,163,163,0.50);
  padding: 30px 20px;
  top: -15px;
  left: 20px;
}
.register-form {
  h2 {
    font-size: 20px;
    color: #333333;
    font-weight: normal
  }
}
.reg-btn {
  width: 200px;
}
</style>

<style lang="scss">
.register-form {
  
  .el-input__inner {
    border: 0 none;
    border-bottom: 1px solid #dedede;
    border-radius: 0;
    padding-left: 0;
  }
}
</style>