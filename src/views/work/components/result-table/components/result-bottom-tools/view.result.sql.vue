<template>
  <el-dialog
    :visible.sync="dialog"
    width="30%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="cancle"
  >
    <span slot="title">
      <i class="el-icon-s-platform"></i>预览SQL语句
    </span>
    <div>
      <p style="color:#fff;margin-bottom:5px;" v-for="item,i in List">{{item}}</p>
    </div>
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
    dialog: Boolean,
    List:Array,
  },
  computed: {
    ...mapState({ pageCurrent: state => state.work.pageCurrent })
  },
  watch: {
    dialog(val) {
      if (val) {
        
      }
    }
  },

  data() {
    return {
     
    };
  },

  methods: {
    /**
     * @description 关闭dialog
     * @param
     */
    cancle() {
     
      this.$emit("closeDialog", false);
    },
    // 点击确认按钮
    clickSubmit() {
     this.$parent.updateDDL(this.List)
    }
  },

  created() {},
  mounted() {}
};
</script>

<style lang='scss'>
.v-modal {
  display: none;
}
</style>
