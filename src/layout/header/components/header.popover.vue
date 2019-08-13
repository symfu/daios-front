<template>
  <div class="msg_box">
    <div class="msg_box_title"></div>
  </div>
</template>

<script>
import Store from "store";
export default {
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<style lang="scss">
.msg_box {
  // background-color: #252525;
  background-color: #fff;
  z-index: 888;
  position: absolute;
  right: 0;
  width: 280px;
  height: 240px;
  font-family: PingFangSC;
  font-weight: 400;
  .msg_box_title {
    height: 50px;
    margin: 0 20px;
    border-bottom: 1px solid  #353535;
  }
}
</style>
