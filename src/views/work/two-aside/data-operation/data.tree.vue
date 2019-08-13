<template>
  <div class="data_opera">
    <div class="data_opera_tit">
      <div class="tit_l">数据操作</div>
      <div class="tit_r">
        <div @click="addDataLink" title="创建连接">
          <i class="el-icon-folder-add" style="font-weight: 700;"></i>
        </div>
        <div @click="refreloadDataSourceData" title="刷新">
          <i class="iconfont daiosshuaxin"></i>
        </div>
        <!-- <div title="定位" @click="cacheTreeInfo">
          <i class="el-icon-aim"></i>
        </div>-->
      </div>
    </div>
    <div v-if="connData.length>0" class="data_opera_tree">
      <div style="position: relative;padding:0 6px;">
        <el-input placeholder="输入数据源，表名或字段" v-model="filterText" size="mini"></el-input>
        <div class="data_tree_filter data_filter" @click="filterNode"></div>
      </div>
      <div class="tree_box" v-loading="loadingTree">
        <el-tree
          :props="props"
          :data="connData"
          class="filter-tree data_opera_tree_con"
          :filter-node-method="filterNode"
          ref="tree"
          @node-contextmenu="rightClick"
          @node-click="nodeClick"
          @node-expand="nodeClick"
          node-key="label"
          :default-expand-all="false"
          :default-expanded-keys="defaultExpanded"
          :expand-on-click-node="true"
        >
          <!-- <span class="custom-tree-node" slot-scope="{ node, data }" @dblclick="dbClick(node,data)"> -->
          <span
            :class="{'custom-tree-node':data.open,'custom-tree-node-fold':!data.open}"
            @dblclick="dbClick(node,data)"
            style="width: 100%;height: 30px;line-height: 30px;"
            slot-scope="{ node, data }"
          >
            <span>
              <!-- <i class="iconfont daiosVERTICA"></i> -->
              <i :style="'color:'+ data.iconColor" :class="'iconfont '+ data.iconName"></i>
            </span>
            <span @click="doCopy(node.label)">{{" "+ node.label +" "+data.labelType}}</span>
          </span>
        </el-tree>
      </div>
    </div>
    <div v-else class="data_opera_tree_null" v-loading="loadingTree">
      <div class="item1">
        <i class="el-icon-warning-outline"></i> 您尚未添加数据库连接
      </div>
      <div @click="addDataLink" title="创建连接">
        <img src="~@/assets/images/no_db_bg.png" width="120" alt>
      </div>
      <div class="item3">请先点击“添加”按钮进行设置</div>
    </div>
    <!-- 右键菜单 -->
    <contextMenu
      v-show="contextMenuVisible"
      v-on:openForm="openNomalForm"
      v-on:openAddForm="openAddForm"
      v-on:openEditForm="openEditForm"
      v-on:closeLink="closeLink"
      v-on:delLink="delLink"
      :contextMenuVisible="contextMenuVisible"
      :menuData="menuData"
    ></contextMenu>
    <!-- 添加数据源连接 -->
    <addDbForm :dialog="isAddDataLink" v-on:closeDialog="closeDialog"></addDbForm>
    <!-- 编辑数据源连接 -->
    <editorDbForm
      :dialog="isEditDataLink"
      :editLinkForm="editLinkForm"
      v-on:clickSubmit="clickEditSubmit"
      v-on:closeDialog="closeEditDialog"
    ></editorDbForm>
    <!-- 普通表单 -->
    <treeNomalForm
      :dialog="isTreeNomalForm"
      :form-list="formList"
      :rightMenu="rightMenu"
      v-on:clickSubmit="clickNomalFormSubmit"
      v-on:closeDialog="closeNomalForm"
    ></treeNomalForm>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Thrift from "thrift";
import Store from "store";

