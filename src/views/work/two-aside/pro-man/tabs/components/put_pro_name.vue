<template>
  <el-dialog
    :visible.sync="dialog"
    width="30%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="cancle"
  >
    <span slot="title">编辑项目名称</span>
    <el-form style="padding:20px" label-width="80px" :model="form">
      <el-form-item label="项目名称">
        <el-input v-model="formList.projectName" size="mini" placeholder="请输入项目名称"></el-input>
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
    dialog: Boolean,
    form: {
      type:Object,
      default:null,
    }
  },
  watch: {
    dialog(val) {
      if (val == true) {
        this.formList =_.cloneDeep(this.form)
      }
    },
   
  },
  data() {
    return {
      formList:{}
    };
  },

  methods: {
    /**
     * @description 提交
     * @param
     */
    submit() {
      if (this.formList.projectName == "") {
        this.$message.error("项目名称不能为空");
        return false;
      }
      this.$api.project.pro.putPmName(this.formList).then(res => {
        if (res.resCode == 10000) {
          console.log(res.data);
          this.$message.success(res.resMsg);
          this.$emit("clickSubmit", false);
          //需要让父页面刷新，顶栏刷新
          let _data = {
            proInfo:res.data,
            refre:true
          }
          this.$store.commit('updataRefrePro',_data)
          //父页面刷新
          this.$parent.loadBasePro()
          this.$parent.loadProList()
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
    }
  },

  created() {
     
  }
};
</script>

<style lang='scss'>
</style>
