<template>
  <div class="export_tab">
    <div class="title">导出任务列表</div>
    <div class="fliter">
      <!-- <el-select class="isblack" v-model="fliterText" placeholder="全部">
        <el-option v-for="item,i in fliterList" :key="i" :label="item" :value="item"></el-option>
      </el-select>-->
      <!-- <el-button size="small" class="fr" @click="addExport">新增导出任务</el-button> -->
    </div>
    <div class="export_data_list">
      <el-table
        :data="tableData"
        highlight-current-row
        border
        max-height="500"
        v-loading="loading"
        @selection-change="handleSelectionChange"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <!-- <el-table-column type="expand">
          <template slot-scope="props">
            <el-input
              style="padding-left:130px"
              type="textarea"
              v-model="props.row.executeSql"
              disabled
            ></el-input>
          </template>
        </el-table-column>-->
        <el-table-column prop="exportName" label="任务名称" width="120"></el-table-column>
        <el-table-column label="执行的SQL" min-width="120">
          <template slot-scope="scope">
            <!-- <el-tooltip effect="dark" :content="scope.row.executeSql" placement="top"> -->
            <div class="to" style="min-width:120px">{{scope.row.executeSql}}</div>
            <!-- </el-tooltip> -->
          </template>
        </el-table-column>
        <el-table-column prop="exportDesc" label="说明" min-width="120"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="150"></el-table-column>
        <el-table-column label="进度" min-width="120">
          <template slot-scope="scope">
            <div>
              <el-progress :percentage="scope.row.schedule"></el-progress>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="200">
          <template slot-scope="scope">
            <div class="export_table_opera">
              <span
                class="box1"
                @click="downFile(scope.row)"
                v-if="scope.row.exportStatus=='PENDING_DOWNLOAD'"
              >
                <i class="el-icon-download"></i>
                <el-button type="text">下载</el-button>
              </span>
              <span class="box2" v-if="scope.row.exportStatus=='INVALID'">已失效</span>
              <span class="box2" v-if="scope.row.exportStatus=='GENERATING'">生成中</span>
              <span class="box2" v-if="scope.row.exportStatus=='FAILED_GENERATION'">生成失败</span>
              <span class="box2" v-if="scope.row.exportStatus=='DELETED'">已删除</span>
              <span class="box2" v-if="scope.row.exportStatus=='PENDING_GENERATION'">待生成</span>
              <span class="box3" @click="delIeExport(scope.row)">
                <i class="el-icon-delete"></i>
                <el-button type="text">删除</el-button>
              </span>
              <span class @click="lookExport(scope.row)">
                <i class="el-icon-view"></i>
                <el-button type="text">查看</el-button>
              </span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="export_table_btn">
        <div class="fl del" @click="manyDel">
          <i class="el-icon-close" style="margin-right:3px"></i>批量删除
        </div>
        <div class="fl clear" @click="clearPlane">
          <i class="el-icon-remove-outline" style="color:#ff6868;margin-right:3px"></i>清空失效任务
        </div>
      </div>
    </div>
    <exportDetail
      :dialog="detailDialog"
      :formData="detailFormData"
      v-on:closeDialog="closeDetailDialog"
    ></exportDetail>
  </div>
</template>

