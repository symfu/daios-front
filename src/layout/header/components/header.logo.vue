<template>
  <router-link to="/work/data_opera" title="返回首页">
    <h1 class="logo-box">
      <img src="~@/assets/images/logo.svg" width="80" height="26" class="logo-img"></img>
      {{ platformTitle }}
      <!-- <i class="tips"></i> -->
    </h1>
  </router-link>
</template>

<script>
import { mapState } from "vuex"
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      platformTitle: state => state.theme.platformTitle
    })
  },
  created() {
    this.loadTitle()
  },
  methods: {
    loadTitle() {
      this.$api.admin.getTitleBySystem().then(res => {
        this.$store.commit("changePlatformTitle", res.data.title)
      })
    }
  },
}
</script>

<style lang='scss'>
  .logo-box {
    font-size: 18px;
    color: #fff;
    line-height: 50px;
    img {
      vertical-align: middle;
      margin-right: 4px;
    }
    .tips {
      display: inline-block;
      vertical-align: middle;
      transform: translate(0, -5px);
      width: 35px;
      height: 14px;
      background: url("~@/assets/images/logo_tip.png") no-repeat center center;
      background-size: 35px 14px;
    }
  }
</style>
