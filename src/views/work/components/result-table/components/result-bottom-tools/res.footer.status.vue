<template>
  <div class="res_footer_status">
    <div class="res_footer_status_item s1">当前连接数：{{linkNUm.length}}</div>
    <div class="res_footer_status_item s2"><i class="res_status_success"></i> 执行成功，耗时{{toolsData.excuteTime}}毫秒</div>
    <div class="res_footer_status_item s3">{{toolsData.executeSentence}}</div>
    <div class="res_footer_status_item s4 ">系统版本：{{verion}}</div>
    <!-- <div class="res_footer_status_item s4 ">系统版本：{{last==""?"暂无连接":last}}</div> -->
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  computed: {
    ...mapState({
      linkNUm: state => state.work.linkNUm,
      linkId: state => state.work.linkId,
    })
  },
  props: {
    toolsData: Object
  },
   watch:{
   linkNUm(val) {
     //console.log(val);
     this.arr = []
     for (let i = 0; i < val.length; i++) {
       let e = val[i];
       if (e.open) {
         //console.log('1');
         this.arr.push(e)
       }
       if (e.dataSourceId==this.linkId) {
         this.last = e.label
       }
     }
     //console.log(this.arr);
   }
  },
  data() {
    return {
       arr:[],
      last:'',
      verion:''
    };
  },

  methods: {
     /**
     * @description 获取版本
     * @param 
     */
    getVer() {
      this.$api.user.ver.getVer().then(res => {
        if (res.resCode == 10000) {
        this.verion =  res.data.verion
        } else {
          this.$message.error(res.resMsg);
        }
      });
    }
  },

  created() {
    this.getVer()
  }
};
</script>

<style lang='scss'>
</style>
