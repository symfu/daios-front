<template>
  <el-dialog
    :visible.sync="dialog"
    width="30%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="cancle"
  >
    <span slot="title">
      <i class="el-icon-s-platform"></i>收藏代码
    </span>
    <el-form
      class="editor_top_collection"
      :model="form"
      label-width="80px"
      style="padding:20px 20px 20px 0;"
    >
      <el-form-item label="收藏名称">
        <el-input v-model="form.alias" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="收藏夹">
        <el-select v-model="form.collection" size="mini" placeholder>
          <el-option
            v-for="item,i in collectionList"
            :key="i"
            :label="item.directoryName"
            :value="item.directoryId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="收藏内容">
        <el-input type="textarea" disabled v-model="form.content" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.common" size="mini"></el-input>
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
        this.getCollectionList();
        this.form.alias = "";
        this.form.collection = "";
        this.form.common = "";
        this.form.content = this.pageCurrent.sql;
      }
    }
  },

  data() {
    return {
      form: {
        alias: "",
        content: "",
        collection: "",
        common: ""
      },
      collectionList: []
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
      if (this.form.alias == "") {
        this.$message.error("收藏名称不能为空");
        return false;
      } else if (this.form.collection == "") {
        this.$message.error("收藏夹不能为空");
        return false;
      }
      let params = {
        alias: this.form.alias,
        connectId: this.pageCurrent.cpId,
        content: this.form.content,
        directoryId: this.form.collection,
        remarks: this.form.common,
        userId: Store.get("userData").userId
      };
      // //console.log(params);
      this.$api.user.collection.addCollection(params).then(res => {
        if (res.resCode == 10000) {
          //console.log(res.data);
          this.$emit("closeDialog", false);
          this.$store.commit("setRefreCollection",true)
          this.$message.success(res.resMsg);
        } else {
          this.$message.error(res.resMsg);
        }
      });
    },
    /**
     * @description 获取收藏夹列表
     * @param
     */
    getCollectionList() {
      this.$api.user.collection
        .getCollectionList(this.pageCurrent.cpId)
        .then(res => {
          if (res.resCode == 10000) {
            //console.log("获取收藏夹列表");
            this.collectionList = res.data;
          } else {
            this.$message.error(res.resMsg);
          }
        });
    }
  },

  created() {
    this.getCollectionList();
  },
  mounted() {}
};
</script>

<style lang='scss'>
.editor_top_collection.el-form {
  .el-form-item {
    .el-form-item__content {
      .el-select {
        .el-input.el-input--suffix {
          .el-input__inner {
            background-color: #323437;
          }
          .el-input__icon {
            line-height: 26px;
          }
        }
      }
    }
  }
}
</style>
