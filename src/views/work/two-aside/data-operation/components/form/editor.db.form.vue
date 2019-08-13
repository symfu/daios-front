<template>
  <el-dialog
    :visible.sync="dialog"
    width="30%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="cancle"
  >
    <span slot="title">
      <i class="el-icon-s-platform"></i>Info
    </span>
    <div class="ccms-form">
      <el-form ref="form" :model="formModel" label-width="120px" style="padding:20px 20px 20px 0;">
        <el-form-item label="数据库">
          <span>{{this.reqFormParams.globalInfo.dataSource}}</span>
        </el-form-item>
        <el-form-item label="数据库版本">
          <el-select class="isblack" v-model="dbVersion" placeholder>
            <el-option v-for="item ,i in dbListVer" :key="i" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <div
          class="row-item"
          v-for="(formItem, index) in formModel.editLinkForm"
          :key="index"
          v-show="formItem.show"
        >
          <el-form-item
            :show-message="!formItem.hiddenMsg"
            :rules="formItem.disabled?[]:formItem.rules"
            :label="formItem.label"
            :prop="'editLinkForm.' + index + '.model'"
          >
            <el-input
              v-if="formItem.uiComponent === 'TEXT_INPUT'"
              :type="formItem.type"
              :maxlength="formItem.maxlength"
              :minlength="formItem.minlength"
              v-model.trim="formItem.model"
              :placeholader="formItem.placeholder"
              :disabled="formItem.disabled"
              :auto-complete="formItem.autoComplete"
              :max="formItem.max"
              :min="formItem.min"
              :step="formItem.step"
              :name="formItem.name"
              :resize="formItem.resize"
              :autofocus="formItem.autofocus"
              :form="formItem.form"
              :icon="formItem.icon"
              :rows="formItem.rows"
              :autosize="formItem.autosize"
              size="mini"
              :readonly="formItem.readonly"
              :on-icon-click="formItem.handleIconClick"
              @click="typeof formItem.click === 'function'?formItem.click($event):function() {}"
              @blur="typeof formItem.blur === 'function'?formItem.blur($event): function(){}"
              @focus="typeof formItem.focus === 'function'?formItem.focus($event): function(){}"
              @change="typeof formItem.change === 'function'?formItem.change($event): function(){}"
            ></el-input>
            <el-autocomplete
              v-if="formItem.itemType === 'autocomplete'"
              :placeholader="formItem.placeholder"
              :disabled="formItem.disabled"
              v-model.trim="formItem.model"
              :custom-item="formItem.customItem"
              :fetch-suggestions="formItem.fetchSuggestions"
              :popper-class="formItem.popperClass"
              :trigger-on-focus="formItem.triggerOnFocus"
              :on-icon-click="formItem.onIconClick"
              :icon="formItem.icon"
              @select="typeof formItem.select === 'function'?formItem.select($event): function(){}"
            ></el-autocomplete>
            <el-select
              class="isblack"
              :multiple="formItem.multiple"
              :clearable="formItem.clearable"
              size="mini"
              :multiple-limit="formItem.multipleLimit"
              :name="formItem.name"
              :placeholder="formItem.placeholder"
              :allow-create="formItem.allowCreate"
              :disabled="formItem.disabled"
              :filter-method="formItem.filterMethod"
              :filterable="formItem.filterable"
              :loading-text="formItem.loadingText"
              :no-data-text="formItem.noDataText"
              :popper-class="formItem.popperClass"
              :no-match-text="formItem.noMatchText"
              :loading="formItem.loading"
              :remote="formItem.remote"
              :remote-method="formItem.remoteMethod"
              v-model="formItem.model"
              v-if="formItem.itemType === 'select'"
              @change="selectChange.call(null,formItem.change,$event)"
              @visible-change="typeof formItem.visibleChange === 'function'?formItem.visibleChange($event): function(){}"
              @remove-tag="typeof formItem.removeTag === 'function'?formItem.removeTag($event): function(){}"
            >
              <el-option
                v-for="item in formItem.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
            <el-switch
              v-if="formItem.uiComponent === 'SWITCH'"
              :disabled="formItem.disabled"
              v-model="formItem.model"
            ></el-switch>
          </el-form-item>
        </div>

        <el-row class="btn-group">
          <slot name="btn-group"></slot>
        </el-row>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="toText" size="mini">测试连接</el-button>
      <el-button type="primary" @click="clickSubmit" size="mini">确定</el-button>

      <el-button @click="cancle" type="gary" size="mini">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from "vuex";
