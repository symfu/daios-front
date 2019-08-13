<template>
  <div class="content-card login-content-card">
    <div class="login-form">
      <h2>欢迎登录</h2>
      <div class="login-group">
        <el-form v-model="form" label-width="0" size="small">
          <el-form-item>
            <i class="login-icon login-icon-user"></i>
            <el-input v-model="form.username" prefix-icon="icon-captcha" placeholder="账户"></el-input>
          </el-form-item>
          <el-form-item>
            <i class="login-icon login-icon-pwd"></i>
            <el-input
              type="password"
              v-model="form.password"
              prefix-icon="icon-captcha"
              placeholder="密码"
            ></el-input>
          </el-form-item>
          <el-form-item class="captcha">
            <i class="login-icon login-icon-pwd"></i>
            <el-input
              v-model="form.captcha"
              @keyup.enter.native="onSubmit"
              prefix-icon="icon-captcha"
              placeholder="验证码"
              class="captcha-input"
              maxlength="6"
            ></el-input>
            <el-tooltip class="item" effect="dark" content="点击切换验证码" placement="top">
              <img
                :src="captchaImgSrc"
                width="72"
                height="26"
                alt="验证码"
                class="captcha-img"
                @click="getCaptcha"
              >
            </el-tooltip>
          </el-form-item>
          <div style="margin-top:20px;">
            <el-checkbox v-model="checked">记住密码</el-checkbox>
            <span
              style="font-size:12px;float:right;color:#3399FF;cursor: pointer;"
              @click="toReg"
            >没有账号？立即注册</span>
          </div>
        </el-form>
        <div class="t-center">
          <el-button
            type="blue"
            class="login-btn"
            :loading="loading"
            :disabled="loading"
            round
            @click="onSubmit"
          >登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from "md5";
import Store from "store";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        captcha: ""
      },
      checked: false,
      dingding: false,
      loading: false,
      captchaImgSrc: ""
    };
  },
  created() {
    this.getCaptcha();
  },
  methods: {
    getCaptcha() {
      this.captchaImgSrc = this.$api.core.getCaptcha();
    },
    onSubmit() {
      if (this.form.username.trim() == "") {
        this.$message.error("账户不能为空");
        return false;
      } else if (this.form.password == "") {
        this.$message.error("密码不能为空");
        return false;
      } else if (this.form.captcha == "") {
        this.$message.error("验证码不能为空");
        return false;
      }
      this.loading = true;
      this.$api.core.checkCaptcha(this.form.captcha).then(response => {
        if (response.resCode == 10000) {
          let params = {
            dataSource: "LOCAL",
            userName: this.form.username,
            password: this.form.password
          };
          this.$api.core.login(params).then(res => {
            if (res.resCode == 10000) {
              this.$message({
                message: "登录成功",
                type: "success",
                duration: 1000
              });
              const setting = {
                expires: 1
              };
              Store.set("userData", res.data); //用户信息
              this.loading = false;
              this.$router.push("/work");
            } else {
              this.loading = false;
              this.$message.error(res.resMsg);
            }
          });
        } else {
          this.loading = false;
          this.$message.error(response.resMsg);
        }
      });
    },
    toReg() {
      this.$emit("change", true);
    }
  },
  mounted() {
    this.getCaptcha();
  },
};
</script>

<style lang="scss" scoped>
.content-card {
  width: 300px;
  height: 450px;
  position: absolute;
  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 0 2px 8px 0 rgba(163, 163, 163, 0.5);
  padding: 30px 20px;
  top: -15px;
}
.login-content-card {
  left: 466px;
}

.login-form {
  padding-top: 20px;
  h2 {
    font-size: 20px;
    color: #333333;
    margin-bottom: 40px;
    font-weight: normal;
  }
}
.login-group {
  .login-icon {
    width: 20px;
    height: 20px;
    position: absolute;
    left: 0;
    bottom: 7px;
    z-index: 3;
  }
  .login-icon-user {
    background: url("~@/assets/images/icon/icon_user.png") no-repeat center
      center;
    background-size: 20px 20px;
  }
  .login-icon-pwd {
    background: url("~@/assets/images/icon/icon_password.png") no-repeat center
      center;
    background-size: 20px 20px;
  }
}
.login-btn {
  width: 200px;
  margin: 50px auto 0;
}
</style>

<style lang="scss">
.login-group {
  .el-form-item {
    position: relative;
    margin-bottom: 20px;
  }
  .captcha-img {
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
  }
  .el-input__inner {
    border: 0 none;
    border-bottom: 1px solid #dedede;
    border-radius: 0;
  }
}
</style>
