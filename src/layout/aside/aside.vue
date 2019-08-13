<template>
  <el-aside :class="{isCollapse:isCollapse}">
    <div class="layout_aside">
      <div class="collapse-box" @click="changeFold">
        <i class="iconfont daiosArtboardCopy46" :class="{isCollapse:isCollapse}"></i>
      </div>
      <div class="nav-container">
        <router-link
          :to="item.path"
          v-for="item in menuData"
          class="nav-item"
          :class="{active:active==item.path}"
        >
          <el-tooltip effect="dark" :disabled="isCollapse" :content="item.alias" placement="right">
            <i class="nav-icon" :class="item.icon"></i>
          </el-tooltip>
          <transition name="el-fade-in-linear">
            <span class="nav-text" v-show="isCollapse">{{item.alias}}</span>
          </transition>
        </router-link>
      </div>
      <div class="nav-extra" v-if="type=='work'">
        <router-link
          to="/config/editor"
          class="nav-item"
          :class="{active:active.indexOf('/config')==0}"
        >
          <el-tooltip effect="dark" :disabled="isCollapse" content="配置中心" placement="right">
            <i class="nav-icon iconfont daiosArtboardCopy37"></i>
          </el-tooltip>
          <transition name="el-fade-in-linear">
            <span class="nav-text" v-show="isCollapse ">配置中心</span>
          </transition>
        </router-link>
      </div>
      <div class="nav-extra" v-if="type=='config'">
        <router-link
          to="/work/data_opera"
          class="nav-item"
          :class="{active:active.indexOf('/work')==0}"
        >
          <el-tooltip effect="dark" :disabled="isCollapse" content="工作空间" placement="right">
            <i class="nav-icon iconfont daiosArtboardCopy3"></i>
          </el-tooltip>
          <transition name="el-fade-in-linear">
            <span class="nav-text" v-show="isCollapse">工作空间</span>
          </transition>
        </router-link>
      </div>
    </div>
  </el-aside>
</template>

<script>
import NavMenu from "./components/menu";
import { mapState } from "vuex";
export default {
  components: {
    NavMenu: NavMenu
  },
  computed: {
    ...mapState({
      isCollapse: state => state.theme.isCollapse
    })
  },
  props: {
    type: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      menuData: [],
      active: "",
      asideWidth: 50,
      timer: null
    };
  },
  watch: {
    $route(val) {
      this.active = val.path;
    }
  },
  created() {
    this.asideWidth = this.isCollapse ? 50 : 170;
    this.active = this.$route.path;
    if (this.type == "admin") {
      this.menuData = require("./menu/admin.js").admin;
    } else if (this.type == "work") {
      this.menuData = require("./menu/work.js").work;
    } else if (this.type == "config") {
      this.menuData = require("./menu/config.js").config;
    }
  },
  methods: {
    /**
     * @description 折叠侧边栏
     * @param
     */
    changeFold() {
      this.$store.commit("changeCollapse", !this.isCollapse);
    }
  }
};
</script>