let vm = {};
export default {
  props: {
    dialog: Boolean,
    form: Object,
    editLinkForm: Array, //表单数据
    needBtn: {
      type: Boolean,
      default: true
    },
    rightMenu: Object
  },
  computed: {
    ...mapState({
      reqFormParams: state => state.work.reqFormParams
    })
  },
  watch: {
    editLinkForm(val) {
      this.formModel.editLinkForm = val;
      this.turnData(this.formModel.editLinkForm);
    },
    dialog(val) {
      if (val == true) {
        this.getDBList();
      }
    }
  },

  data() {
    this.turnData(this.editLinkForm);
    return {
      vm: vm,
      refForm: {},
      formModel: {
        editLinkForm: this.editLinkForm
      },
      dbListVer: [],
      dbVersion: ""
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
    /**
     * @description 获取数据库信息列表
     * @param
     */
    getDBList() {
      this.$api.sql.data_opera.getDm_databases_infos("QB").then(res => {
        if (res.resCode == 10000) {
          //console.log("数据库信息列表", res.data);
          //console.log(this.reqFormParams);
          for (let i = 0; i < res.data.length; i++) {
            const element = res.data[i];
            if (
              element.dataSource == this.reqFormParams.globalInfo.dataSource
            ) {
              this.dbListVer = element.dbVersions;
            }
          }
          this.dbVersion = this.reqFormParams.custom.connectionProfile.dbVersion;
        } else {
          this.$message.error("数据库信息列表获取失败");
        }
      });
    },
    //    通过一个prop字段设置另一个属性 prop tarPro要设置的目标属性值
    setProperByPro(prop, tarPro) {
      if (typeof tarPro !== "object") {
        return;
      }
      for (let i = 0; i < this.editLinkForm.length; i++) {
        if (this.editLinkForm[i].prop === prop) {
          for (let key in tarPro) {
            this.editLinkForm[i][key] = tarPro[key];
          }
        }
      }
    },
    // 通过prop 获取表单字段对象
    getPropObjByPro(prop) {
      for (let i = 0; i < this.editLinkForm.length; i++) {
        if (this.editLinkForm[i].prop === prop) {
          return this.editLinkForm[i];
        }
      }
    },
    // 设置权限控制
    setAuth() {
      this.editLinkForm.map(item => {
        if (typeof item.dataAuth === "function") {
          item.dataAuth();
        }
      });
    },
    // 点击确认按钮
    clickSubmit() {
      this.$refs["form"].validate(val => {
        if (val) {
          //console.log("编辑", this.getFormModel());
          //
          this.$api.sql.data_opera
            .putDmconnection_profile(this.getFormModel())
            .then(res => {
              if (res.resCode == 10000) {
                this.$emit("clickSubmit", false);
                this.$message.success(res.resMsg);
              } else {
                this.$message.error(res.resMsg);
              }
            });
        }
      });
    },
    /**
     * @description 测试连接
     * @param
     */
    toText() {
      let workObj = {};
      for (let i = 0; i < this.$refs["form"].model.editLinkForm.length; i++) {
        let obj = this.$refs["form"].model.editLinkForm[i];
        workObj[obj.name] = obj.model;
        //console.log(obj.name, obj.model);
        if (workObj[obj.name] == null || workObj[obj.name] == "") {
          if (
            typeof workObj[obj.name] === "boolean" ||
            obj.name == "evalText"
          ) {
          } else {
            this.$message.error(`${obj.label}不能为空`);
            return false;
          }
        }
      }
      let params = {
        dataSource: this.reqFormParams.globalInfo.dataSource,
        dbVersion: this.dbVersion,
        userInputs: workObj
      };
      this.$api.sql.data_opera.testDmconnection_profile(params).then(res => {
        if (res.resCode == 10000) {
          
          this.$message.success(res.resMsg);
        } else {
          this.$message.error(res.resMsg);
        }
      });
    },
    // 获取form model
    getFormModel() {
      let workObj = {};
      // for (let i = 0; i < this.$refs["form"].model.editLinkForm.length; i++) {
      //   let obj = this.$refs["form"].model.editLinkForm[i];
      //   workObj[obj.name] = obj.model;
      // }
      for (let i = 0; i < this.$refs["form"].model.editLinkForm.length; i++) {
        let obj = this.$refs["form"].model.editLinkForm[i];
        workObj[obj.name] = obj.model;
        //console.log(workObj[obj.name].length, obj.model);
        if (workObj[obj.name] == null || workObj[obj.name].length == 0) {
          //console.log("000");
          if (
            typeof workObj[obj.name] === "boolean" ||
            obj.name == "evalText"
          ) {
          } else {
            this.$message.error(`${obj.label}不能为空`);
            return false;
          }
        }
      }
      //console.log(workObj);
      let params = {
        dataSource: this.reqFormParams.globalInfo.dataSource,
        dbVersion: this.dbVersion,
        id: this.reqFormParams.dataSourceId,
        userInputs: workObj
      };
      return params;
    },
    // 重置表单
    reset() {
      this.$refs.form.resetFields();
    },
    // 当一个表单域从enable 变为disabled时 enabled错误信息不显示
    hiddenMsg() {
      for (let i = 0; i < this.editLinkForm.length; i++) {
        if (this.editLinkForm[i].disabled) {
          this.editLinkForm[i].hiddenMsg = true;
        } else {
          this.editLinkForm[i].hiddenMsg = false;
        }
      }
    },
    selectChange(fun, val) {
      if (typeof fun === "function") {
        fun(val);
      }
      this.setAuth();
      this.hiddenMsg();
    },
    turnData(editLinkForm) {
      for (let i = 0; i < editLinkForm.length; i++) {
        let item = editLinkForm[i];
        if (item.show === undefined) {
          item.show = true;
        }
        if (item.disabled === undefined) {
          item.disabled = false;
        }
      }
    }
  },

  created() {},
  mounted() {
    this.setAuth();
    this.refForm = this.$refs["form"];
  }
};
</script>

<style lang='scss'>
</style>
