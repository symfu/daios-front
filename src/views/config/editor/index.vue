<template>
  <div class="ui-main padding full bg-white" v-loading="pageLoading">
    <h3 class="row-title">编辑器配置</h3>
    <div class="ui-form mt mb">
      <el-form label-width="150px" v-model="form" :form="form" :rules="rules" size="small">
        <el-form-item label="缩略图">
          <el-switch v-model="form.thumbnail"></el-switch>
        </el-form-item>
        <!-- <el-form-item label="自动保存">
          <el-switch v-model="form.automaticSave"></el-switch>
        </el-form-item> -->
        <!-- <el-form-item label="代码风格">
          <el-select v-model="form.codingStyle" style="width:330px">
            <el-option value="LOWER" label="小写">小写</el-option>
            <el-option value="UPPER" label="大写">大写</el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label="自动换行">
          <el-radio v-model="isHuanhang" :label="true">是</el-radio>
          <el-radio v-model="isHuanhang" :label="false">否</el-radio>
        </el-form-item>
        <!-- <el-form-item label="自动换行列数" v-if="form.automaticLineBreak">
          <el-input v-model="form.lineBreakNum" style="width:330px"></el-input>
        </el-form-item>-->
        <el-form-item label="代码字体大小">
          <el-input v-model="form.fontSize" style="width:330px"></el-input>
        </el-form-item>
        <!-- <el-form-item label="代码提示">
          <el-checkbox v-model="form.spaceHint">空格智能提示</el-checkbox>
        <el-checkbox v-model="form.keyWordHint">关键字</el-checkbox>-->
        <!-- <el-checkbox v-model="form.syntaxTemplate">语法模板</el-checkbox> -->
        <!-- <el-checkbox v-model="form.tableHint">表</el-checkbox>
        <el-checkbox v-model="form.columnHint">字段</el-checkbox>-->
        <!-- </el-form-item> -->
        <el-form-item label="主题风格">
          <el-radio v-model="form.themeStyle" label="BLACK">黑</el-radio>
          <el-radio v-model="form.themeStyle" label="WHITE">白</el-radio>
        </el-form-item>
        <!-- <el-form-item label="应用范围">
          <el-checkbox label="以上设置应用到所有工作空间中">以上设置应用到所有工作空间中</el-checkbox>
        </el-form-item>-->
        <el-form-item label>
          <el-button
            type="blue"
            style="width: 200px;"
            :loading="loading"
            :disabled="loading"
            @click="onSumbit"
          >保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Store from "store";
export default {
  data() {
    return {
      form: {
        thumbnail: false,
        automaticSave: false,
        codingStyle: "LOWER",
        automaticLineBreak: true,
        lineBreakNum: 80,

        fontSize: 14,
        columnHint: [],
        themeStyle: "BLACK",
        spaceHint: false,
        keyWordHint: false,
        syntaxTemplate: false,
        tableHint: false,
        columnHint: false
      },
      isHuanhang: false,
      pageLoading: true,
      rules: {},
      loading: false
    };
  },
  created() {
    this.pageLoading = true;
    this.loadData();
  },
  methods: {
    loadData() {
      this.$api.admin
        .getSettingForEditor(Store.get("userData").userId)
        .then(res => {
          if (res.data.lineBreakNum > 0) {
            this.isHuanhang = true;
          } else {
            this.isHuanhang = false;
          }
          this.form = res.data;
          this.pageLoading = false;
          this.$store.commit("changeTheme", res.data.themeStyle);
        });
    },
    onSumbit() {
      this.loading = true;
      if (this.isHuanhang) {
        this.form.lineBreakNum = 50;
      } else {
        this.form.lineBreakNum = 0;
      }
      const params = {
        ...this.form,
        userId: Store.get("userData").userId
      };
      this.$api.admin.settingForEditor(params).then(res => {
        this.$message.success("保存成功");
        this.loading = false;
      });
    }
  }
};
</script>

<style lang="scss">
</style>
