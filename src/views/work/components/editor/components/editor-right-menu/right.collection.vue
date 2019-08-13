<template>
  <div class="sql_editor_collection">
    <div class="title">
      <span>收藏SQL</span>
      <i
        class="iconfont daiosshuaxin fr"
        @click="loadData()"
        title="刷新"
        style="margin-right:20px;font-size: 17px;cursor: pointer;"
      ></i>
    </div>
    <div class="tree_box" v-loading="loading">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="mini"></el-input>
      <el-tree
        v-show="data.length>0"
        class="filter-tree"
        style="max-height: 291px;"
        :data="data"
        :props="defaultProps"
        node-key="directoryId"
        @node-click="nodeClick"
        @node-expand="nodeClick"
        :expand-on-click-node="true"
        :filter-node-method="filterNode"
        ref="tree"
      >
        <span
          class="custom-tree-node"
          style="width: 100%;height: 30px;line-height: 30px;"
          slot-scope="{ node, data }"
        >
          <span @click="lookDetail(node)" @dblclick="dbClick(node,data)">{{ node.label }}</span>
          <span>
            <el-button
              class="fr treedisabled"
              v-show="node.level==1"
              style="margin-right:5px"
              type="text"
              title="删除收藏夹"
              size="mini"
              @click="() =>delCollections (data,node)"
            >
              <i class="iconfont daiosbutton-remove-anniushanchu"></i>
            </el-button>
            <el-button
              class="fr treedisabled"
              v-show="node.level==1"
              style="margin-right:20px"
              type="text"
              title="添加收藏夹"
              size="mini"
              @click="() => append(data,node)"
            >
              <i class="iconfont daiostianjia"></i>
            </el-button>

            <el-button
              class="fr treedisabled"
              v-show="node.level==2"
              style="margin-right:20px"
              type="text"
              size="mini"
              title="删除收藏"
              @click="delCollection(data, node)"
            >
              <i class="iconfont daiosbutton-remove-anniushanchu"></i>
            </el-button>
            <el-button
              class="fr treedisabled"
              v-show="node.level==2"
              style="margin-right:5px"
              type="text"
              size="mini"
              title="编辑收藏"
              @click="editCollection(data, node)"
            >
              <i class="iconfont daiosxingzhuang"></i>
            </el-button>
          </span>
        </span>
      </el-tree>
      <div
        v-show="data.length==0"
        @click="() => append()"
        style="cursor: pointer;text-align: center;line-height:30px;margin-top:40px"
      >
        暂时没有收藏夹，请先
        <span style="color:#33bdfe">新建收藏夹</span>
      </div>
    </div>
    <div style="height:1px;background:#000;"></div>
    <div class="tree_box_detail" v-show="isDetail">
      <div class="title">说明</div>
      <div class="con">
        <div class="name">名称：</div>
        <div class="text">{{detail.directoryName}}</div>
        <div class="name">SQL：</div>
        <div style="padding-left: 27px;">
          <el-input v-model="detail.content" type="textarea" placeholder disabled size="mini"></el-input>
        </div>
        <div class="name">备注：</div>
        <div class="text">{{detail.remarks}}</div>
      </div>
    </div>

    <addCollectionDerctory :dialog.sync="addCollectionDery" v-on:closeDialog="closeDialog"></addCollectionDerctory>
    <editCollection
      :dialog.sync="isShowEdit"
      :editData.sync="editData"
      v-on:closeDialog="closeEditDialog"
    ></editCollection>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Store from "store";
