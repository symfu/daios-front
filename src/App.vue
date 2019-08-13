<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
</script>
<style lang="scss">
@import "@/assets/style/base.scss";
@import "@/assets/style/laytout.scss";
@import "@/assets/style/element.scss";
@import "@/assets/style/theme.scss";
@import "@/assets/style/icon.scss";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#app {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
}
html,
body,
#app {
  height: 100%;
  min-width: 980px;
  min-height: 730px;
  margin: 0px;
  padding: 0px;
  overflow: auto;
 
}
</style>
