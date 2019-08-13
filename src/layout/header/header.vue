<template>
  <div class="layout_header">
    <osLogo class="logo"></osLogo>
    <osUser class="user" :active="active"></osUser>
  </div>
</template>

<script>
import osLogo from "./components/header.logo";
import osUser from "./components/header.user";
export default {
  components: {
    osLogo,
    osUser
  },
  props: {
    active: {
      type: String,
      default: ''
    }
  },
  data() {
    return {};
  },

  methods: {},

  created() {}
};
</script>

<style lang='scss'>
  @import './header.scss';
</style>
