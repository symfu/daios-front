<template>
  <el-container class="layout_container">
    <el-header height="50px">
      <layoutHeader :active="'admin'"></layoutHeader>
    </el-header>
    <el-container>
      <layoutAside :menu="'admin'" :type="'admin'"></layoutAside>
      <el-main class="admin-main bg-grey">
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import layoutHeader from "@/layout/header/header";
import layoutAside from "@/layout/aside/aside";
import layoutFooter from "@/layout/footer/footer";
export default {
  components: {
    layoutHeader,
    layoutAside,
    layoutFooter
  },
  data() {
    return {
      
    };
  },
  created() {
    this.$util.saveTheme('WHITE')
  }
};
</script>
