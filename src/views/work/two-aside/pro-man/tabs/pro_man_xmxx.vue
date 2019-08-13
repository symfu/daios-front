<template>
  <div class="pro_man_xmxx">
    <div class="base_info">
      <div class="title">基本信息</div>
      <div class="tit_con">
        <div class="fl box1">
          <div>项目名称：{{baseInfo.projectName}}</div>
          <div>项目创建人：{{baseInfo.managerName}}</div>
          <div>范围：{{baseInfo.range?'公开':'私有'}}</div>
        </div>
        <div class="fl box2">
          <div>创建时间：{{baseInfo.createTime}}</div>
          <div>项目成员：{{baseInfo.memberCount}}</div>
        </div>
        <div class="fl box3">
          <div>描述：{{baseInfo.desc}}</div>
        </div>
      </div>
      <div class="title">操作</div>
      <div class="caozuo">
        <el-button type="black" size="mini" @click="updateName" style="margin-right:30px">修改项目名称</el-button>
        <el-button style="margin-right:30px" type="black" size="mini" @click="updateFanwei">修改项目范围</el-button>
        <el-button
          style="margin-right:30px"
          type="black"
          size="mini"
          @click="layout"
          v-if="!baseInfo.personal"
        >退出项目</el-button>
        <el-button
          style="margin-right:30px"
          type="black"
          size="mini"
          @click="delpro"
          v-if="!baseInfo.personal"
        >删除项目</el-button>
      </div>
    </div>
    <div class="line"></div>
    <div class="con">
      <div class="title">
        <span>已加入的项目</span>
        <el-button
          type="primary"
          size="mini"
          class="fr"
          @click="addProject"
          icon="el-icon-plus"
        >创建新项目</el-button>
      </div>
      <div class="table">
        <el-table :data="tableData" max-height="400" style="width: 100%">
          <el-table-column prop="projectName" label="项目名称" min-width="180"></el-table-column>
          <el-table-column label="所属角色" min-width="180">
            <template slot-scope="socped">
              <div>
                <span>{{socped.row.admin?'项目管理员':'普通用户'}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop label="操作">
            <template slot-scope="socped">
              <div>
                <el-button
                  v-if="!socped.row.personal"
                  type="text"
                  @click="lyoutPro(socped.row)"
                >退出项目</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>

        <!-- <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="10"
          layout="prev, pager, next,sizes, jumper"
          :total="40"
        ></el-pagination>-->
      </div>
    </div>

    <addPro
      ref="addPro"
      :dialog="addProDialog"
      @closeDialog="addProDialog = false"
      @clickSubmit="addProjectSubmit"
    ></addPro>
    <putProName
      ref="putProName"
      :dialog="putProNameDialog"
      :form="baseInfo"
      @closeDialog="putProNameDialog = false"
      @clickSubmit="putProNamejectSubmit"
    ></putProName>
    <putProFanwei
      ref="putProFanwei"
      :dialog="putProFanweiDialog"
      :forms="baseInfo"
      @closeDialog="putProFanweiDialog = false"
      @clickSubmit="putProFanweijectSubmit"
    ></putProFanwei>
  </div>
</template>

<script>
import Store from "store";
import { mapState } from "vuex";
import addPro from "./components/add_pro.dialog";
import putProName from "./components/put_pro_name";
import putProFanwei from "./components/put_pro_fanwei";
export default {
  components: {
    addPro,
    putProName,
    putProFanwei
  },
  computed: {
    ...mapState({
      toProjectId: state => state.project.toProjectId
    })
  },
  watch: {
    toProjectId(val) {
      console.log(val);
      //切换项目后更新项目
      this.loadBasePro();
      this.loadProList();
    }
  },
  data() {
    return {
      addProDialog: false,
      putProNameDialog: false,
      putProFanweiDialog: false,
      currentPage: 1,
      baseInfo: null,
      tableData: []
    };
  },

  methods: {
    /**
     * @description 创建新项目
     * @param
     */
    addProject() {
      this.addProDialog = true;
    },
    /**
     * @description 退出项目
     * @param
     */
    lyoutPro(data) {
      this.$confirm("该操作将从该项目中退出", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            userId: Store.get("userData").userId,
            projectId: data.id
          };
          this.$api.project.pro.lyoutPm(params).then(res => {
            if (res.resCode == 10000) {
              // console.log(res)
              this.$message.success(res.resMsg);
              if (data.id == this.baseInfo.id) {
                console.log("退出当前项目");
                let _data = {
                  proId: this.baseInfo.id,
                  refre: true
                };
                this.$store.commit("toProjectId", null);
                Store.set('toProjectId',null)
                this.$store.commit("delRefrePro", _data);
              } else {
                this.$store.commit("addRefrePro", true);
                this.loadProList();
              }
            } else {
              this.$message.error(res.resMsg);
            }
          });
        })
        .catch(() => {});
    },
    /**
     * @description 添加项目提交啦
     * @param
     */
    addProjectSubmit() {
      //创建成功了，需要刷新项目列表信息
      this.loadProList();
      this.addProDialog = false;
    },
    /**
     * @description 获取项目列表
     * @param
     */
    loadProList() {
      this.$api.project.pro
        .getOwnPmList(Store.get("userData").userId)
        .then(res => {
          if (res.resCode == 10000) {
            // console.log(res)
            this.tableData = res.data;
          } else {
            this.$message.error(res.resMsg);
          }
        });
    },
    /**
     * @description 获取项目基本信息,顶栏切换后也需要刷新
     * @param
     */
    loadBasePro() {
      this.$api.project.pro.getLitePm(this.toProjectId).then(res => {
        if (res.resCode == 10000) {
          console.log(res.data);
          this.baseInfo = res.data;
        } else {
          this.$message.error(res.resMsg);
        }
      });
    },
    /**
     * @description 修改项目名称
     * @param
     */
    updateName() {
      this.putProNameDialog = true;
    },
    /**
     * @description 修改项目名称提交啦
     * @param
     */
    putProNamejectSubmit() {
      this.putProNameDialog = false;
    },
    /**
     * @description 修改项目范围
     * @param
     */
    updateFanwei() {
      this.putProFanweiDialog = true;
    },
    /**
     * @description 修改项目范围提交啦
     * @param
     */
    putProFanweijectSubmit() {
      this.putProFanweiDialog = false;
    },
    /**
     * @description 退出项目
     * @param
     */
    layout() {
      this.$confirm("该操作将从该项目中退出", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            userId: Store.get("userData").userId,
            projectId: this.baseInfo.id
          };
          this.$api.project.pro.lyoutPm(params).then(res => {
            if (res.resCode == 10000) {
              // console.log(res)
              this.$message.success(res.resMsg);
              //需要让父页面刷新，顶栏刷新
              let _data = {
                proId: this.baseInfo.id,
                refre: true
              };
              this.$store.commit("toProjectId", null);
              Store.set('toProjectId',null)
              this.$store.commit("delRefrePro", _data);
            } else {
              this.$message.error(res.resMsg);
            }
          });
        })
        .catch(() => {});
    },
    /**
     * @description 删除项目
     * @param
     */
    delpro() {
      this.$confirm("该操作将永久删除该项目", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.project.pro.delPm(this.baseInfo.id).then(res => {
            if (res.resCode == 10000) {
              console.log(res.data);
              this.$message.success(res.resMsg);

              //需要让父页面刷新，顶栏刷新
              let _data = {
                proId: this.baseInfo.id,
                refre: true
              };
              this.$store.commit("toProjectId", null);
              Store.set('toProjectId',null)
              this.$store.commit("delRefrePro", _data);
              //父页面刷新
              // this.$parent.loadBasePro()
              // this.$parent.loadProList()
            } else {
              this.$message.error(res.resMsg);
            }
          });
        })
        .catch(() => {});
    }
    /**
     * @description 分页
     * @param
     */
    // handleSizeChange(val) {
    //   console.log(`每页 ${val} 条`);
    // },
    // handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`);
    // }
  },

  created() {
    console.log(this.toProjectId);
    this.loadProList();
    this.loadBasePro();
  }
};
</script>

<style lang='scss'>
@import "../pro_man.scss";
</style>
