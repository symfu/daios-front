<template>
  <el-dialog
    :visible.sync="dialog"
    width="30%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="cancle"
  >
    <span slot="title">
      <i class="el-icon-s-platform"></i> 编辑收藏
    </span>
    <el-form
      class="edit_collection"
      :model="form"
      label-width="80px"
      style="padding:20px 20px 20px 0;"
    >
      <el-form-item label="收藏名称">
        <el-input v-model="form.alias" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="收藏夹">
        <!-- <el-input v-model="form.collection" disabled></!-->
        <el-select style="width:100%" v-model="form.collection" disabled placeholder>
          <el-option
            v-for="item,i in collectionList"
            :key="i"
            :label="item.directoryName"
            :value="item.directoryId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="收藏内容">
        <el-input type="textarea" size="mini" disabled v-model="form.content"></el-input>
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
    dialog: Boolean,
    editData: Object
  },
  computed: {
    ...mapState({ pageCurrent: state => state.work.pageCurrent })
  },
  watch: {
    dialog(val) {
      if (val) {
        //console.log(this.editData);
        this.form.alias = this.editData.alias;
        this.form.collection = this.editData.directoryId;
        this.form.collectionId = this.editData.collectionId;
        this.form.common = this.editData.remarks;
        this.form.content = this.editData.content;
        this.getCollectionList();
      }
    }
  },

  data() {
    return {
      form: {
        alias: "",
        content: "",
        collection: "",
        collection: 0,
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
      }
      let params = {
        alias: this.form.alias,
        connectId: this.pageCurrent.cpId,
        content: this.form.content,
        collectionId:this.form.collectionId,
        directoryId: this.editData.directoryId,
        remarks: this.form.common,
        userId: Store.get("userData").userId
      };
      // //console.log(params);
      this.$api.user.collection.updateCollection(params).then(res => {
        if (res.resCode == 10000) {
          //console.log(res.data);
          this.$emit("closeDialog", false);
          this.$parent.loadData();
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
            this.collectionList = res.data;
            for (let i = 0; i < this.collectionList.length; i++) {
              const element = this.collectionList[i];
              if (this.form.collection == element.directoryId) {
                this.form.collection = element.directoryName;
              }
            }
          } else {
            this.$message.error(res.resMsg);
          }
        });
    }
    // load(data) {
    //   this.form.alias = data.alias;
    //   this.form.collection = data.directoryId;
    //   this.form.common = data.remarks;
    //   this.form.content = data.content;
    // }
  },

  created() {
    this.getCollectionList();
  },
  mounted() {}
};
</script>

<style lang='scss'>
.edit_collection.el-form {
  .el-input__suffix {
    display: none;
  }
}
</style>
