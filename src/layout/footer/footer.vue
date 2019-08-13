<template>
  <div class="footer">
    <div class="fl s1">当前连接数：{{linkNUm.length}}</div>
    <div class="fr s4" style="margin-right: 50px;">系统版本：{{verion}}</div>
    <!-- <div class="fr s4 " style="margin-right: 100px;">系统版本：{{last==""?"暂无连接":last}}</div> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      linkNUm: state => state.work.linkNUm,
      linkId: state => state.work.linkId
    })
  },
  data() {
    return {
      arr: [],
      last: "",
      verion: ""
    };
  },
  watch: {
    linkNUm(val) {
      //console.log(val);
      this.arr = [];
      for (let i = 0; i < val.length; i++) {
        let e = val[i];
        if (e.open) {
          //console.log("1");
          this.arr.push(e);
        }
        if (e.dataSourceId == this.linkId) {
          this.last = e.label;
        }
      }
      //console.log(this.arr);
    }
  },
  methods: {
    /**
     * @description 获取版本
     * @param
     */
    getVer() {
      this.$api.user.ver.getVer().then(res => {
        if (res.resCode == 10000) {
          this.verion = res.data.verion;
        } else {
          this.$message.error(res.resMsg);
        }
      });
    }
  },

  created() {
    this.getVer();
  }
};
</script>

<style lang='scss'>
.footer {
  height: 35px;
  color: #33bdfe;
  line-height: 35px;
}
.el-footer {
  padding: 0 0 0 50px;
}
</style>