<script>
import Store from "store";
import exportDetail from "./components/export.detail.form";
export default {
  components: {
    exportDetail
  },
  data() {
    return {
      loading: false,
      detailDialog: false,
      detailFormData: {},
      dels: "",
      fliterText: "",
      fliterList: [],
      tableData: [
        {
          exportId: 2,
          exportName: "qian",
          executeSql:
            "--Daios SQL\n--***************************************************************\n--Source Server : ${sourceServerType} ${sourceServerVersion} \n--Author : ${author} \n--Create Time : ${createTime} \n--***************************************************************\nselect * from customers",
          exportDesc: "\uD83D\uDE04",
          createTime: "2019-05-31T03:48:17.232+0000",
          schedule: 100,
          exportStatus: "PENDING_DOWNLOAD"
        },
        {
          exportId: 10,
          exportName: "顾客",
          executeSql: "select * from customers",
          exportDesc: "customers表的数据",
          createTime: "2019-05-31T06:42:01.206+0000",
          schedule: 0,
          exportStatus: "GENERATING"
        },
        {
          exportId: 10,
          exportName: "顾客",
          executeSql: "select * from customers",
          exportDesc: "customers表的数据",
          createTime: "2019-05-31T06:42:01.206+0000",
          schedule: 0,
          exportStatus: "GENERATING"
        },
        {
          exportId: 10,
          exportName: "顾客",
          executeSql: "select * from customers",
          exportDesc: "customers表的数据",
          createTime: "2019-05-31T06:42:01.206+0000",
          schedule: 0,
          exportStatus: "GENERATING"
        },
        {
          exportId: 10,
          exportName: "顾客",
          executeSql: "select * from customers",
          exportDesc: "customers表的数据",
          createTime: "2019-05-31T06:42:01.206+0000",
          schedule: 0,
          exportStatus: "GENERATING"
        }
      ]
    };
  },

  methods: {
    /**
     * @description 查看用户导出任务列表
     * @param {userId}
     */
    loadList() {
      console.log("11111111111");
      this.loading = true;
      let params = {
        userId: Store.get("userData").userId,
        condition: ""
      };
      console.log("1222222222222");
      this.$api.user.export.lookIeExport(params).then(res => {
        if (res.resCode == 10000) {
          //console.log(res.data);
          for (let i = 0; i < res.data.length; i++) {
            let element = res.data[i];
            let a = element.createTime.split("T")[0];
            let b = element.createTime.split("T")[1].split(".")[0];
            element.createTime = a + " " + b;
          }
          this.tableData = res.data;
          this.loading = false;
        } else {
          this.loading = false;
        }
      });
    },
    /**
     * @description 获取导出类型列表
     * @param
     */
    getExportType() {
      this.$api.user.export
        .getExportType(Store.get("userData").userId)
        .then(res => {
          if (res.resCode == 10000) {
            //console.log(res.data);
            res.data.unshift("全部");
            this.fliterList = res.data;
          } else {
          }
        });
    },
    /**
     * @description 删除导出任务
     * @param
     */
    delIeExport(data) {
      this.$confirm("确认要删除该下载任务吗", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.user.export.delIeExport(data.exportId).then(res => {
             console.log(res.data);
            if (res.resCode == 10000) {
              console.log(res);
               this.$message.success('删除成功');
              // console.log('111111111111')
              this.loadList();
            } else {
              this.$message.error(res.resMsg);
            }
          });
        })
        .catch(() => {});
    },
    /**
     * @description 查看详情
     * @param
     */
    lookExport(data) {
      this.$api.user.export.getExportDetail(data.exportId).then(res => {
        if (res.resCode == 10000) {
          //console.log(res.data);
          this.detailDialog = true;
          this.detailFormData = res.data;
          // this.$message.success(res.resMsg);
        } else {
          this.$message.error(res.resMsg);
        }
      });
    },
    /**
     * @description 关闭查看详情弹框
     * @param
     */
    closeDetailDialog(data) {
      this.detailDialog = false;
    },
    /**
     * @description 下载
     * @param
     */
    downFile(data) {
      this.$api.user.export.getExportDetail(data.exportId).then(res0 => {
        if (res0.resCode == 10000) {
          if (res0.data.exportType == "SQL") {
            //console.log("sql下载");
            this.$api.user.export.downFile(data.exportId).then(res1 => {
              let blob = new Blob([res1], {
                type: "application/vnd.ms-excel;charset=utf-8"
              }); //指定格式为vnd.ms-excel

              let downloadElement = document.createElement("a");
              let href = window.URL.createObjectURL(blob); //创建下载的链接
              downloadElement.href = href;
              downloadElement.download = data.exportName + ".sql"; //下载后文件名
              document.body.appendChild(downloadElement);
              downloadElement.click(); //点击下载
              document.body.removeChild(downloadElement); //下载完成移除元素
              window.URL.revokeObjectURL(href); //释放掉blob对象
            });
          } else {
            //console.log("xls下载");
            this.$api.user.export.downFile(data.exportId).then(res2 => {
              let blob = new Blob([res2], {
                type: "application/vnd.ms-excel;charset=utf-8"
              }); //指定格式为vnd.ms-excel

              let downloadElement = document.createElement("a");
              let href = window.URL.createObjectURL(blob); //创建下载的链接
              downloadElement.href = href;
              downloadElement.download = data.exportName + ".xlsx"; //下载后文件名
              document.body.appendChild(downloadElement);
              downloadElement.click(); //点击下载
              document.body.removeChild(downloadElement); //下载完成移除元素
              window.URL.revokeObjectURL(href); //释放掉blob对象
            });
          }
        } else {
          this.$message.error(res0.resMsg);
        }
      });
    },
    /**
     * @description 批量处理
     * @param
     */
    handleSelectionChange(val) {
      //console.log(val);
      let str = "";
      for (let i = 0; i < val.length; i++) {
        const element = val[i];
        str += element.exportId + "-";
      }
      this.dels = str.substring(0, str.length - 1);
    },
    /**
     * @description 批量删除
     * @param
     */
    manyDel() {
      if (this.dels == "") {
        this.$message.error("请先勾选列表");
        return false;
      }
      this.$confirm("确定要删除吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(this.dels);
         
          this.$api.user.export.delIeExport(this.dels).then(res => {
            console.log(res.data);
            if (res.resCode == 10000) {
              console.log(res);
               this.$message.success('删除成功');
              // console.log('111111111111')
              this.loadList();
            } else {
              this.$message.error(res.resMsg);
            }
          });
        })
        .catch(() => {});
    },
    /**
     * @description 清空失效任务
     * @param
     */
    clearPlane() {
      this.$api.user.export
        .clearExport(Store.get("userData").userId)
        .then(res => {
          if (res.resCode == 10000) {
            this.$message.success(res.resMsg);
            this.loadList();
          } else {
            this.$message.error(res.resMsg);
          }
        });
    }
  },

  created() {
    this.getExportType();
    this.loadList();
  }
};
</script>

<style lang='scss'>
</style>
