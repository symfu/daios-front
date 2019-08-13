<template>
  <div class="full flex align-center justify-center login-container">
    <div class="login-card abs-center">
      <div class="bg-title">
        <img src="~@/assets/images/login_logo.png" width="40" height="41" alt="logo">
        <h1>Daios数据管理平台</h1>
      </div>
      <div class="login-footer">
        <p>
          <a href="javascript:;">关于我们</a>
          <span>|</span>
          <a href="javascript:;">图尔兹官网</a>
          <span>关于Daios(Data All In One Studio)</span>
          <span>杭州图尔兹信息技术有限公司&nbsp;&nbsp;版权所有</span>
        </p>
      </div>
      <transition name="fadeInLeft3">
        <div class="login-desc login-desc1" v-show="type=='login'">
          <div class="title">
            <p>您还不是DAIOS的</p>
            <h3>会员？</h3>
          </div>
          <div class="desc">
            <p>
              欢迎您的加入，从下一刻起，你就是这个
              <br>大家庭里的一份子了，祝愉快！
            </p>
          </div>
          <div class="m-btn" @click="type='register'">立即注册</div>
        </div>
      </transition>
      <transition name="fadeInLeft1">
        <MLogin v-show="type=='login'" @change="changeType"></MLogin>
      </transition>
      <transition name="fadeInLeft4">
        <div class="login-desc login-desc2" v-show="type=='register'">
          <div class="title">
            <p>您已经是DAIOS的</p>
            <h3>老朋友</h3>
          </div>
          <div class="desc">
            <p>
              计算、存储、网络、大数据，优质IT资源为您
              <br>的业务腾飞保驾护航
            </p>
          </div>
          <div class="m-btn" @click="type='login'">立即登录</div>
        </div>
      </transition>
      <transition name="fadeInLeft2">
        <MRegister v-show="type=='register'" :toLogin="toLogin"></MRegister>
      </transition>
    </div>
  </div>
</template>

<script>
import MLogin from "./components/login";
import Store from 'store'
import MRegister from "./components/register";
export default {
  components: {
    MLogin,
    MRegister
  },
  data() {
    return {
      type: "login"
    };
  },
  created() {
    Store.set('sqlTableNum',0)
    this.$util.saveTheme("WHITE");
  },
  methods: {
    changeType() {
      this.type = "register";
    },
    toLogin() {
      this.type = "login";
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  background: url("~@/assets/images/login_bg.png") no-repeat center bottom
    #f4f5f9;
  background-size: 100% auto;
  position: relative;
}
.login-card {
  width: 786px;
  height: 420px;
  background: url("~@/assets/images/login_img.jpg") no-repeat center center;
  background-size: 100% 100%;
  box-shadow: 0 2px 8px 0 srgba(163, 163, 163, 0.5);
}
.bg-title {
  position: absolute;
  top: -80px;
  img {
    display: inline-block;
    vertical-align: middle;
  }
  h1 {
    color: #333;
    display: inline-block;
    vertical-align: middle;
    font-size: 24px;
    margin-left: 20px;
  }
}
.login-desc {
  width: 340px;
  height: 300px;
  position: absolute;
  top: 90px;
  .title {
    p {
      font-size: 28px;
      color: #fff;
    }
    h3 {
      font-size: 40px;
      color: #fff;
    }
  }
  .desc {
    margin-top: 60px;
    margin-bottom: 25px;
    p {
      font-size: 16px;
      line-height: 28px;
      color: #fff;
    }
  }
  .m-btn {
    width: 100px;
    height: 32px;
    border: 1px solid #fff;
    border-radius: 2px;
    text-align: center;
    line-height: 32px;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }
  .m-btn:hover {
    opacity: 0.7;
  }
}
.login-desc1 {
  left: 36px;
}
.login-desc2 {
  left: 344px;
}
.fadeInLeft1-enter-active,
.fadeInLeft1-leave-active {
  transition: opacity 0.3s, left 1s;
}
.fadeInLeft1-enter, .fadeInLeft1-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  left: 20px;
}
.fadeInLeft2-enter-active,
.fadeInLeft2-leave-active {
  transition: opacity 0.3s, left 1s;
}
.fadeInLeft2-enter, .fadeInLeft2-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  left: 366px;
}
.fadeInLeft3-enter-active,
.fadeInLeft3-leave-active {
  transition: opacity 0.3s, left 1s;
}
.fadeInLeft3-enter, .fadeInLeft3-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  left: 344px;
}
.fadeInLeft4-enter-active,
.fadeInLeft4-leave-active {
  transition: opacity 0.3s, left 1s;
}
.fadeInLeft4-enter, .fadeInLeft4-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  left: 36px;
}
.login-footer {
  position: absolute;
  width: 100%;
  text-align: center;
  bottom: -120px;
  font-size: 14px;
  a {
    color: #333333;
    font-weight: bold;
    transition: all 0.2s ease-in-out;
  }
  a:hover {
    color: #3399ff;
  }
  span {
    color: #9f9f9f;
    margin: 0 15px;
  }
}
</style>
