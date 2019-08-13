<template>
  <el-dialog
    :visible.sync="dialog"
    width="30%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="cancle"
  >
    <span slot="title">选择过滤项</span>
    <el-form style="padding:20px" label-width="80px" :model="form">
      <el-form-item label="类型">
        <el-checkbox-group :max="1" v-model="checkList" @change="select">
          <el-checkbox label="操作成功"></el-checkbox>
          <el-checkbox label="操作中断"></el-checkbox>
          <el-checkbox label="操作失败"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="submit" type="blue" size="mini">确定</el-button>
      <el-button @click="cancle" type="gary" size="mini">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialog: Boolean
  },
  watch: {
    dialog(val) {
      if (val == true) {
      }
    }
  },
  data() {
    return {
      checkList: [],
      form: {}
    };
  },

  methods: {
    /**
     * @description 提交
     * @param
     */
    submit() {
      if (this.checkList.length == 0) {
        this.$message.error("操作类型不能为空");
        return false;
      }
      let data = "";
      if (this.checkList[0] == "操作成功") {
        data = "SUCCESS";
      } else if (this.checkList[0] == "操作中断") {
        data = "INTERRUPT";
      } else if (this.checkList[0] == "操作失败") {
        data = "FAIL";
      }
      this.$emit("clickSubmit", data);
    },
    /**
     * @description 取消
     * @param
     */
    cancle() {
      this.$emit("closeDialog", false);
    },
    /**
     * @description 选择类型
     * @param
     */
    select() {
      //console.log(this.checkList);
    }
  },

  created() {}
};
</script>

<style lang='scss'>
</style>
