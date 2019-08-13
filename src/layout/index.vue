<template>
  <el-container class="layout_container">
    <el-header height="50px">
      <layoutHeader></layoutHeader>
    </el-header>
    <el-container>
      <layoutAside></layoutAside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container> 
    <el-footer style="height:35px">
      <layoutFooter></layoutFooter>
    </el-footer>
  </el-container>
</template>

<script>
import layoutHeader from "./header/header";
import layoutAside from "./aside/aside";
import layoutFooter from "./footer/footer";
import { mapState } from "vuex";
export default {
  components: {
    layoutHeader,
    layoutAside,
    layoutFooter
  },
  computed: {
    ...mapState({
      asideWidth: state => state.theme.asideWidth
    })
  },
  props: {
    isKeepLive:Boolean,
    
  },
  data() {
    return {};
  },

  methods: {},

  created() {}
};
</script>

<style lang='scss'>
</style>
