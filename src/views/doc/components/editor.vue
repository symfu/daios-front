<template>
  <div class="editor" ref="container">编辑器</div>
</template>
<script>
import * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js';
export default {
  data(){
    return {
        editor: null,
        //黑色主题，vs是白色主题，我喜欢黑色
        curTheme: 'hc-black'
    }
  },
  components:{},
  props:{},
  created() {},
  watch:{},
  computed:{},
  methods:{

  },
  mounted() {
    this.editor = monaco.editor.create(this.$refs.container, {
        theme: this.curTheme, 
        automaticLayout: true,
        value:`console.log("hello,world")`,
        language:"javascript"
    })
    this.editor.onDidChangeModelContent((e) => { 
        console.log(123)
        console.log(e)   
    });
  },
  destroyed() {
    this.editor.dispose();
  }
}
</script>
<style lang="scss" scoped>

</style>