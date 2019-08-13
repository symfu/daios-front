<template>
  <el-container class="layout_container">
    <el-header height="50px">
      <MHeader></MHeader>
    </el-header>
    <el-main :class="{'bg-white':type==1,'bg-black':type==2}" style="padding:30px 0;box-sizing:border-box;height:100%">
      <div class="doc-container" >
        <div>
          <h1 class="row-title">
            Daios文档
            <div class="row-title__ft">
              <el-button @click="changeType" size="mini">切换{{type==1?'黑夜':'白天'}}模式</el-button>
            </div>
          </h1>
        </div>
        <MText></MText>
        <Layout></Layout>
        <Avatar></Avatar>
        <Icon></Icon>
        <Editor></Editor>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  import MHeader from '@/layout/header/header'
  import Avatar from './components/avatar'
  import MText from './components/text'
  import Layout from './components/layout'
  import Icon from './components/icon'
  import Editor from './components/editor'
  export default {
    components: {
      MHeader,
      Avatar,
      MText,
      Layout,
      Icon,
      Editor
    },
    data () {
      return {
        type: 1
      }
    },
    methods: {
      changeType() {
        this.type = this.type == 1 ? 2 : 1
      }
    }
  }
</script>

<style lang="scss">
  @import "~@/assets/style/laytout.scss";
  @import "~@/assets/style/base.scss";
  @import "./doc.scss";
</style>
