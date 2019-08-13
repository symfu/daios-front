<template>
  <div class="sql_editor_link_infos">
    <div class="title">连接信息</div>
    <div class="title_info">
      <div class="link_logo fl">
        <img :src="data.PNG" style="width:100%;height:100%" alt>
      </div>
      <div class="fl" style="margin-left: 20%;line-height:80px">{{pageCurrent.dataSource}}</div>
    </div>
    <div class="con">
      <div v-for="key,value in data" :key="value">
        <div v-if="value!='PNG'" style=" margin-bottom: 10px;">{{value}}</div>
        <div v-if="value!='PNG'" style="color:#a9a9ab;margin-bottom: 10px;padding-left: 20px;">{{key}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      pageCurrent: state => state.work.pageCurrent
    })
  },
  data() {
    return {
      data: {}
    };
  },

  methods: {
    /**
     * @description 获取连接信息
     * @param
     */
    init() {
      //console.log(this.pageCurrent);

      this.$api.sql.sql_model
        .getLinkInfos(Number(this.pageCurrent.connId))
        .then(res => {
          if (res.resCode == 10000) {
            this.data = res.data;
            //console.log(this.data.服务器版本);
          } else {
            this.$message.error(res.resMsg);
          }
        });
    }
  },

  created() {
    this.init();
  }
};
</script>

<style lang='scss'>
</style>
