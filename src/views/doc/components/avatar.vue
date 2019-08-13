<template>
  <div>
    <h3 class="row-title">头像</h3>
    <div class="doc__main">
      <el-row :gutter="10" type="flex" align="middle" class="doc__main-header">
        <el-col :span="3">
          展示
        </el-col>
        <el-col :span="3">
          尺寸
        </el-col>
        <el-col :span="2">
          类型
        </el-col>
        <el-col :span="4">
          使用情况
        </el-col>
        <el-col :span="12">
          代码
        </el-col>
      </el-row>
      <el-row :gutter="10" type="flex" align="middle">
        <el-col :span="3">
          <div class="avatar mini"></div>
        </el-col>
        <el-col :span="3">
          22 * 22
        </el-col>
        <el-col :span="2">
          mini
        </el-col>
        <el-col :span="4">
          顶部使用
        </el-col>
        <el-col :span="12">
          <pre v-text="text1"></pre>
        </el-col>
      </el-row>
      <el-row :gutter="10" type="flex" align="middle">
        <el-col :span="3">
          <div class="avatar middle"></div>
        </el-col>
        <el-col :span="3">
          40 * 40
        </el-col>
        <el-col :span="2">
          middle
        </el-col>
        <el-col :span="4">
          未使用
        </el-col>
        <el-col :span="12">
          <pre v-text="text2"></pre>
        </el-col>
      </el-row>
      <el-row :gutter="10" type="flex" align="middle">
        <el-col :span="3">
          <div class="avatar middle">
            <img src="https://apic.douyucdn.cn/upload/avatar/003/92/16/12_avatar_middle.jpg" alt="">
          </div>
        </el-col>
        <el-col :span="3">
          40 * 40
        </el-col>
        <el-col :span="2">
          middle
        </el-col>
        <el-col :span="4">
          未使用
        </el-col>
        <el-col :span="12">
          <pre v-text="text3"></pre>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        text1: '<div class="avatar mini"></div>',
        text2: '<div class="avatar middle"></div>',
        text3: 
`<div class="avatar middle">
  <img src="..."/>
</div>`
      }
    }
  }
</script>

<style>

 
</style>
