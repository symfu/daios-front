<template>
  <el-dialog
    :visible.sync="dialog"
    width="30%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="cancle"
  >
    <span slot="title">
      <i class="el-icon-s-platform"></i>添加收藏夹
    </span>
    <el-form :model="form" label-width="100px" style="padding:20px 20px 20px 0;">
      <el-form-item label="收藏夹名称">
        <el-input v-model="form.directoryName" size="mini"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="clickSubmit" size="mini">确定</el-button>
      <el-button @click="cancle" size="mini">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from "vuex";
import Store from "store";
export default {
  props: {
    dialog: Boolean
  },
  computed: {
    ...mapState({ pageCurrent: state => state.work.pageCurrent })
  },
  watch: {
    dialog(val) {
      if (val) {
        this.form.directoryName = "";
      }
    }
  },

  data() {
    return {
      form: {
        directoryName: "",
      }
    };
  },

  methods: {
    /**
     * @description 关闭dialog
     * @param
     */
    cancle() {
       let _data = {
            data:null,
            isSuccess:false
          }
      this.$emit("closeDialog", _data);
    },
    // 点击确认按钮
    clickSubmit() {
      if (this.form.directoryName == "") {
        this.$message.error("收藏夹名称不能为空");
        return false;
      }
      let params = {
        directoryName: this.form.directoryName,
        connectId: this.pageCurrent.cpId,
        directoryId: 0
      };
      this.$api.user.collection.addCollectionDirectory(params).then(res => {
        if (res.resCode == 10000) {
          //console.log(res.data);
          let _data = {
            data:res.data,
            isSuccess:true
          }
          this.$emit("closeDialog", _data);
          this.$message.success(res.resMsg);
        } else {
          this.$message.error(res.resMsg);
        }
      });
    }
  },

  created() {},
  mounted() {}
};
</script>

<style lang='scss'>
</style>
