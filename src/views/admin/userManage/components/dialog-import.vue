<template>
  <el-dialog :visible="visible" title="请选择用户来源" width="360px" @close="closeHandle">
    <el-button @click="$router.push('/admin/importDing')" size="small">钉钉</el-button>
  </el-dialog>
</template>

<script>
  export default {
    props: ['visible'],
    data () {
      return {

      }
    },
    methods: {
      closeHandle() {
        this.$emit('update:visible', false)
      }
    }
  }
</script>

<style>

 
</style>
