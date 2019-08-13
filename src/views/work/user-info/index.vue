<template>
  <div class="page-view bg-black padding" style="background:#000">
    <div class="row-title">
      <h3>个人信息</h3>
      <div class="row-title__ft">
        <el-button size="mini" type="blue" @click="dialogEditVisible=true">编辑</el-button>
        <el-button size="mini" @click="dialogModifyPwd=true">修改密码</el-button>
      </div>
    </div>
    <div class="mt mb">
      <el-form label-width="100px" v-model="form" :form="form" ref="form">
        <el-form-item label="姓　　名">
          <span>{{form.nickName}}</span>
        </el-form-item>
        <el-form-item label="账　　户">
          <span>{{form.userName}}</span>
        </el-form-item>
        <el-form-item label="邮　　箱">
          <span>{{form.email}}</span>
        </el-form-item>
        <el-form-item label="手　　机">
          <span>{{form.telPhone}}</span>
        </el-form-item>
      </el-form>
    </div>
    <!-- 编辑 -->
    <DialogEdit
      :visible.sync="dialogEditVisible"
      :data="form"
      @success="editSuccess"
      v-if="dialogEditVisible"
    ></DialogEdit>
    <!-- 密码 -->
    <DialogPwd :visible.sync="dialogModifyPwd" @success="editSuccess" v-if="dialogModifyPwd"></DialogPwd>
  </div>
</template>

<script>
import Store from "store";
import { mapState } from "vuex";
import DialogEdit from "./components/dialog-edit";
import DialogPwd from "./components/dialog-pwd";
export default {
  components: {
    DialogEdit,
    DialogPwd
  },
  computed: {
    ...mapState({
      sqlEditBigScreen: state => state.work.sqlEditBigScreen
    })
  },
  data() {
    return {
      form: {},
      dialogEditVisible: false,
      dialogModifyPwd: false
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.$api.core.getUseInfo(Store.get("userData").userId).then(res => {
        this.form = res.data;
      });
    },
    editSuccess() {
      this.loadData();
      this.$store.commit('editUserSuccess',true)
      this.dialogEditVisible = false;
      this.dialogModifyPwd = false;
    }
  }
};
</script>

<style lang="scss">
.page-view {
  width: 100%;
  height: 100%;
  background: #000;
}
</style>
