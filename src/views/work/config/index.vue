<template>
  <div class="config-container full bg-white flex">
    <div class="config-sidebar">
      <router-link to="/config/editor" class="item" :class="{active:type=='editor'}">
        编辑器配置
      </router-link>
      <router-link to="/config/template" class="item" :class="{active:type=='template'}">
        模板管理
      </router-link>
      <router-link to="/config/query" class="item" :class="{active:type=='query'}">
        查询设置
      </router-link>
    </div>
    <div class="config-content padding">
      <MEditor v-if="type=='editor'"></MEditor>
      <MTemplate v-if="type=='template'"></MTemplate>
      <MQuery v-if="type=='query'"></MQuery>
    </div>
  </div>
</template>

<script>
import MEditor from "./components/editor"
import MTemplate from "./components/template"
import MQuery from "./components/query"
  export default {
    components: {
      MEditor,
      MTemplate,
      MQuery
    },
    
    data () {
      return {
        type: ''
      }
    },
    created() {
      this.setType()
    },
    watch: {
      $route() {
        this.setType()
      }
    },
    methods: {
      setType() {
        this.type = this.$route.path.split('/')[2]
      }
    },
  }
</script>

<style lang="scss" scoped>
.config-container {
  width: 100%;
  height: 100%;
  display: flex;
}
.config-sidebar {
  width: 190px;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  border: 1px solid #fff;
  background: #FBFBFB;
  .item {
    display: block;
    width: 100%;
    height: 41px;
    line-height: 40px;
    box-sizing: border-box;
    border-bottom: 1px solid #fff;
    padding: 0 16px
  }
  .item.active {
    background-image: linear-gradient(-89deg, #FAFEFF 0%, #E3F3FF 89%);
  }
}
.config-content {
  height: 100%;
  overflow-y: auto;
}
 
</style>
