<template>
  <div class="full bg-white padding">
    <div class="row-title">
      <h3>钉钉导入</h3>
    </div>
    <div class="ding-box">
      <div class="step-box">
        <div class="item" :class="{current:step==1}">认证信息</div>
        <div class="item" :class="{current:step==2, no:step==1}">开始导入</div>
        <!-- <div class="item" :class="{current:step==3, no:step!=3}">指定管理员</div> -->
      </div>
    </div>
    <div v-if="step==1" style="margin-top:50px">
      <div class="t-center" style="margin-bottom:50px">
        <h2 class="title-h2"><img src="~@/assets/images/icon/logo_dingding.png" width="35">钉钉企业认证信息</h2>
      </div>
      <div class="step-form">
        <el-form label-width="130px" size="small" :model="form" ref="form" :rules="rules">
          <el-form-item label="导入AppKey" prop="importAppKey">
            <el-input v-model="form.importAppKey"></el-input>
          </el-form-item>
          <el-form-item label="导入AppSecret" prop="importAppSecret">
            <el-input v-model="form.importAppSecret"></el-input>
          </el-form-item>
          <el-form-item label="登录AppId" prop="loginAppId">
            <el-input v-model="form.loginAppId"></el-input>
          </el-form-item>
          <el-form-item label="登录AppSecret" prop="loginAppSecret">
            <el-input v-model="form.loginAppSecret"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button class="lg" type="yellow" @click="connectionTest" :loading="loading" :disabled="loading">
              <i class="icon-link-test"></i> <span>连接测试</span>
            </el-button>
          </el-form-item>
          <el-form-item label="">
            <el-button class="lg" type="blue" @click="doImport" >开始导入</el-button>
            <el-button @click="$router.go(-1)">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div v-if="step==2" class="process-box">
      <div class="title">{{processTitle}}</div>
      <div class="process-num">
        <span v-if="processVisible">{{processNum}}%</span>
        <span v-else>&nbsp;</span>
      </div>
      <div class="process-bar-box">
        <div class="process-mask" v-if="processVisible">
          <div class="process-bar" :style="'width:' + processNum + '%'"></div>
        </div>
      </div>
      <el-button type="blue" v-if="nextStepVisible" @click="$router.push('/admin/user')" style="width:200px">完成</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        step: 1,
        form: {
          importAppKey: "",
          importAppSecret: "",
          loginAppId: "",
          loginAppSecret: "",
        },
        processTitle: "正在导入...",
        processNum: 0,
        processVisible: true,
        nextStepVisible: false,
        timer: null,
        loading: false,
        rules: {
          importAppKey: [
            {required: true, message: '导入AppKey不能为空', trigger: 'blur' }
          ],
          importAppSecret: [
            {required: true, message: '导入AppSecret不能为空', trigger: 'blur' }
          ],
          loginAppId: [
            {required: true, message: '登录AppId不能为空', trigger: 'blur' }
          ],
          loginAppSecret: [
            {required: true, message: '登录AppSecret不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      connectionTest() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.loading = true
            const params = {
              certifyType: "DINGTALK",
              ...this.form
            }
            this.$api.core.verifyUserAccount(params).then(res => {
              this.loading = false
              this.$message.success("连接测试成功")
            })
          }
        })
      },
      doImport() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.step = 2
            this.doProcess()
            const params = {
              certifyType: "DINGTALK",
              ...this.form
            }
            this.$api.core.importUsers(params).then(res => {
              if(res.resCode == 10000)
                this.doProcessSuccess(res.data.totals, res.data.successNums)
              else {
                this.$message.error(res.resMsg)
                if(res.data) {
                  this.doProcessFail(res.data.totals, res.data.successNums)
                }
              }
            })
          }
        })
      },
      // 导入动画
      doProcess() {
        this.timer = setInterval(() => {
          if(this.processNum < 99) {
            this.processNum += 1
          } else {
            clearInterval(this.timer)
          }
        }, 80)
      },
      doProcessSuccess(total, num) {
        clearInterval(this.timer)
        this.timer = setInterval(() => {
          if(this.processNum < 100) {
            this.processNum += 1
          } else {
            clearInterval(this.timer)
            this.$message.success('导入成功')
            if(total-num == 0) {
              this.processTitle = `导入完成，成功导入${num}条用户数据`
            } else {
              this.processTitle = `导入完成，成功导入${num}条用户数据，其中${total-num}条已存在`
            }
            this.nextStepVisible = true
          }
        }, 3)
      },
      doProcessFail(total, num) {
        clearInterval(this.timer)
        this.processVisible = false
        this.processNum = 0
        this.processTitle = `导入失败，已导入${num}条用户数据，共${total}条`
        this.nextStepVisible = true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .ding-box {
    width: 100%;
    max-width: 640px;
    margin: 20px auto;
  }
  .step-box {
    display: flex;
    margin: 0 20px;
    .item {
      flex: 1;
      height: 42px;
      margin: 0 17px;
      background: #E1F5FF;
      position: relative;
      text-align: center;
      line-height: 42px;
      color: #55BDFA;
      font-size: 14px;
    }
    .item::before {
      content: "";
      display: block;
      width: 24px;
      height: 42px;
      background: url("~@/assets/images/step_left.png") no-repeat center center;
      background-size: 24px 42px;
      position: absolute;
      left: -24px;
      top: 0
    }
    .item::after {
      content: "";
      display: block;
      width: 25px;
      height: 42px;
      background: url("~@/assets/images/step_right.png") no-repeat center center;
      background-size: 25px 42px;
      position: absolute;
      right: -25px;
      top: 0
    }
    .item.current {
      background: #33BDFE;
      color: #fff;
    }
    .item.current::before {
      background: url("~@/assets/images/step_left_current.png") no-repeat center center;
      background-size: 24px 42px;
    }
    .item.current::after {
      background: url("~@/assets/images/step_right_current.png") no-repeat center center;
      background-size: 25px 42px;
    }
    .item.no {
      background: #F4F4F4;
      color: #666666;
    }
    .item.no::before {
      background: url("~@/assets/images/step_left_no.png") no-repeat center center;
      background-size: 24px 42px;
    }
    .item.no::after {
      background: url("~@/assets/images/step_right_no.png") no-repeat center center;
      background-size: 25px 42px;
    }
  }
  .step-form {
    width: 408px;
    margin: 0 auto;
    position: relative;
    left: -35px;
  }
  .process-box {
    width: 500px;
    margin: 90px auto 50px;
    text-align: center;
    .title {
      font-size: 18px;
      color: #666666;
      margin-bottom: 24px;
    }
    .process-num {
      font-size: 24px;
      color: #333333;
      margin-bottom: 40px;
    }
    .process-bar-box {
      width: 330px;
      height: 10px;
      margin: 0 auto 80px;
    }
    .process-mask {
      width: 330px;
      height: 10px;
      border-radius: 5px;
      overflow: hidden;
      background: #f3f3f3;
      position: absolute;
    }
    .process-bar {
      height: 10px;
      border-radius: 5px;
      background: url("~@/assets/images/process_bar.png") no-repeat left center;
      background-size: 330px 10px;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .title-h2 {
    line-height: 44px;
    vertical-align: middle;
    img {
      vertical-align: middle;
      margin-right: 10px;
    }
  }
  .icon-link-test {
    display: inline-block;
    width: 24px;
    height: 16px;
    background: url('~@/assets/images/icon/icon_link_test.png') no-repeat;
    background-size: 24px 16px;
    vertical-align: middle;
    margin-right: 2px;
  }
  .icon-link-test+span {
    vertical-align: middle;
  }
</style>
<style lang="scss">
  .el-button--yellow {
    background: #FFFCF0;
    border-color: #FFE5C8;
    color: #666;
  }
  .el-button--yellow:hover, .el-button--yellow:focus {
    background: #FFF8D6;
    border-color: #FFE5C8;
    color: #666
  }
  .el-button--yellow.lg {
    width: 100%;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  
</style>