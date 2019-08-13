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
export default {
  props: {
    dialog: Boolean,
    forms:Object,
  },
  watch: {
    dialog(val) {
      if (val == true) {
        this.init()
      }
    }
  },
  data() {
    return {
      form: {
        siyou: false,
        gongyou: false
      },
      
    };
  },

  methods: {
    /**
     * @description 提交
     * @param
     */
    submit() {
      if(!this.form.siyou && !this.form.gongyou) {
        this.$message.error('请选择范围')
        return false
      }
      let data = _.cloneDeep(this.forms)

      if (this.form.siyou) {
        data.range = false
      }else if(this.form.gongyou) {
        data.range = true
      }
      this.$api.project.pro.putPmRange(data).then(res => {
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
    },
    init () {
      console.log(this.forms)
      if (this.forms.range) {
        this.form.gongyou = true;
      }else {
        this.form.siyou = true;
      }
    }
  },

  created() {
    
     
  }
};
</script>

<style lang='scss'>
</style>
