<template>
  <div>
    <div class="user-btn" :class="{active:active=='statistics'}">
      <i class="iconfont daiosArtboardCopy5"></i>
      <el-dropdown trigger="click" @command="togPro" style="margin-left: 5px;">
        <span class="el-dropdown-link" style="color:#fff">
          {{proName}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :command="item.id" v-for="item,i in proList">{{item.projectName}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- <div class="user-btn" :class="{active:active=='about'}">
      <i class="el-icon-document-copy"></i>
      关于DAIOS
    </div>-->
    <router-link to="/admin" class="user-btn" :class="{active:active=='admin'}">
      <i class="iconfont daiosArtboardCopy51"></i>
      后台管理
    </router-link>
    <div class="user-downdrop-btn active" id="userModel">
      <div class="avatar mini"></div>
      欢迎您，{{userName}}
      <i class="el-icon-caret-bottom"></i>
      <div class="user-downdrop">
        <el-collapse-transition>
          <div class="down-list" v-show="downdropVisible">
            <div class="down-list__header">
              <div class="item" @click="showUserInfo">
                <i class="user-icon icon-user-1"></i>
                个人信息
              </div>
              <div class="item" @click="showFeedback">
                <i class="user-icon icon-user-2"></i>
                使用反馈
              </div>
              <a href="http://www.bintools.cn/" target="_blank" class="item">
                <i class="user-icon icon-user-3"></i>
                访问官网
              </a>
            </div>
            <div class="down-list__body">
              <div class="title">Daios微信使用交流群</div>
              <div class="down-list--qrcode">
                <img src="~@/assets/images/qrcode.jpg" width="84" height="84" alt>
              </div>
            </div>
            <div class="down-list__footer">
              <div class="logout-btn" @click="logout">
                <i class="icon-logout iconfont" style="font-size:16px;vertical-align:middle"></i> 退出
              </div>
            </div>
          </div>
        </el-collapse-transition>
      </div>
    </div>
    <!-- 反馈弹出层 -->
    <Feedback :visible.sync="feedbackVisible"></Feedback>
  </div>
</template>

<script>
import Feedback from "./feedback";
import Store from "store";
import { mapState } from "vuex";
export default {
  components: {
    Feedback
  },
  computed: {
    ...mapState({
      editUserSuccess: state => state.work.editUserSuccess,
      updataRefrePro: state => state.project.updataRefrePro,
      delRefrePro: state => state.project.delRefrePro,
      addRefrePro: state => state.project.addRefrePro,
      toProjectId: state => state.project.toProjectId,
    })
  },
  watch: {
    editUserSuccess(val) {
      this.loadData();
    },
    updataRefrePro(val) {
      if (val.refre) {
        this.$api.project.pro
          .getOwnPmList(Store.get("userData").userId)
          .then(res => {
            if (res.resCode == 10000) {
              // console.log(res)
              this.proList = res.data;
              this.proName = val.proInfo.projectName;
            } else {
            }
          });
      } else {
        let _data = {
          proInfo: val.proInfo,
          refre: false
        };
        this.$store.commit("updataRefrePro", _data);
      }
    },
    addRefrePro(val) {
      if (val) {
        this.$api.project.pro
          .getOwnPmList(Store.get("userData").userId)
          .then(res => {
            if (res.resCode == 10000) {
              // console.log(res)
              this.proList = res.data;
              setTimeout(() => {
                this.$store.commit("addRefrePro", false);
              }, 300);
              
            } else {
            }
          });
          // 
      } else {
        this.$store.commit("addRefrePro", false);
      }
    },
    delRefrePro(val) {
      if (val.refre) {
        this.loadProList();
      } else {
        let _data = {
          proId: val.proId,
          refre: false
        };
        this.$store.commit("delRefrePro", _data);
      }
    }
  },
  props: {
    active: {
      type: String,
      default: ""
    }
  },
  created() {
    this.loadData();
    this.loadProList();
  },
  data() {
    return {
      downdropVisible: false,
      feedbackVisible: false,
      userName: Store.get("userData").nickName,
      proName: "",
      proList: [
        {
          projectName: "aaa",
          id: "123"
        }
      ]
    };
  },
  mounted() {
    const userModel = document.getElementById("userModel");
    userModel.addEventListener("mouseover", event => {
      userModel.className = "user-downdrop-btn current";
      this.downdropVisible = true;
    });
    userModel.addEventListener("mouseleave", event => {
      this.downdropVisible = false;
      userModel.className = "user-downdrop-btn";
    });
  },
  methods: {
    logout() {
      setTimeout(() => {
        this.$api.core.logout().then(res => {
          if (res.resCode == 10000) {
            this.$router.replace("/login");
            window.location.reload()
            this.$message.success("退出登录成功");
            this.$util.logout();
          } else {
            this.$message.error(res.resMsg);
          }
        });
      }, 100);
    },
    showFeedback() {
      this.feedbackVisible = true;
      this.downdropVisible = false;
    },
    showUserInfo() {
      let page = {
        name: "userInfo",
        type: "userInfo",
        title: `个人信息`,
        icon: "el-icon-user"
      };
      this.$util.openNewPage(page);
      this.$store.commit("setCurrentPage", page);
      const routerPath = this.$route.path.split("/");
      if (routerPath[1] !== "work") {
        this.$router.push("/work");
      }
    },
    loadData() {
      this.$api.core.getUseInfo(Store.get("userData").userId).then(res => {
        this.userName = res.data.nickName;
        this.$store.commit("editUserSuccess", false);
      });
    },
    /**
     * @description 获取项目列表
     * @param
     */
    loadProList() {
      this.$api.project.pro
        .getOwnPmList(Store.get("userData").userId)
        .then(res => {
          if (res.resCode == 10000) {
             console.log(res)
            this.proList = res.data;
            console.log(this.toProjectId)
            if (Store.get('toProjectId')) {
              for (let i = 0; i < res.data.length; i++) {
                const element = res.data[i];
                if (Store.get('toProjectId') == element.id) {
                  this.proName = element.projectName;
                  this.$store.commit("toProjectId", element.id);
                }
              }
            } else {
              this.proName = res.data[0].projectName;
              console.log("获取项目列表");
              this.$store.commit("toProjectId", res.data[0].id);
              this.togPro(res.data[0].id)
            }
          } else {
          }
        });
    },
    /**
     * @description 切换项目
     * @param
     */
    togPro(data) {
      let id;
      for (let i = 0; i < this.proList.length; i++) {
        const element = this.proList[i];
        if (data == element.id) {
          id = element.id;
          this.proName = element.projectName;
        }
      }
      this.$api.project.pro.qieHuanPm(data).then(res => {
        if (res.resCode == 10000) {
          //切换项目，后端知道了我切换，然后切换整个工作空间，然后前端页面工作空间重新加载
          this.$store.commit("toProjectId", id);
          Store.set('toProjectId',id)
          console.log("切换项目的ID", id);
          this.$router.push("/trans");
        } else {
        }
      });
    }
  }
};
</script>
