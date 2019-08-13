<template>
  <div>
    <h3 class="row-title">文本</h3>
    <h4>字号</h4>
    <div class="doc__main">
      <el-row :gutter="10" type="flex" align="middle" class="doc__main-header">
        <el-col :span="6">
          展示
        </el-col>
        <el-col :span="3">
          层级
        </el-col>
        <el-col :span="3">
          字体大小
        </el-col>
        <el-col :span="12">
          代码
        </el-col>
      </el-row>
      <el-row :gutter="10" type="flex" align="middle">
        <el-col :span="6">
          <span class="tips">Daios文档</span> 
        </el-col>
        <el-col :span="3">
          <span class="tips">辅助文字</span>
        </el-col>
        <el-col :span="3">
          <span class="tips">13px</span> 
        </el-col>
        <el-col :span="12">
          <pre v-text="text1"></pre>
        </el-col>
      </el-row>
      <el-row :gutter="10" type="flex" align="middle">
        <el-col :span="6">
          <p class="small">Daios文档</p>
        </el-col>
        <el-col :span="3">
          <p class="small">正文（小）</p>
        </el-col>
        <el-col :span="3">
          <p class="small">13px</p>
        </el-col>
        <el-col :span="12">
          <pre v-text="text2"></pre>
        </el-col>
      </el-row>
      <el-row :gutter="10" type="flex" align="middle">
        <el-col :span="6">
          <p>Daios文档</p>
        </el-col>
        <el-col :span="3">
          <p>正文</p>
        </el-col>
        <el-col :span="3">
          <p>14px</p>
        </el-col>
        <el-col :span="12">
          <pre v-text="text3"></pre>
        </el-col>
      </el-row>
      <el-row :gutter="10" type="flex" align="middle" >
        <el-col :span="6">
          <h4>Daios文档</h4>
        </el-col>
        <el-col :span="3">
          <h4>小标题</h4>
        </el-col>
        <el-col :span="3">
          <h4>16px</h4>
        </el-col>
        <el-col :span="12">
          <pre v-text="text4"></pre>
        </el-col>
      </el-row>
      <el-row :gutter="10" type="flex" align="middle">
        <el-col :span="6">
          <h3>Daios文档</h3>
        </el-col>
        <el-col :span="3">
          <h3>标题</h3>
        </el-col>
        <el-col :span="3">
          <h3>18px</h3>
        </el-col>
        <el-col :span="12">
          <pre v-text="text5"></pre>
        </el-col>
      </el-row>
      <el-row :gutter="10" type="flex" align="middle">
        <el-col :span="6">
          <h1>Daios文档</h1>
        </el-col>
        <el-col :span="3">
          <h1>主标题</h1>
        </el-col>
        <el-col :span="3">
          <h1>24px</h1>
        </el-col>
        <el-col :span="12">
          <pre v-text="text6"></pre>
        </el-col>
      </el-row>
    </div>
    <h4>行高</h4>
    <div class="doc__main">
      <el-row :gutter="10" type="flex" align="middle" class="doc__main-header">
        <el-col :span="6">
          展示
        </el-col>
        <el-col :span="3">
          层级
        </el-col>
        <el-col :span="3">
          行高
        </el-col>
        <el-col :span="12">
          代码
        </el-col>
      </el-row>
      <el-row :gutter="10" type="flex" align="middle">
        <el-col :span="6">
          <p class="lh-none">Daios文档内容<br>Daios文档内容</p> 
        </el-col>
        <el-col :span="3">
          <p class="lh-none">无行高</p>
        </el-col>
        <el-col :span="3">
          <p class="lh-none">1</p>
        </el-col>
        <el-col :span="12">
          <pre v-text="text2_1"></pre>
        </el-col>
      </el-row>
      <el-row :gutter="10" type="flex" align="middle">
        <el-col :span="6">
          <p class="lh-small">Daios文档内容<br>Daios文档内容</p> 
        </el-col>
        <el-col :span="3">
          <p class="lh-small">紧凑</p>
        </el-col>
        <el-col :span="3">
          <p class="lh-small">1.3</p>
        </el-col>
        <el-col :span="12">
          <pre v-text="text2_2"></pre>
        </el-col>
      </el-row>
      <el-row :gutter="10" type="flex" align="middle">
        <el-col :span="6">
          <p>Daios文档内容<br>Daios文档内容</p> 
        </el-col>
        <el-col :span="3">
          <p>常规</p>
        </el-col>
        <el-col :span="3">
          <p>1.5</p>
        </el-col>
        <el-col :span="12">
          <pre v-text="text2_3"></pre>
        </el-col>
      </el-row>
      <el-row :gutter="10" type="flex" align="middle" >
        <el-col :span="6">
          <p class="lh-middle">Daios文档内容<br>Daios文档内容</p> 
        </el-col>
        <el-col :span="3">
          <p class="lh-middle">宽松</p>
        </el-col>
        <el-col :span="3">
          <p class="lh-middle">1.7</p>
        </el-col>
        <el-col :span="12">
          <pre v-text="text2_4"></pre>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        text1: `<span class="tips"></span>`,
        text2: `<p class="small"></p>`,
        text3: `<p>Daios文档</p>`,
        text4: `<h4>Daios文档</h4>`,
        text5: `<h3>Daios文档</h3>`,
        text6: `<h1>Daios文档</h1>`,
        text2_1: `<p class="lh-none">Daios文档内容<br>Daios文档内容</p>`,
        text2_2: `<p class="lh-small">Daios文档内容<br>Daios文档内容</p>`,
        text2_3: `<p>Daios文档内容<br>Daios文档内容</p>`,
        text2_4: `<p class="lh-middle">Daios文档内容<br>Daios文档内容</p>`,
      }
    }
  }
</script>

<style>

 
</style>
