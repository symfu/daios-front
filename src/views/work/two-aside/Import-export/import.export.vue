<template>
  <div class="import_export">
    <div class="title">
      <div class="fl">
        导入导出
        <el-tooltip class="item" effect="dark" content="文件只保存24小时，请及时下载" placement="right-start">
          <i class="el-icon-question"></i>
        </el-tooltip>
      </div>
      <div class="fr" title="刷新" @click="refreData">
        <i class="iconfont daiosshuaxin"></i>
      </div>
    </div>
    <div class="filter">
      <el-input
        v-model="inputFilter"
        size="mini"
        @keyup.enter.native="filterEnter(inputFilter)"
        placeholder="命令行关键字"
      ></el-input>
      <div class="data_tree_filter data_filter" @click="filter"></div>
    </div>
    <div class="export_list_tit">
      <div class="fl">导出任务列表</div>
      <div class="fr" style="cursor: pointer;" @click="openNewTab">
        <i class="el-icon-s-grid"></i>
      </div>
    </div>
    <div class="export_list" v-if="data.length>0">
      <el-timeline>
        <el-timeline-item v-for="(activity, index) in data" :key="index" style="color:#666">
          <div>
            <div class="fl to">
              <!-- <el-tooltip class="item" effect="dark" :content="activity.executeSql" placement="top"> -->
              <span>任务：{{activity.exportName}}</span>
              <!-- </el-tooltip> -->
            </div>
            <div class="fr" style="margin-right:10px">
              <!-- <div class="fl" style="color:#999999;font-size:12px;cursor: pointer;width:100px">
                <el-progress :percentage="activity.schedule"></el-progress>
              </div> -->
              <span
                class="download"
                @click="downFile(activity)"
                v-if="activity.exportStatus=='PENDING_DOWNLOAD'"
                style="color:#999999;font-size:12px;cursor: pointer;display:inline-block;watch;60px;width: 50px;text-align: center;"
              >下载</span>
              <span
                class="download"
                v-if="activity.exportStatus=='PENDING_GENERATION'"
                style="color:#999999;font-size:12px;cursor: pointer;display:inline-block;watch;60px;width: 50px;text-align: center;"
              >待生成</span>
              <span
                class="download"
                v-if="activity.exportStatus=='GENERATING'"
                style="color:#999999;font-size:12px;cursor: pointer;display:inline-block;watch;60px;width: 50px;text-align: center;"
              >生成中</span>
              <span
                class="download"
                v-if="activity.exportStatus=='FAILED_GENERATION'"
                style="color:#999999;font-size:12px;cursor: pointer;display:inline-block;watch;60px;width: 50px;text-align: center;"
              >生成失败</span>
              <span
                class="download"
                v-if="activity.exportStatus=='DELETED'"
                style="color:#999999;font-size:12px;cursor: pointer;display:inline-block;watch;60px;width: 50px;text-align: center;"
              >已删除</span>
              <span
                class="download"
                v-if="activity.exportStatus=='INVALID'"
                style="color:#999999;font-size:12px;cursor: pointer;display:inline-block;width: 50px;text-align: center;"
              >已失效</span>
              <span
                @click="delIeExport(activity)"
                style="color:#999999;font-size:12px;cursor: pointer;"
              >删除</span>
            </div>
          </div>
        </el-timeline-item>
      </el-timeline>
    </div>
    <div v-else class="export_list_null" v-loading="loading">暂时没有导出任务哦</div>
  </div>
</template>

<script>
import Store from "store";
export default {
  watch: {
    $route(val) {
      if (val.path == "/work/data_import") {
        this.loadList();
      }
    }
  },
  data() {
    return {
      loading: false,
      inputFilter: "",
      data: []
    };
  },

  methods: {
    /**
     * @description 刷新
     * @param
     */
    refreData() {
      this.inputFilter = "";
      this.loadList();
    },
    /**
     * @description 查看用户导出任务列表
     * @param {userId}
     */
    loadList() {
      this.loading = true;
      let params = {
        userId: Store.get("userData").userId,
        condition: this.inputFilter
      };
      this.$api.user.export.lookIeExport(params).then(res => {
        if (res.resCode == 10000) {
          //console.log(res.data);
          this.data = res.data;
          this.loading = false;
        } else {
          this.$message.error(res.resMsg);
          this.loading = false;
        }
      });
      this.inputFilter = "";
    },
    /**
     * @description 筛选
     * @param
     */
    filter() {
      this.loadList();
    },
    /**
     * @description 回车帅选
     * @param
     */
    filterEnter(data) {
      this.inputFilter = "";
      this.inputFilter = data;
      this.loadList();
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
            if (res.resCode == 10000) {
              //console.log(res.data.data);
              this.$message.success(res.resMsg);
              this.loadList();
            } else {
              this.$message.error(res.resMsg);
            }
          });
        })
        .catch(() => {});
    },
    /**
     * @description 打开导出列表新tab页
     * @param
     */
    openNewTab() {
      let page = {
        name: "export",
        type: "export",
        title: `导出任务`,
        icon: "el-icon-date"
      };
      this.$util.openNewPage(page);
      this.$store.commit("setCurrentPage", page);
    }
  },

  created() {
    this.loadList();
  }
};
</script>

<style lang='scss'>
@import "./index.scss";
</style>
