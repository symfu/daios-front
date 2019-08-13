<template>
  <el-dialog
    class="addlinkDialog"
    :visible.sync="dialog"
    width="580px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="cancle"
  >
    <span slot="title">
      <i class="iconfont icon-relation" style="color:#768691"></i>添加数据库连接
    </span>
    <div class="add_db_fliter" v-show="isOne">
      <div style="position: relative;">
        <el-input placeholder="输入数据库的部分内容进行过滤" size="mini" v-model="inputText" @keyup.enter.native="fliterDb" ></el-input>
        <el-button type="blue" size="mini" @click="fliterDb">筛选</el-button>
      </div>
    </div>
    <div class="add_db_con" v-show="isOne">
      <div class="fl" style="background: #27292e;">
        <div
          @click="clickDbType(i,item)"
          ref="dbType"
          class="item"
          v-for="item,i in dbType"
          :key="i"
        >{{item.label}}</div>
      </div>
      <div class="db_list">
        <div
          :class="{'list_item':item.dbActive==false,'list_item  active':item.dbActive==true}"
          v-for="item,i in dbList"
          :key="i"
          @click="selectDB(item)"
        >
          <div class="img">
            <img :src="item.iconUrl" alt width="90px" height="60px">
          </div>
          <span>{{item.dataSource}}</span>
        </div>
      </div>
    </div>
    <div class="add_db_ver" v-show="isOne">
      <span>请选择版本</span>
      <el-select class="isblack" v-model="dbVersions" size="mini" placeholder="请选择">
        <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
      </el-select>
    </div>
    <div class="ccms-form" v-show="!isOne">
      <el-form ref="form" label-width="120px" style="padding:20px 20px 20px 0;">
        <div class="row-item" v-for="(formItem, index) in addDbForm" :key="index">
          <el-form-item
            :show-message="!formItem.hiddenMsg"
            :rules="formItem.disabled?[]:formItem.rules"
            :label="formItem.label"
            :prop="'addDbForm.' + index + '.model'"
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
            ></el-input>
            <span v-if="formItem.uiComponent === 'PURE_TEXT'">{{formItem.data}}</span>
            <el-select
              class="isblack"
              :multiple="formItem.multiple"
              :clearable="formItem.clearable"
              :size="formItem.size"
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
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="toNext" type="black" v-show="isOne" size="mini">下一步</el-button>
      <el-button @click="toPre" type="black" v-show="!isOne" size="mini">上一步</el-button>
      <el-button @click="toText" v-show="!isOne" size="mini">测试连接</el-button>
      <el-button @click="submit" type="parimary" v-show="!isOne" size="mini">提交</el-button>
      <el-button @click="cancle" type="gary" size="mini">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialog: Boolean,
    addDbForm: Array
  },
  watch: {
    dialog(val) {
      if (val == true) {
        (this.dbActiveDb = ""), (this.dbVersions = "");
        this.getDBList("QB");
        this.isOne = true;
      }
    }
  },
  data() {
    return {
      dbType: [
        {
          label: "全部"
        },
        {
          label: "常用"
        },
        {
          label: "关系型"
        },
        {
          label: "非关系型"
        },
        {
          label: "分析型"
        },
        {
          label: "大数据型"
        },
        {
          label: "嵌入式型"
        },
        {
          label: "检索型"
        },
        {
          label: "中间件型"
        }
      ],
      dbList: [],
      dbActive: false,
      isOne: true,
      dbActiveDb: "",
      formLabelWidth: "80px",
      options: [],
      dbVersions: "",
      inputText: ""
    };
  },

  methods: {
    /**
     * @description 获取数据库信息列表
     * @param {GXX,FGXX,FXX,DSJX,QRX,JSX,ZJJX,QB,CY}
     */
    getDBList(data) {
      //第一次调用全部
      this.$api.sql.data_opera.getDm_databases_infos(data).then(res => {
        if (res.resCode == 10000) {
          //console.log("数据库信息列表", res.data);
          this.dbList = res.data;
          for (let i = 0; i < this.dbList.length; i++) {
            let element = this.dbList[i];
            element["dbActive"] = false;
          }
          this.dbVersions = "";
        } else {
          this.$message.error("数据库信息列表获取失败");
        }
      });
    },
    /**
     * @description 根据条件筛选数据库信息
     * @param
     */
    fliterDb() {
      this.$api.sql.data_opera
        .getFliterDm_databases_infos(this.inputText)
        .then(res => {
          if (res.resCode == 10000) {
            //console.log("筛选数据库信息列表", res.data);
            this.dbList = res.data;
            for (let i = 0; i < this.dbList.length; i++) {
              let element = this.dbList[i];
              element["dbActive"] = false;
            }
            this.dbVersions = "";
          } else {
            this.$message.error("数据库信息列表获取失败");
          }
        });
    },
    /**
     * @description 点击某个具体数据库
     * @param
     */
    selectDB(data) {
      // //console.log(data)
      this.options = data.dbVersions;
      this.dbVersions = data.defaultVersions;
      for (let i = 0; i < this.dbList.length; i++) {
        let element = this.dbList[i];
        if (data.dataSource == element.dataSource) {
          element.dbActive = true;
        } else {
          element.dbActive = false;
        }
      }
      this.dbActiveDb = data.dataSource;
    },
    /**
     * @description 点击数据库类型列表
     * @param
     */
    clickDbType(index, data) {
      for (let i = 0; i < this.$refs.dbType.length; i++) {
        const element = this.$refs.dbType[i];
        if (index == i) {
          this.$refs.dbType[i].className += " active";
        } else {
          this.$refs.dbType[i].className = "item";
        }
      }
      this.dbVersions = "";
      // //console.log(data);
      this.filterDbType(data);
    },
    /**
     * @description 区分数据，并调用
     * @param
     */
    filterDbType(data) {
      if (data.label == "全部") {
        this.getDBList("QB");
      } else if (data.label == "常用") {
        this.getDBList("CY");
      } else if (data.label == "关系型") {
        this.getDBList("GXX");
      } else if (data.label == "非关系型") {
        this.getDBList("FGXX");
      } else if (data.label == "分析型") {
        this.getDBList("FXX");
      } else if (data.label == "大数据型") {
        this.getDBList("DSJX");
      } else if (data.label == "嵌入式型") {
        this.getDBList("QRX");
      } else if (data.label == "检索型") {
        this.getDBList("JSX");
      } else if (data.label == "中间件型") {
        this.getDBList("ZJJX");
      }
    },
    /**
     * @description 关闭dialog
     * @param
     */
    cancle() {
      this.$emit("closeDialog", false);
    },
    /**
     * @description 下一步
     * @param
     */
    toNext() {
      if (this.dbActiveDb == "") {
        this.$message.error("选择数据库不能为空");
        return false;
      } else if (this.dbVersions == "") {
        this.$message.error("数据库版本不能为空");
        return false;
      }
      this.getFrom();
    },
    /**
     * @description 上一步
     * @param
     */
    toPre() {
      this.isOne = true;
    },
    /**
     * @description 测试连接
     * @param
     */
    toText() {
      let workObj = {};

      for (let i = 0; i < this.addDbForm.length; i++) {
        let obj = this.addDbForm[i];
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
        dataSource: this.dbActiveDb,
        dbVersion: this.dbVersions,
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
    /**
     * @description 提交
     * @param
     */
    submit() {
      let workObj = {};

      for (let i = 0; i < this.addDbForm.length; i++) {
        let obj = this.addDbForm[i];
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
      // //console.log(workObj, this.addDbForm);
      let params = {
        dataSource: this.dbActiveDb,
        dbVersion: this.dbVersions,
        userInputs: workObj
      };
      this.$api.sql.data_opera.getDmconnection_profile(params).then(res => {
        if (res.resCode == 10000) {
          //console.log(res.data);
          this.$parent.refreloadDataSourceData();
          this.$emit("closeDialog", false);
          this.$message.success(res.resMsg);
        } else {
          this.$message.error(res.resMsg);
        }
      });
    },
    /**
     * @description 加载表单
     * @param
     */
    getFrom() {
      let params = {
        globalInfo: {
          dataSource: this.dbActiveDb,
          path: [""]
        },
        menuOperation: {
          enable: true,
          handleNodeTypeId: 0,
          menuActionId: 4,
          needUserInput: false,
          parsedBy: "DMS"
        }
      };
      this.$api.sql.data_opera.getDm_forms(params).then(res => {
        if (res.resCode == 10000) {
          //console.log(res.data);
          //去调用表单
          this.addDbForm = res.data;
          this.isOne = false;
        } else {
          this.$message.error(res.resMsg);
        }
      });
    }
  },

  created() {}
};
</script>

<style lang='scss'>
</style>