<style lang="scss">
.layout_aside {
  display: flex;
  flex-direction: column;
  height: 100%;
  .collapse-box {
    transition: color 0.2s ease-in-out;
    text-align: center;
    width: 100%;
    height: 34px;
    cursor: pointer;
    i {
      color: #505665;
      transition: color 0.2s ease-in-out;
      line-height: 34px;
      font-size: 18px;
    }
  }
  .collapse-box:hover {
    i {
      color: #33bdfe;
    }
  }
  .nav-container {
    flex: 1;
    overflow-y: auto;
  }
  .nav-item {
    display: block;
    height: 50px;
    overflow: hidden;
    line-height: 50px;
    color: #989ba3;
    background: #27292e;
    transition: all 0.2s ease-in-out;
    display: flex;
    .nav-icon {
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      transition: all 0.2s ease-in-out;
      font-size: 20px;
    }
    span {
      display: block;
      flex: 1;
      overflow: hidden;
      line-height: 50px;
      transition: all 0.2s ease-in-out;
      font-size: 14px;
      font-weight: 400;
    }
  }
  .nav-item.active {
    background: #161616;
    .nav-icon {
      color: #33BDFE
    }
  }
}
.nav-icon-sjcz {
  background: url("~@/assets/images/icon/nav_icon_sjcz.png") no-repeat center
    center;
  background-size: 27px 26px;
}
.nav-icon-yxls {
  background: url("~@/assets/images/icon/nav_icon_yxls.png") no-repeat center
    center;
  background-size: 22px 23px;
}
.nav-icon-drdc {
  background: url("~@/assets/images/icon/nav_icon_drdc.png") no-repeat center
    center;
  background-size: 22px 22px;
}
.nav-icon-setting {
  background: url("~@/assets/images/icon/nav_icon_pzzx.png") no-repeat center
    center;
  background-size: 22px 22px;
}
.nav-icon-qjsz {
  background: url("~@/assets/images/icon/nav_icon_qjsz.png") no-repeat center
    center;
  background-size: 19px 20px;
}
.nav-icon-yhgl {
  background: url("~@/assets/images/icon/nav_icon_yhgl.png") no-repeat center
    center;
  background-size: 20px 20px;
}
.nav-icon-bjqpz {
  background: url("~@/assets/images/icon/nav_icon_bjqpz.png") no-repeat center
    center;
  background-size: 21px 23px;
}
.nav-icon-mbgl {
  background: url("~@/assets/images/icon/nav_icon_mbgl.png") no-repeat center
    center;
  background-size: 23px 23px;
}
.nav-icon-cxsz {
  background: url("~@/assets/images/icon/nav_icon_cxsz.png") no-repeat center
    center;
  background-size: 23px 24px;
}
.nav-item.active,
.nav-item:hover {
  color: #fff;
  .nav-icon-sjcz {
    background: url("~@/assets/images/icon/nav_icon_sjcz_current.png") no-repeat
      center center;
    background-size: 27px 26px;
  }
  .nav-icon-yxls {
    background: url("~@/assets/images/icon/nav_icon_yxls_current.png") no-repeat
      center center;
    background-size: 22px 23px;
  }
  .nav-icon-drdc {
    background: url("~@/assets/images/icon/nav_icon_drdc_current.png") no-repeat
      center center;
    background-size: 22px 22px;
  }
  .nav-icon-setting {
    background: url("~@/assets/images/icon/nav_icon_pzzx_current.png") no-repeat
      center center;
    background-size: 22px 22px;
  }
  .nav-icon-qjsz {
    background: url("~@/assets/images/icon/nav_icon_qjsz_current.png") no-repeat
      center center;
    background-size: 19px 20px;
  }
  .nav-icon-yhgl {
    background: url("~@/assets/images/icon/nav_icon_yhgl_current.png") no-repeat
      center center;
    background-size: 20px 20px;
  }
  .nav-icon-bjqpz {
    background: url("~@/assets/images/icon/nav_icon_bjqpz_current.png") no-repeat center
      center;
    background-size: 21px 23px;
  }
  .nav-icon-mbgl {
    background: url("~@/assets/images/icon/nav_icon_mbgl_current.png") no-repeat center
      center;
    background-size: 23px 23px;
  }
  .nav-icon-cxsz {
    background: url("~@/assets/images/icon/nav_icon_cxsz_current.png") no-repeat center
      center;
    background-size: 23px 24px;
  }
}
.el-aside {
  width: 50px !important;
  transition: all 0.4s ease-in-out;
}
.el-aside.isCollapse {
  width: 170px !important;
}
.el-aside .icon-menu1{
  display: inline-block;
  font-size: 22px!important;
  transform: rotate(-90deg);
  transition: color .2s ease-in-out, transform 0.4s ease-in-out !important;
}
.el-aside .icon-menu1.isCollapse {
  transform: rotate(0)
}
</style>
