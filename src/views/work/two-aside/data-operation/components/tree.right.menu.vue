<template>
  <div>
    <vue-context-menu class="right-menu" :show="isShow" @update:show="(show) => isShow = show">
      <template>
        <div
          class="menu_item"
          :class="{'disabled':!item.menuOperation.enable}"
          v-for="item,i in menuData"
          @click="clickMenu(item)"
        >{{item.name}}</div>
      </template>
    </vue-context-menu>
    <div @click="loadFile">
      <input
        style="width:0px;height:0px"
        class="file"
        type="file"
        id="file"
        ref="file"
        @change="getFile"
      >
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Store from "store";
import { component as VueContextMenu } from "@xunlei/vue-context-menu";
export default {
  components: {
    "vue-context-menu": VueContextMenu
  },
  props: {
    contextMenuVisible: Boolean,
    menuData: Array
  },
  watch: {
    contextMenuVisible(val) {
      this.isShow = val;
    }
  },
  computed: {
    ...mapState({
      reqFormParams: state => state.work.reqFormParams,
      pageList: state => state.work.pageList,
      pageCurrent: state => state.work.pageCurrent
    })
  },
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    /**
     * @description 点击右键菜单处理
     * @param
     */
    clickMenu(data) {
      // console.log("点击了右键菜单", data);
      if (data.menuOperation.parsedBy == "DMS") {
        if (
          data.menuOperation.menuActionId == 1 &&
          data.name !== "打开PL/SQL"
        ) {
          //打开链接
          let node = {
            level: 1
          };
          this.$parent.dbClick(node, this.reqFormParams.nodeData);
        }
        if (data.menuOperation.menuActionId == 5) {
          //删除连接
          this.delLink();
        } else if (data.menuOperation.menuActionId == 2) {
          //关闭连接
          this.closeLink();
        } else if (data.menuOperation.menuActionId == 3) {
          //创建连接
          this.$emit("openAddForm", "aa");
        } else if (data.menuOperation.menuActionId == 4) {
          //编辑连接
          let _data = {
            formData: this.reqFormParams.custom.connectionProfile.userInputs,
            open: true,
            menuOperation: data.menuOperation
          };
          this.$emit("openEditForm", _data);
        } else if (data.menuOperation.menuActionId == 12) {
          //打开命令行脚本窗口
          this.openTerminal(data);
        } else if (data.name == "打开PL/SQL") {
          //打开PL
          this.openPlEditor(data);
        }
      } else if (data.menuOperation.parsedBy == "DM") {
        // //console.log(data.menuOperation.needUserInput);
        if (data.name == "打开查询") {
          this.openLink();
        } else if (
          data.menuOperation.menuActionId == 1 ||
          data.menuOperation.menuActionId == 16
        ) {
          //打开XXX获取SQL语句
          this.getOpenxxxSql(data);
          // this.isShow = false;
        } else if (data.menuOperation.menuActionId == 9) {
          //刷新节点
          //console.log(this.reqFormParams);
          this.$parent.nodeClick(
            this.reqFormParams.nodeData,
            this.reqFormParams.node
          );
          setTimeout(() => {
            this.$message.success("刷新成功");
            this.isShow = false;
          }, 300);
        } else if (data.menuOperation.menuActionId == 10) {
          //导入sql执行
          this.loadFile();
          // this.isShow = false;
        } else if (data.menuOperation.menuActionId == 11) {
          //复制
          this.$parent.doCopy(this.reqFormParams.nodeData.label);
          this.isShow = false;
        } else if (data.menuOperation.needUserInput) {
          //去掉加载表单接口
          this.createLink(data);
        } else {
          //去掉解析接口
          this.menuOpera(data);
        }
      }
    },
    /**
     * @description 加载表单
     * @param
     */
    createLink(data) {
      //console.log(this.reqFormParams);
      let params = {
        globalInfo: {
          connectionId: this.reqFormParams.globalInfo.connectionId,
          dataSource: this.reqFormParams.globalInfo.dataSource,
          path: this.reqFormParams.globalInfo.path
        },
        menuOperation: data.menuOperation
        // nodeTypeId: this.reqFormParams.nodeTypeId
      };
      this.$api.sql.data_opera.getDm_forms(params).then(res => {
        if (res.resCode == 10000) {
          // //console.log(res.data);
          this.isShow = false;
          //去调用表单
          let _data = {
            menuData: data,
            formData: res.data
          };
          this.$emit("openForm", _data);
        } else {
          this.$message.error(res.resMsg);
        }
      });
    },
    /**
     * @description 解析菜单操纵
     * @param
     */
    menuOpera(data) {
      let params = {
        globalInfo: {
          connectionId: this.reqFormParams.globalInfo.connectionId,
          dataSource: this.reqFormParams.globalInfo.dataSource,
          path: this.reqFormParams.globalInfo.path
        },
        menuOperation: data.menuOperation,
        userInputs: {}
      };
      this.$api.sql.data_opera.getDmParse_menu_operation(params).then(res => {
        if (res.resCode == 10000) {
          // //console.log(res.data);
          this.isShow = false;
          this.$message.success(res.resMsg);
        } else {
          this.$message.error(res.resMsg);
        }
      });
    },
    /**
     * @description 关闭连接
     * @param
     */
    closeLink() {
      //console.log("关闭连接", this.reqFormParams, this.pageList);
      let params = this.reqFormParams.globalInfo.connectionId;
      this.$api.sql.data_opera.getDmsClose_connection(params).then(res => {
        if (res.resCode == 10000) {
          //     //console.log(res.data);
          this.isShow = false;
          this.$emit("closeLink", this.reqFormParams);
          //console.log(this.pageList);
          // this.$message.success(res.resMsg);
          if (this.pageList.length > 0) {
            this.$confirm(
              "连接已关闭，是否关闭查询窗口，否则查询等操作可能会提示无效连接",
              "提示",
              {
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning"
              }
            )
              .then(() => {
                //关闭已经打开的查询窗口
                let tagName = this.reqFormParams.custom.connectionProfile.id;
                let _data = _.cloneDeep(this.pageList);
                //console.log(_data);

                for (let i = _data.length - 1; i >= 0; i--) {
                  //console.log(111);
                  let page = _data[i];
                  //console.log(page);
                  if (tagName == page.cpId) {
                    //console.log(11);
                    if (i == 0 && _data.length > 1) {
                      this.$store.commit("setCurrentPage", _data[1]);
                    } else if (_data.length == 1) {
                    } else {
                      this.$store.commit("setCurrentPage", _data[i - 1]);
                    }
                    // _data.splice(i, 1);
                    this.$store.commit("closeTagPage", i);
                  }
                }

                let _data1 = _.cloneDeep(this.pageList);
                for (let i = _data1.length - 1; i >= 0; i--) {
                  let page = _data1[i];
                  if (page.title.split("@")[1] == "PL/SQL") {
                    if (i == 0 && _data1.length > 1) {
                      this.$store.commit("setCurrentPage", this.pageList[1]);
                    } else if (_data1.length == 1) {
                    } else {
                      this.$store.commit(
                        "setCurrentPage",
                        this.pageList[i - 1]
                      );
                    }
                    this.$store.commit("closeTagPage", i);
                  }
                }
              })
              .catch(() => {});
          }
        } else {
          this.$message.error(res.resMsg);
        }
      });
    },
    /**
     * @description 关闭窗口方法
     * @param
     */
    closeTab() {},
    /**
     * @description 删除连接
     * @param
     */
    delLink() {
      this.$confirm("该操作将永久删除该数据源", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.sql.data_opera
            .delDmconnection_profile(this.reqFormParams.dataSourceId)
            .then(res => {
              // //console.log(res);
              if (res.data.resCode == 10000) {
                this.isShow = false;
                // this.$message.success(res.data.resMsg);
                this.$emit("delLink", this.reqFormParams);
              } else {
                this.$message.error(res.data.resMsg);
              }
            });
        })
        .catch(() => {});
    },
    /**
     * @description 打开链接
     * @param
     */
    openLink() {
      //console.log(this.reqFormParams);
      if (
        Number.isNaN(this.reqFormParams.globalInfo.connectionId) &&
        this.reqFormParams.nodeData.open == false
      ) {
        this.$message.error("请先打开连接，再进行查询");
        return false;
      } else {
        //console.log(Store.get("sqlTableNum"));
        let sqlTableNum = Store.get("sqlTableNum");
        let connectionProfile = {};
        if (this.reqFormParams.custom) {
          connectionProfile = this.reqFormParams.custom.connectionProfile;
        } else {
          connectionProfile = {
            id: this.reqFormParams.dataSourceId,
            dbVersion: this.reqFormParams.dbVersion
          };
        }
        console.log(connectionProfile);
        let page = {
          name: "sqlQuery" + sqlTableNum + connectionProfile.id,
          type: "sqlQuery",
          title: `${this.reqFormParams.nodeInfo.name}@${
            this.reqFormParams.globalInfo.dataSource
          }`,
          icon: `iconfont ${this.reqFormParams.nodeData.iconName}`,
          iconColor: `#fff`,
          connId: this.reqFormParams.globalInfo.connectionId,
          dataSource: this.reqFormParams.globalInfo.dataSource,
          dataSourceId: this.reqFormParams.dataSourceId,
          dataSourceVer: connectionProfile.dbVersion,
          sql: "",
          cpId: this.reqFormParams.dataSourceId,
          dbDefinition: this.reqFormParams.dbDefinition
        };
        this.$util.openNewPage(page);
        sqlTableNum++;
        Store.set("sqlTableNum", sqlTableNum);
        this.$store.commit("setCurrentPage", page);
        this.isShow = false;
      }
    },
    /**
     * @description 打开PL/SQL
     * @param
     */
    openPlEditor() {
      //console.log("打开pl");
      //console.log(this.reqFormParams);
      if (Number.isNaN(this.reqFormParams.globalInfo.connectionId)) {
        this.$message.error("请先打开连接，再进行查询");
        return false;
      } else {
        let sqlTableNum = Store.get("sqlTableNum");
        let page = {
          name:
            "sqlQuery" +
            sqlTableNum +
            this.reqFormParams.custom.connectionProfile.id +
            "PL/SQL",
          type: "sqlQuery",
          title: `${this.reqFormParams.nodeInfo.name}@PL/SQL`,
          icon: `iconfont ${this.reqFormParams.nodeData.iconName}`,
          iconColor: `#fff`,
          connId: this.reqFormParams.globalInfo.connectionId,
          dataSource: this.reqFormParams.globalInfo.dataSource,
          dataSourceId: this.reqFormParams.dataSourceId,
          dataSourceVer: this.reqFormParams.custom.connectionProfile.dbVersion,
          sql: "",
          cpId: this.reqFormParams.dataSourceId,
          dbDefinition: this.reqFormParams.dbDefinition
        };
        //console.log(page);
        this.$util.openNewPage(page);
        this.$store.commit("setCurrentPage", page);
        sqlTableNum++;
        Store.set("sqlTableNum", sqlTableNum);
        this.isShow = false;
      }
    },
    /* 导入sql */
    loadFile() {
      if (this.pageList.length == 0) {
        this.$message.error("当前没有查询窗口，请先打开查询窗口");
      } else {
        if (this.pageCurrent.dataSourceId != this.reqFormParams.dataSourceId) {
          //需要新开窗口
          this.$message.error(
            "当前查询窗口不是该数据源窗口，请先切换查询窗口或打开新窗口"
          );
        } else {
          this.$refs.file.click();
        }
      }
    },
    //获取sql文件的数据
    getFile(e) {
      let self = this;
      if (window.FileReader) {
        let file = e.target.files[0];
        //console.log(file);
        if (
          file.name.indexOf(".txt") != -1 ||
          file.name.indexOf(".sql") != -1
        ) {
          let filename = file.name.split(".")[0];
          let reader = new FileReader();

          reader.onload = function() {
            //console.log(this.result);
            e.target.value = ""; //清除input值，触发change
            self.afterGetFile(this.result);
          };
          reader.readAsText(file);
        } else {
          this.$message.error("不支持该类型的文件上传");
        }
      }
    },
    /**
     * @description 处理获取文件之后
     * @param
     */
    afterGetFile(data) {
      // //console.log(this.pageCurrent);
      // //console.log(this.reqFormParams);
      // //console.log(this.pageList);
      // //console.log(data);

      let _data = {
        cpId: this.reqFormParams.dataSourceId,
        sql: data
      };
      this.$store.commit("setImportSql", _data);
    },
    /**
     * @description 打开xxx获取SQL语句，然后添加到当前窗口
     * @param
     */
    getOpenxxxSql(data) {
      this.openLink();
      let params = {
        globalInfo: {
          connectionId: this.reqFormParams.globalInfo.connectionId,
          dataSource: this.reqFormParams.globalInfo.dataSource,
          path: this.reqFormParams.globalInfo.path
        },
        menuOperation: data.menuOperation,
        userInputs: {}
      };
      console.log(this.reqFormParams);
      this.$api.sql.data_opera.getOpenxxxString(params).then(res => {
        if (res.resCode == 10000) {
          this.isShow = false;
          let sql = res.data[0];

          // if (
          //   this.pageCurrent.dataSourceId != this.reqFormParams.dataSourceId
          // ) {
          //   //需要新开窗口
          //   this.$message.error(
          //     "当前查询窗口不是该数据源窗口，请先切换查询窗口或打开新窗口"
          //   );
          // } else {

          setTimeout(() => {
            this.$store.commit("setOpenxxxSql", sql);
          }, 300);

          // }
        } else {
          this.$message.error(res.resMsg);
        }
      });
    },
    /**
     * @description 打开命令行窗口
     * @param
     */
    openTerminal(data) {
      let params = this.reqFormParams.globalInfo.connectionId;

      this.$api.sql.data_opera.getShellUrl(params).then(res => {
        if (res.resCode == 10000) {
          console.log("打开命令行窗口", data);
          console.log(res.data);
          let page = {
            name: "terminal" + this.reqFormParams.custom.connectionProfile.id,
            type: "terminal",
            title: `${this.reqFormParams.nodeInfo.name}@${
              this.reqFormParams.globalInfo.dataSource
            }`,
            icon: `el-icon-s-promotion`,
            iconColor: `#fff`,
            dataSource: this.reqFormParams.globalInfo.dataSource,
            dataSourceId: this.reqFormParams.dataSourceId,
            dataSourceVer: this.reqFormParams.custom.connectionProfile
              .dbVersion,
            cpId: this.reqFormParams.dataSourceId,
            shellUrl: `${res.data[0].split("//")[1]}`
            // shellUrl: `t134u.holytoolz.com:33520`
          };
          this.$util.openNewPage(page);
          this.$store.commit("setCurrentPage", page);
        } else {
          this.$message.error(res.resMsg);
        }
      });

      this.isShow = false;
    }
  },

  created() {}
};
</script>

<style lang='scss'>
</style>
