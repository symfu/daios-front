<template>
  <div class="ui-main padding full bg-white" v-loading="pageLoading">
    <h3 class="row-title">配置</h3>
    <div class="scroll-view">
      <div class="content abs-center">
        <div class="config-bg"></div>
        <div class="config-icon">
          <img src="~@/assets/images/config_icon.png" width="120" alt="">
        </div>
        <h1 style="font-weight:300;color:#666">系统标题设置</h1>
        <el-row :gutter="12" style="width:100%;position:absolute;bottom:0;left:50%;transform:translate(-50%,0);max-width:600px;">
          <el-col :span="21">
            <el-input size="small" class="t-left" v-model="title"></el-input>
          </el-col>  
          <el-col :span="3">
            <el-button type="blue" size="small" class="btn-lg" :loading="loading" :disabled="loading" @click="onSubmit">确定</el-button>
          </el-col>
        </el-row>  
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
  export default {
    data () {
      return {
        pageLoading: true,
        title: "",
        loading: false
      }
    },
    computed: {
      ...mapState({
        platformTitle: state => state.theme.platformTitle
      })
    },
    created() {
      this.pageLoading = true
      this.loadData()
    },
    methods: {
      loadData() {
        this.$api.admin.getTitleBySystem().then(res => {
          this.$store.commit("changePlatformTitle", res.data.title)
          this.title = this.platformTitle
          this.pageLoading = false
        })
      },
      onSubmit() {
        if(this.title.trim() == "") {
          this.$message.error("标题不能为空")
        }
        this.loading = true
        this.$api.admin.setTitleBySystem(this.title).then(res => {
          if(res.resCode == 10000) {
            this.$store.commit("changePlatformTitle", this.title)
            this.$message.success("保存成功")
            this.loading = false
          } else {
            this.$message.error(res.resMsg)
            this.loading = false
          }
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  .content {
    width: 80%;
    height: 320px;
    position: relative;
    text-align: center;
    .config-bg {
      width: 100%;
      height: 114px;
      background: url('~@/assets/images/config_bg.jpg') no-repeat center center;
      background-size: cover;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1
    }
    .config-icon {
      position: relative;
      top: -14px;
    }
  }
 
</style>