import contextMenu from "./components/tree.right.menu";
import addDbForm from "./components/form/add.db.form";
import editorDbForm from "./components/form/editor.db.form";
import treeNomalForm from "./components/form/tree.form";
export default {
  components: {
    contextMenu,
    addDbForm,
    editorDbForm,
    treeNomalForm
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
      filterText: "",
      timeId: null,
      thriftInitId: null, //心跳定时器
      defaultExpanded: [], //默认展开树
      loadingTree: false,
      contextMenuVisible: false, //右键菜单
      isAddDataLink: false, //是否打开添加数据源表单
      isEditDataLink: false, //是否打开编辑数据源扁担
      isTreeNomalForm: false, //是否打开普通表单
      target: Object,
      clearCacheTimer: null, //缓存定时器
      menuData: [], //右键菜单数据
      connectionIdList: [], //存储连接id,和名字
      connData: [], //树的数据
      formList: [
        {
          label: "姓名",
          prop: "name",
          itemType: "input",
          model: "",
          rules: [],
          focus: function() {}
        },
        {
          label: "学历",
          prop: "edu",
          itemType: "select",
          options: [
            { label: "本科", value: "1" },
            { label: "硕士", value: "2" },
            { label: "硕士", value: "3" }
          ],
          model: ""
        },
        {
          label: "年龄",
          prop: "age",
          itemType: "input",
          model: ""
        }
      ], //普通表单的数据
      editLinkForm: [], //编辑连接扁担数据
      rightMenu: {}, //普通表单提交时需要的菜单数据
      props: {
        label: "label"
      }
    };
  },
  watch: {
    filterText(val) {
      if (val !== "") {
        this.$refs.tree.filter(val);
      } else {
        //console.log();
        this.connData = _.cloneDeep(this.connData);
      }

      // Store.set('treeData',this.connData);
    }
  },
  methods: {
    /**
     * @description 复制
     * @param
     */
    doCopy: function(data) {
      this.$copyText(data).then(
        function(e) {
          //复制成功
          //console.log(e.text);
        },
        function(e) {
          //复制失败
          //console.log(e);
        }
      );
    },

    /**
     * @description 心跳连接
     * @param
     */
    thriftInit(data) {
      this.$api.sql.data_opera.heartBeatMonitor(data).then(res => {});
    },
    /**
     * @description 添加数据库连接
     * @param
     */
    addDataLink() {
      this.isAddDataLink = true;
    },
    /**
     * @description 关闭弹框
     * @param
     */
    closeDialog(data) {
      this.isAddDataLink = data;
    },
    /**
     * @description 关闭编辑数据源表单
     * @param
     */
    closeEditDialog(data) {
      this.isEditDataLink = data;
    },
    /**
     * @description 编辑数据源表单成功提交
     * @param
     */
    clickEditSubmit(data) {
      this.isEditDataLink = data;
      //去调用刷新
      this.refreloadDataSourceData();
    },
    /**
     * @description 打开普通表单
     * @param
     */
    openNomalForm(data) {
      //console.log(data);
      this.isTreeNomalForm = true;
      this.formList = data.formData;
      this.rightMenu = data.menuData;
    },
    /**
     * @description 打开添加连接表单
     * @param
     */
    openAddForm(data) {
      this.isAddDataLink = true;
    },
    /**
     * @description 打开编辑连接表单
     * @param
     */
    openEditForm(data) {
      console.log(data);
      let params = {
        globalInfo: {
          dataSource: this.reqFormParams.globalInfo.dataSource,
          path: [""]
        },
        menuOperation: data.menuOperation
      };
      this.$api.sql.data_opera.getDm_forms(params).then(res => {
        if (res.resCode == 10000) {
          for (let i = 0; i < res.data.length; i++) {
            let element = res.data[i];
            for (const key in data.formData) {
              if (element.name == key) {
                element.model = data.formData[key];
              }
            }
          }
          //console.log(res.data);
          this.editLinkForm = res.data;
          this.isEditDataLink = data.open;
        } else {
          this.$message.error(res.resMsg);
        }
      });
    },
    /**
     * @description 右键菜单关闭连接
     * @param
     */

    closeLink(data) {
      console.log("关闭连接啦", data);
      for (let i = 0; i < this.connData.length; i++) {
        const element = this.connData[i];
        if (data.dataSourceId == element.dataSourceId) {
          element.children = [];
          element.open = false;
        }
      }
      for (let i = this.connectionIdList.length - 1; i >= 0; i--) {
        let element = this.connectionIdList[i];
        if (element.dataSourceId == data.dataSourceId) {
          console.log("清除当前连接心跳");
          clearInterval(element.timeId);
          element.timeId = null;
          this.connectionIdList.splice(i, 1);
        }
      }

      //设置缓存
      this.cacheTreeInfo();
    },
    /**
     * @description 右键菜单删除连接
     * @param
     */
    delLink(data) {
      //console.log("删除连接啦", data);
      for (let i = 0; i < this.connData.length; i++) {
        const element = this.connData[i];
        if (data.dataSourceId == element.dataSourceId) {
          this.connData.splice(i, 1);
          //设置缓存
          this.cacheTreeInfo();
          this.$message.success("连接删除成功");
        }
      }
    },
    /**
     * @description 关闭普通表单弹框
     * @param
     */
    closeNomalForm(data) {
      this.isTreeNomalForm = data;
    },
    /**
     * @description 监听普通表单提交
     * @param
     */
    clickNomalFormSubmit(data) {
      //console.log("普通表单", data);
      this.$api.sql.data_opera.getDmParse_menu_operation(data).then(res => {
        if (res.resCode == 10000) {
          //console.log("提交表单之后", res.data);
          this.$message.success(res.resMsg);
          this.isTreeNomalForm = false;
        } else {
          this.$message.error(res.resMsg);
        }
      });
    },
    /**
     * @description 初始获取所有数据源连接信息
     * @param
     */
    loadDataSourceData() {
      this.loadingTree = true;
      this.$api.sql.data_opera.getMetadataDm_info_list().then(res => {
        if (res.resCode == 10000) {
          console.log("所有数据源连接信息", res.data);
          for (let i = 0; i < res.data.length; i++) {
            let element = res.data[i];
            element["path"] = [element.nodeInfo.name];
            element["label"] = element.nodeInfo.name;
            element["labelType"] = element.nodeInfo.option;
            element["open"] = element.open ? element.open : false;
            element["dataSource"] = element.custom.connectionProfile.dataSource;
            element["dataSourceId"] = element.custom.connectionProfile.id;
            element["dbVersion"] = element.custom.connectionProfile.dbVersion;
            element["dbDefinition"] = element.dbDefinition;
            if (element["open"]) {
              //如过时true。说明刚刚刷新完成
              let node = {
                level: 1
              };
              this.dbClick(node, res.data[i]);
            }
          }
          setTimeout(() => {
            this.connData = res.data;
            //console.log(this.connData);
            this.$store.commit("setlinkNUm", _.cloneDeep(this.connData));
            this.cacheTreeInfo();
          }, 300);

          // this.connData = Store.get('treeData',this.connData);
          // //console.log(this.connData);
          // //临时
          // let node = {
          //   level:1
          // }
          // this.dbClick(node,res.data[0])
          this.loadingTree = false;
        } else {
          this.$message.error("数据源信息获取失败");
          this.loadingTree = false;
        }
      });
    },
    /**
     * @description 刷新连接节点列表
     * @param
     */
    refreloadDataSourceData() {
      this.loadingTree = true;
      this.$api.sql.data_opera.getDmsrefresh_meta_node_infos().then(res => {
        if (res.resCode == 10000) {
          //console.log("刷新所有数据源连接信息", res.data);
          for (let i = 0; i < res.data.length; i++) {
            let element = res.data[i];
            element["path"] = [element.nodeInfo.name];
            element["label"] = element.nodeInfo.name;
            element["labelType"] = element.nodeInfo.option;
            element["open"] = element.open ? element.open : false;
            element["dataSource"] = element.custom.connectionProfile.dataSource;
            element["dataSourceId"] = element.custom.connectionProfile.id;
            element["dbVersion"] = element.custom.connectionProfile.dbVersion;
            element["dbDefinition"] = element.dbDefinition;
            if (element["open"]) {
              //如过时true。说明刚刚刷新完成
              let node = {
                level: 1
              };
              this.dbClick(node, res.data[i]);
            }
          }
          setTimeout(() => {
            this.connData = res.data;
            //console.log(this.connData);
            this.$store.commit("setlinkNUm", _.cloneDeep(this.connData));
            this.cacheTreeInfo();
          }, 300);

          // this.connData = Store.get('treeData',this.connData);
          // //console.log(this.connData);
          // //临时
          // let node = {
          //   level:1
          // }
          // this.dbClick(node,res.data[0])
          this.loadingTree = false;
        } else {
          this.$message.error("数据源信息获取失败");
          this.loadingTree = false;
        }
      });
    },
    /**
     * @description 树节点点击
     * @param
     */
    nodeClick(object, node) {
      console.log(node);
      this.contextMenuVisible = false;
      //console.log(object, node);
      //刷新过后，需要保持状态
      //  if (node.level==1 && object.open==true) {
      //     let nodeOne = {
      //       level: 1
      //     };
      //     this.dbClick(nodeOne, object);
      //   }
      if (node.level >= 1) {
        if (node.level > 1) {
          if (object.path) {
            object.path = [];
            object["path"] = node.parent.data.path.concat([object.label]);
          } else {
            object["path"] = node.parent.data.path.concat([object.label]);
          }
        }
        if (object.loadNext) {
          //加载节点信息
          let connectionId;
          let dataSource;
          for (let i = 0; i < this.connectionIdList.length; i++) {
            const element = this.connectionIdList[i];
            if (object.path[0] == element.name) {
              connectionId = element.id;
              dataSource = element.type;
            }
          }
          // //console.log(this.reqFormParams, node);
          let data = {
            globalInfo: {
              connectionId: Number(connectionId),
              path: object.path,
              dataSource: dataSource
            },
            nodeTypeId: node.childNodes[0].data.nodeTypeId
          };
          this.getMetaInfoList(data, object, node);
        } else {
          return;
        }
      }
    },
    /**
     * @description 双击节点
     * @param
     */
    dbClick(node, data) {
      //console.log("双击节点node", node);
      //console.log(data);
      if (node.level == 1) {
        //打开链接
        this.$api.sql.data_opera
          .getDmsOpen_connection(data.custom.connectionProfile.id)
          .then(res => {
            if (res.resCode == 10000) {
              //根据连接id获取节点树列表
              this.getMetaById(Number(res.data), data, node);
              data.open = true;
              //更新已经打开的tab也得连接id
              this.updateConnId(data, Number(res.data));

              //这时候将connData数据存起来，让下面的状态栏连接数量用
              this.$store.commit("setlinkNUm", _.cloneDeep(this.connData));
              this.$store.commit("setlinkId", data.dataSourceId);
            } else {
              this.$message.error(res.resMsg);
            }
          });
      }
    },
    /**
     * @description 根据连接id获取meta信息，获取结构树列表
     * @param {connectionId} number
     */
    getMetaById(params, nodeData, node) {
      // //console.log(nodeData);
      this.$api.sql.data_opera.getDm_meta_tree(params).then(res => {
        if (res.resCode == 10000) {
          console.log("结构树列表", res.data);
          // //console.log(node)
          nodeData["connId"] = params;
          //给每一个结构节点赋值path
          let setPath = function() {
            const getPath = function(list) {
              list.forEach(function(data) {
                data["path"] = [data.label];
                data["labelType"] = data.nodeInfo.option;

                data["dataSourceId"] = nodeData.custom.connectionProfile.id;
                data["dbVersion"] = nodeData.custom.connectionProfile.dbVersion;
                data["dbDefinition"] = nodeData.dbDefinition;
                data["open"] = true;
                if (data.children) {
                  getPath(data.children);
                } else {
                  return;
                }
              });
            };
            getPath(res.data);
          };
          setPath();
          this.contextMenuVisible = false;
          nodeData.children = res.data;
          // //console.log(nodeData);
          //设置缓存
          this.cacheTreeInfo();
          //存储连接id
          let linkObj = {
            id: params,
            dataSourceId: nodeData.custom.connectionProfile.id,
            name: nodeData.label,
            type: nodeData.custom.connectionProfile.dataSource,
            timeId: null
          };
          if (this.connectionIdList.length == 0) {
            this.connectionIdList.push(linkObj);
          } else {
            for (let i = this.connectionIdList.length - 1; i >= 0; i--) {
              let element = this.connectionIdList[i];
              if (
                element.dataSourceId == nodeData.custom.connectionProfile.id
              ) {
                this.connectionIdList.splice(i, 1);
              }
            }
            this.connectionIdList.push(linkObj);
          }
          for (let i = 0; i < this.connectionIdList.length; i++) {
            let element = this.connectionIdList[i];
            //爆出心跳连接
            this.thriftInit(Number(element.id));
            element.timeId = setInterval(() => {
              this.thriftInit(Number(element.id));
            }, 1000 * 60);
          }

          //然后去加载节点信息列表
          let data = {
            globalInfo: {
              connectionId: Number(params),
              dataSource: nodeData.dataSource,
              path: nodeData.path
            },
            nodeTypeId: nodeData.children[0].nodeTypeId
          };
          this.getMetaInfoList(data, nodeData, node);
        } else {
          this.$message.error("加载节点信息失败");
        }
      });
    },
    /**
     * @description 加载meta节点信息列表
     * @param
     */
    getMetaInfoList(params, nodeData, node) {
      // //console.log(nodeData, node);
      this.$api.sql.data_opera.getDmsLoad_meta_node_infos(params).then(res => {
        console.log(res);
        if (res.resCode == 10000) {
          let arr = [];
          for (let i = 0; i < res.data.length; i++) {
            let element = nodeData.children[0];
            let obj = _.cloneDeep(element);
            obj.nodeInfo = res.data[i];
            obj.label = res.data[i].name;
            obj["labelType"] = res.data[i].option;
            arr.push(obj);
          }
          nodeData.children = arr;
          let setPath = function() {
            const getPath = function(list) {
              list.forEach(function(data) {
                data["path"] = [data.label];
                if (data.dataSourceId) {
                } else {
                  data["dataSourceId"] = nodeData.custom.connectionProfile.id;
                  data["labelType"] = nodeData.nodeInfo.option;
                  data["dbVersion"] =
                    nodeData.custom.connectionProfile.dbVersion;
                  data["dbDefinition"] = nodeData.dbDefinition;
                }
                data["open"] = true;

                if (data.children) {
                  getPath(data.children);
                } else {
                  // //console.log(res.data);
                  return;
                }
              });
            };
            getPath(nodeData.children);
          };
          setPath();
        } else {
          this.$message.error(res.resMsg);
        }
      });
    },
    /**
     * @description 获取右键菜单
     * @param
     */
    getrightMenu(data, value) {
      let connectionId;
      let cpId;
      let dataSource;
      console.log(this.connectionIdList);
      console.log(data);
      for (let i = 0; i < this.connectionIdList.length; i++) {
        let element = this.connectionIdList[i];
        if (data.dataSourceId == element.dataSourceId) {
          if (data.open == false) {
            //说明连接已关闭
            element.id = null;
            connectionId = element.id;
            cpId = element.dataSourceId;
            dataSource = element.type;
          } else {
            connectionId = element.id;
            cpId = element.dataSourceId;
            dataSource = element.type;
          }
        }
      }

      let paramss = {
        globalInfo: {
          connectionId: connectionId,
          dataSource: data.dataSource ? data.dataSource : dataSource,
          path: data.path
        },
        menuActionIds: data.menuActionIds,
        nodeTypeId: data.nodeTypeId,
        dataSourceId: data.dataSourceId,
        dbVersion: data.dbVersion,
        custom: data.custom,
        dbDefinition: data.dbDefinition,
        nodeInfo: data.nodeInfo,
        nodeData: data,
        node: value
      };

      console.log("右键菜单需要的数据", paramss);
      this.$store.commit("setGetFormParams", paramss);
      let params = {
        globalInfo: {
          connectionId: connectionId,
          dataSource: data.dataSource ? data.dataSource : dataSource,
          path: data.path
        },
        menuActionIds: data.menuActionIds,
        nodeTypeId: data.nodeTypeId
      };
      return this.$api.sql.data_opera.getDmsLoad_menu(params);
    },

    /**
     * @description 树右键点击
     * @param
     */
    rightClick(event, object, value, element) {
      //console.log(object);
      //设置path
      if (value.level > 1) {
        if (object.path) {
          object.path = [];
          object["path"] = value.parent.data.path.concat([object.label]);
        } else {
          object["path"] = value.parent.data.path.concat([object.label]);
        }
      }
      //控制右键菜单
      this.contextMenuVisible = false;
      this.getrightMenu(object, value).then(res => {
        console.log(this.thriftInitId);
        console.log("右键菜单", res.data);
        let menu = document.querySelector(".right-menu");
        menu.style.left = event.clientX + "px";
        menu.style.top = event.clientY + "px";
        this.menuData = res.data;
        setTimeout(() => {
          this.contextMenuVisible = true;
        }, 100);
      });
    },
    /**
     * @description 空白树右键点击
     * @param
     */
    blankClick() {
      document.querySelector(".tree_box").addEventListener("mousedown", e => {
        this.contextMenuVisible = false;
        if (e.which == 3) {
          document.oncontextmenu = function(ev) {
            return false; //屏蔽右键菜单
          };
          let menu = document.querySelector(".right-menu");
          menu.style.left = event.clientX + "px";
          menu.style.top = event.clientY + "px";
          setTimeout(() => {
            this.contextMenuVisible = true;
          }, 200);
        } else if (e.which == 1) {
          this.contextMenuVisible = false;
        }
      });
    },
    /**
     * @description 筛选
     * @param
     */
    filterNode(value, data, node) {
      // //console.log(data, value, node);
      // //console.log( this.$refs.tree.store);
      // for (
      //   var i = 0;
      //   i < this.$refs.selectTree.store._getAllNodes().length;
      //   i++
      // ) {
      //   this.$refs.selectTree.store._getAllNodes()[i].expanded = false;
      // }
      if (!value) {
        this.connData = _.cloneDeep(this.connData);
        return true;
      } else {
        return data.label == null ? false : data.label.indexOf(value) !== -1;
      }
      // //console.log(data, value, node);
      // //console.log(data.label);
    },
    /**
     * @description 缓存树节点列表
     * @param
     */
    cacheTreeInfo() {
      // //console.log(this.connData);
      //由于加了切换项目，后面暂时没时间做缓存分类，所以暂时注释掉
      // let _data = _.cloneDeep(this.connData);
      // for (let i = 0; i < _data.length; i++) {
      //   let element = _data[i];
      //   element.children = [];
      // }
      // let params = _data;
      // this.$api.sql.data_opera.getDmscache_meta_node_infos(params).then(res => {
      //   if (res.resCode == 10000) {
      //   } else {
      //     this.$message.error(res.rsMsg);
      //   }
      // });
    },
    /**
     * @description 刷新之后需要更新tab页绑定数据的connId
     * @param
     */
    updateConnId(data, connId) {
      // //console.log("====================================");
      // //console.log("更新tab连接ID");
      // //console.log("====================================");
      // //console.log(this.pageList);
      // //console.log(data, connId);

      if (this.pageList.length > 0) {
        for (let i = 0; i < this.pageList.length; i++) {
          let element = this.pageList[i];
          //console.log(element);
          if (data.dataSourceId == element.dataSourceId) {
            //console.log(11);
            element.connId = connId;
          }
        }
        this.$store.commit("pageList", this.pageList);
      }
      // if (
      //   this.pageCurrent.title.split("@")[0] == data.label &&
      //   this.pageCurrent.dataSource == data.dataSource
      // ) {
      //   this.pageCurrent.connId = connId;
      //   this.$store.commit("setCurrentPage", this.pageCurrent);
      // }
    },
    beforeunloadHandler(e) {
      console.log(e);
      e = e || window.event;
      if (e) {
        e.returnValue = "关闭提示";
      }
      return "关闭提示";
    }
  },

  created() {
    //获取所有数据源连接信息
    this.loadDataSourceData();
    //定时器缓存树
    this.clearCacheTimer = setInterval(() => {
      //console.log("我混存了");
      this.cacheTreeInfo();
    }, 60000);
    // window.addEventListener("beforeunload", e => this.beforeunloadHandler(e));
  },
  destroyed() {},
  beforeDestroy() {
    this.$once("hook:beforeDestroy", () => {
      //console.log('清除了定时器');
      clearInterval(this.clearCacheTimer);
    });
    // window.removeEventListener("beforeunload", e =>
    //   this.beforeunloadHandler(e)
    // );
  },
  mounted() {
    //页面加载完成，调用监听右键点击
    this.blankClick();
  }
};
</script>

<style lang='scss'>
@import "./index.scss";
</style>