import addCollectionDerctory from "./add.collection.derectory.dialog";
import editCollection from "./edit.collection";
export default {
  components: {
    addCollectionDerctory,
    editCollection
  },
  computed: {
    ...mapState({
      pageCurrent: state => state.work.pageCurrent,
      pageList: state => state.work.pageList,
      refreCollection: state => state.work.refreCollection
    })
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    refreCollection(val) {
      if (val) {
        this.loadData();
      } else {
        this.$store.commit("setRefreCollection", false);
      }
    }
  },
  data() {
    return {
      filterText: "",
      loading: false,
      newChild: {},
      detail: {},
      editData: {},
      addCollectionDery: false,
      isShowEdit: false,
      isDetail: false,
      sql: "",
      data: [],
      defaultProps: {
        children: "collections",
        label: "directoryName"
      }
    };
  },

  methods: {
    /**
     * @description 帅选
     * @param
     */
    filterNode(value, data) {
      if (!value) return true;
      return data.directoryName.indexOf(value) !== -1;
    },
    /**
     * @description 节点点击
     * @param
     */
    nodeClick(object, node) {
      // //console.log(object);
    },
    /**
     * @description 加载收藏数据
     * @param
     */
    loadData() {
      this.loading = true;
      let params = {
        connectId: this.pageCurrent.cpId,
        userId: Store.get("userData").userId
      };
      this.$api.user.collection.getCollection(params).then(res => {
        if (res.resCode == 10000) {
          //console.log(res.data);
          this.data = [];
          let str = JSON.stringify(res.data.directory);
          str = str.replace(/alias/g, "directoryName");
          str = str.replace(/collectionId/g, "directoryId");
          this.data = JSON.parse(str);
          //console.log(this.data);
          this.loading = false;
          this.$store.commit("setRefreCollection", false);
          // this.$message.success(res.resMsg);
        } else {
          this.loading = false;
          this.$message.error(res.resMsg);
        }
      });
    },
    /**
     * @description 查看收藏详情
     * @param
     */
    lookDetail(data) {
      //console.log(data.data);
      this.isDetail = true;
      this.detail = data.data;
    },
    /**
     * @description 双击内容上到编辑器上
     * @param 
     */
    dbClick(node,data) {
      //console.log('去编辑器当前窗口楼')
       if (this.pageList.length == 0) {
        this.$message.error("当前没有查询窗口，请先打开查询窗口");
      } else {
        if (!this.pageCurrent.dataSourceId) {
          //需要新开窗口
          this.$message.error(
            "当前窗口不是数据查询窗口"
          );
        } else {
          //开始去当前窗口
          this.$store.commit("setOpenxxxSql", data.content);
        }
      }
    },
    /**
     * @description 添加节点
     * @param
     */
    append(data, node) {
      //console.log(data, node);
      this.addCollectionDery = true;
      // let directoryId = 10000;
      // const newChild = {
      //   directoryId: directoryId++,
      //   directoryName: "testtest",
      //   collections: []
      // };
      // node.parent.data.push(newChild);
    },
    /**
     * @description 删除收藏夹
     * @param 
     */
    delCollections(data, node) {
       this.$confirm("该操作将永久删除该收藏夹", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.user.collection
            .delCollections(data.directoryId)
            .then(res => {
              if (res.resCode == 10000) {
                this.$message.success("删除成功");
                this.loadData();
              } else {
                this.$message.error(res.resMsg);
              }
            });
        })
        .catch(() => {});
    },
    /**
     * @description 删除收藏记录
     * @param
     */
    delCollection(data, node) {
      this.$confirm("该操作将永久删除该收藏", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.user.collection
            .delCollection(data.directoryId)
            .then(res => {
              if (res.resCode == 10000) {
                this.$message.success("删除成功");
                this.loadData();
              } else {
                this.$message.error(res.resMsg);
              }
            });
        })
        .catch(() => {});
    },
    /**
     * @description 编辑收藏记录
     * @param
     */
    editCollection(data, node) {
      //console.log(data, node);
      let content = data.content;
      let alias = data.directoryName;
      let collectionId = data.directoryId;
      let remarks = data.remarks;
      let directoryId = node.parent.data.directoryId;

      this.editData = {
        directoryId: directoryId,
        content: content,
        alias: alias,
        remarks: remarks,
        collectionId: collectionId
      };
      // //console.log(this.editData)
      this.isShowEdit = true;
    },
    /**
     * @description 关闭新增收藏夹
     * @param
     */
    closeDialog(data) {
      if (data.isSuccess) {
        //成功添加
        // this.newChild = {
        //   directoryId: data.data.directoryId,
        //   directoryName: data.data.directoryName,
        //   collections: []
        // };
        // this.data.push(this.newChild);
        this.loadData();
        this.addCollectionDery = false;
      } else {
        this.loadData();
        this.addCollectionDery = false;
      }
    },
    /**
     * @description 关闭编辑收藏
     * @param
     */
    closeEditDialog(data) {
      this.isShowEdit = false;
    }
  },

  created() {
    this.loadData();
  }
};
</script>

<style lang='scss'>
.treedisabled {
  display: none;
}
.el-tree-node__content:hover {
  .treedisabled {
    display: block;
  }
}
</style>
