<template>
  <el-dialog
    :visible.sync="dialog"
    width="30%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="cancle"
  >
    <span slot="title">新增项目</span>
    <el-form style="padding:20px" label-width="80px" :model="form">
      <el-form-item label="项目名称">
        <el-input v-model="form.name" size="mini" placeholder="请输入项目名称"></el-input>
      </el-form-item>
      <el-form-item label="项目描述">
        <el-input v-model="form.desc" size="mini" type="textarea" placeholder="请输入项目描述"></el-input>
      </el-form-item>
      <el-form-item label="项目范围">
        <div>
          <el-checkbox label="私有" @change="changeSy" v-model="form.siyou"></el-checkbox>&nbsp;&nbsp;&nbsp;&nbsp;私有项目不能被其他人检索，只能通过邀请加入。
        </div>
        <div>
          <el-checkbox label="公有" v-model="form.gongyou" @change="changeGy"></el-checkbox>&nbsp;&nbsp;&nbsp;&nbsp;公开项目能被所有人检索，允许申请加入。
        </div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="submit" type="blue" size="mini">确定</el-button>
      <el-button @click="cancle" type="gary" size="mini">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import Store from "store";
export default {
  props: {
    dialog: Boolean
  },
  watch: {
    dialog(val) {
      if (val == true) {
        this.form = {
          name: "",
          desc: "",
          siyou: false,
          gongyou: false
        };
      }
    }
  },
  data() {
    return {
      form: {
        name: "",
        desc: "",
        siyou: false,
        gongyou: false
      }
    };
  },

  methods: {
    /**
     * @description 提交
     * @param
     */
    submit() {
      if (this.form.name == "") {
        this.$message.error("项目名称不能为空");
        return false;
      } else if (!this.form.siyou && !this.form.gongyou) {
        this.$message.error("请选择项目范围");
        return false;
      }
      let range;
      if (this.form.siyou && !this.form.gongyou) {
        range = false;
      } else if (!this.form.siyou && this.form.gongyou) {
        range = true;
      }
      let params = {
        admin: true,
        available: true,
        desc: this.form.desc,
        exist: true,
        managerId: Store.get("userData").userId,
        projectName: this.form.name,
        range: range
      };
      this.$api.project.pro.addPm(params).then(res => {
        if (res.resCode == 10000) {
          console.log(res.data);
          this.$message.success(res.resMsg);
          this.$emit("clickSubmit", false);
          //还需要通知顶部项目列表更新

          this.$store.commit("addRefrePro", true);
        } else {
          this.$message.error(res.resMsg);
        }
      });
    },
    /**
     * @description 取消
     * @param
     */
    cancle() {
      this.$emit("closeDialog", false);
    },
    /**
     * @description 选择私有框
     * @param
     */
    changeSy() {
      if (this.form.siyou) {
        this.form.gongyou = false;
      } else {
        this.form.gongyou = true;
      }
    },
    changeGy() {
      if (this.form.gongyou) {
        this.form.siyou = false;
      } else {
        this.form.siyou = true;
      }
    }
  },

  created() {}
};
</script>

<style lang='scss'>
</style>
