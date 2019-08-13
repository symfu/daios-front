<template>
  <div>
    <h3 class="row-title">布局</h3>
    <h4>内边距</h4>
    <div class="doc__main">
      <el-row :gutter="10" type="flex" align="middle">
        <el-col :span="8">
          <div class="layout-block padding">
            <div class="layout-block__inner">
              <h5>常规边距</h5>
              <span class="tips pt-mini">20px</span>
              <pre class="mt-mini">class="padding"</pre>
            </div>
          </div>
        </el-col>
        
      </el-row>
      <el-row :gutter="10" type="flex" align="middle">
        <el-col :span="8">
          <div class="layout-block padding-mini">
            <div class="layout-block__inner">
              <h5>极小边距</h5>
              <span class="tips pt-mini">5px</span>
              <pre class="mt-mini">class="padding-mini"</pre>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="layout-block padding-sm">
            <div class="layout-block__inner">
              <h5>小边距</h5>
              <span class="tips pt-mini">10px</span>
              <pre class="mt-mini">class="padding-sm"</pre>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="layout-block padding-lg">
            <div class="layout-block__inner">
              <h5>大边距</h5>
              <span class="tips pt-mini">30px</span>
              <pre class="mt-mini">class="padding-lg"</pre>
            </div>
          </div>
        </el-col>
      </el-row>
      <h5 class="row-title">上边距</h5>
      <el-row :gutter="10" type="flex" align="middle">
        <el-col :span="6">
          <div class="layout-block pt-lg">
            <div class="layout-block__inner">
              <h5>大</h5>
              <span class="tips pt-mini">30px</span>
              <pre class="mt-mini">class="pt-lg"</pre>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="layout-block pt">
            <div class="layout-block__inner">
              <h5>常规</h5>
              <span class="tips pt-mini">20px</span>
              <pre class="mt-mini">class="pt"</pre>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="layout-block pt-sm">
            <div class="layout-block__inner">
              <h5>小</h5>
              <span class="tips pt-mini">10px</span>
              <pre class="mt-mini">class="pt-sm"</pre>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="layout-block pt-mini">
            <div class="layout-block__inner">
              <h5>极小</h5>
              <span class="tips pt-mini">5px</span>
              <pre class="mt-mini">class="pt-mini"</pre>
            </div>
          </div>
        </el-col>
      </el-row>
      <h5 class="row-title">左边距</h5>
      <el-row :gutter="10" type="flex" align="middle">
        <el-col :span="6">
          <div class="layout-block pl-lg">
            <div class="layout-block__inner">
              <h5>大</h5>
              <span class="tips pt-mini">30px</span>
              <pre class="mt-mini">class="pl-lg"</pre>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="layout-block pl">
            <div class="layout-block__inner">
              <h5>常规</h5>
              <span class="tips pt-mini">20px</span>
              <pre class="mt-mini">class="pl"</pre>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="layout-block pl-sm">
            <div class="layout-block__inner">
              <h5>小</h5>
              <span class="tips pt-mini">10px</span>
              <pre class="mt-mini">class="pl-sm"</pre>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="layout-block pl-mini">
            <div class="layout-block__inner">
              <h5>极小</h5>
              <span class="tips pt-mini">5px</span>
              <pre class="mt-mini">class="pl-mini"</pre>
            </div>
          </div>
        </el-col>
      </el-row>
      <h5 class="row-title">右边距</h5>
      <el-row :gutter="10" type="flex" align="middle">
        <el-col :span="6">
          <div class="layout-block pr-lg">
            <div class="layout-block__inner">
              <h5>大</h5>
              <span class="tips pt-mini">30px</span>
              <pre class="mt-mini">class="pr-lg"</pre>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="layout-block pr">
            <div class="layout-block__inner">
              <h5>常规</h5>
              <span class="tips pt-mini">20px</span>
              <pre class="mt-mini">class="pr"</pre>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="layout-block pr-sm">
            <div class="layout-block__inner">
              <h5>小</h5>
              <span class="tips pt-mini">10px</span>
              <pre class="mt-mini">class="pr-sm"</pre>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="layout-block pr-mini">
            <div class="layout-block__inner">
              <h5>极小</h5>
              <span class="tips pt-mini">5px</span>
              <pre class="mt-mini">class="pr-mini"</pre>
            </div>
          </div>
        </el-col>
      </el-row>
      <h5 class="row-title">下边距</h5>
      <el-row :gutter="10" type="flex" align="middle">
        <el-col :span="6">
          <div class="layout-block pr-lg">
            <div class="layout-block__inner">
              <h5>大</h5>
              <span class="tips pt-mini">30px</span>
              <pre class="mt-mini">class="pr-lg"</pre>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="layout-block pr">
            <div class="layout-block__inner">
              <h5>常规</h5>
              <span class="tips pt-mini">20px</span>
              <pre class="mt-mini">class="pr"</pre>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="layout-block pr-sm">
            <div class="layout-block__inner">
              <h5>小</h5>
              <span class="tips pt-mini">10px</span>
              <pre class="mt-mini">class="pr-sm"</pre>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="layout-block pr-mini">
            <div class="layout-block__inner">
              <h5>极小</h5>
              <span class="tips pt-mini">5px</span>
              <pre class="mt-mini">class="pr-mini"</pre>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <h4>外边距</h4>
    <div class="doc__main">
      内边距的 padding 改成 margin
      单边的 p 改换成 m， 如 pt 改成 mt， pt-sm 改成 mt-sm
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {

      }
    }
  }
</script>

<style lang="scss" scoped>
.layout-block {
  background: #999;
  .layout-block__inner {
    background: rgba(255,255,255,.8);
  }
}
.bg-black {
  .layout-block__inner {
    background: rgba(0,0,0,.8);
  }
}
</style>
