<template>
  <el-container class="layout_container">
    <el-header height="50px">
      <layoutHeader></layoutHeader>
    </el-header>
    <el-container>
      <layoutAside :type="'work'"></layoutAside>
      <el-main class="work" v-if="theme=='black'">
        <splitpanes
          @resize="rezizeLog('resize', $event)"
          @resized="log('resized', $event)"
          @pane-maximize="log('pane-maximize', $event)"
          @pane-click="panelog('pane-click', $event)"
          @ready="log('ready', $event)"
          @splitter-click="log('splitter-click', $event)"
          class="default-theme touch-example"
          watch-slots
          style="height: 100%"
        >
          <span :splitpanes-max="maxSplit" :splitpanes-min="minSplit" :splitpanes-size="paneSize">
            <div class="two_asides">
              <keep-alive>
                <router-view/>
              </keep-alive>
            </div>
          </span>
          <span :splitpanes-size="100 - paneSize">
            <!-- 编辑器核心（编辑器以及结果集部分） -->
            <multiplePage></multiplePage>
            <workCore></workCore>
          </span>
        </splitpanes>
      </el-main>
      <el-main class="admin-main bg-grey" v-else>
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-footer style="height:35px" v-if="theme=='black'">
      <layoutFooter></layoutFooter>
    </el-footer>
  </el-container>
</template>

<script>
import Splitpanes from "splitpanes";
import { mapState } from "vuex";
import layoutHeader from "../../layout/header/header";
import layoutAside from "../../layout/aside/aside";
import layoutFooter from "../../layout/footer/footer";
import multiplePage from "./components/multiple-page-control/multiple.page"; //多页签控制器
import workCore from "./work-core/index";
import { work } from "@/layout/aside/menu/work.js";
export default {
  components: {
    Splitpanes,
    layoutHeader,
    layoutAside,
    layoutFooter,
    multiplePage,
    workCore
  },
  watch: {
    $route() {
      this.setTheme();
    },
    width(val) {
      //console.log(val);
    },
    sqlEditBigScreen(val) {
      if (val) {
        this.resize();
      } else {
        this.paneSize = 0;
      }
    }
  },
  props: {
    isKeepLive: Boolean
  }, 
  computed: {
    ...mapState({
      sqlEditBigScreen: state => state.work.sqlEditBigScreen,
      pageList: state => state.work.pageList,
    })
  },
  data() {
    return {
      paneSize: 20,
      width: document.body.clientWidth,
      maxSplit: "",
      minSplit: "",
      theme: "black",
    };
  },
  created() {
    
    this.resize();
    this.setTheme();
    this.$util.saveTheme("BLACK");
  },
  mounted() {
    window.addEventListener("resize", e => {
      this.resize();
    });
  },
  methods: {
    /**
     * @description 设置自适应
     * @param
     */
    resize() {
      //console.log(document.body.clientWidth);
      this.width = document.body.clientWidth;
      if (this.width < 1366) {
        this.paneSize = 30;
        this.maxSplit = 33;
        this.minSplit = 28;
      } else if (this.width < 1170) {
        this.paneSize = 33;
        this.maxSplit = 36;
        this.minSplit = 30;
      } else if (this.width < 980) {
        this.paneSize = 40;
        this.maxSplit = 45;
        this.minSplit = 38;
      } else {
        this.paneSize = 20;
        this.maxSplit = 29;
        this.minSplit = 20;
      }
    },
    /**
     * @description 点击拖动线事件
     * @param
     */
    rezizeLog(a, b) {
      console.log('点击拖动线事件')
      this.$store.commit("setSqlEditBigScreen", true);
      setTimeout(() => {
        this.$store.commit("reSizeResTable", true);
      }, 50);
    },
    panelog() {
      console.log('点击拖动线事件')
      setTimeout(() => {
        this.$store.commit("reSizeResTable", true);
      }, 50);
    },
    log() {},
    setTheme() {
      const temp = work.find(t => t.path == this.$route.path);
      if (temp) {
        this.theme = "black";
      } else {
        this.theme = "white";
      }
    }
  },
  destroyed() {
    this.$store.commit('pageList',[])
  },
};
</script>

<style lang='scss'>
@import "../../assets/style/laytout.scss";
@import "./index.scss";
</style>
