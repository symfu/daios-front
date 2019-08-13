<template>
  <div class="pro_man_xmcy">
    <div class="tit">
      <div class="fl">
        用户组：
        <el-select v-model="users" @change="changeUsers" size="small" placeholder="请选择用户组">
          <el-option v-for="item,i in userList" :key="i" :label="item.groupName" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="fr" style="width:500px">
        <!-- <el-input v-model="fliter" placeholder="请输入用户的昵称或者账户进行搜索" @keyup.enter.native="searchPmUseer" style="width:300px"></el-input>
        <el-button
          type="primary"
          size="mini"
          style="margin-left:10px;height: 24px;line-height: 13px;"
          @click="searchPmUseer"
        >搜索</el-button>-->
        <el-button
          type="primary"
          class="fr"
          icon="el-icon-plus"
          style="height: 24px;line-height: 13px;"
          size="mini"
          @click="openProUserjectSubmit"
        >添加成员</el-button>
      </div>
    </div>
    <div class="con">
      <el-table
        ref="multipleTable"
        :data="tableData"
        max-height="500"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column label="昵称" prop="nickName" min-width="120"></el-table-column>
        <el-table-column prop="role" label="角色" min-width="120"></el-table-column>
        <el-table-column prop="joinTime" label="加入时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="socped">
            <div>
              <el-button type="text" disabled>查看权限</el-button>
              <el-button type="text" disabled>更改角色</el-button>
              <i
                class="el-icon-remove"
                style="color:red;cursor: pointer;margin-left:20px;display:inline-block;font-size:16px"
                title="删除成员"
                @click="del(socped.row)"
              ></i>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <!-- <el-button type="primary" size="mini" style="margin-top: 10px;" @click="dels">批量删除</el-button> -->
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

    <addProUser
      ref="addProUser"
      :dialog="addProUserDialog"
      @closeDialog="addProUserDialog = false"
      @clickSubmit="addProUserjectSubmit"
    ></addProUser>
  </div>
</template>

<script>
import Store from "store";
import { mapState } from "vuex";
import addProUser from "./components/add_pro_user";
export default {
  components: {
    addProUser
  },
  computed: {
    ...mapState({
      toProjectId: state => state.project.toProjectId
    })
  },
  toProjectId(val) {
    console.log(val);
    //切换项目后更新项目
    this.loadUsers();
  },
  data() {
    return {
      addProUserDialog: false, //添加用户堂狂
      currentPage: 1,
      users: "",
      fliter: "",
      userList: [],
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      multipleSelection: [] //多选
    };
  },

  methods: {
    /**
     * @description 获取用户组
     * @param
     */
    loadUsers() {
      this.$api.project.pro.getPmGroup(this.toProjectId).then(res => {
        if (res.resCode == 10000) {
          console.log(res.data);
          this.userList = res.data;
        } else {
          this.$message.error(res.resMsg);
        }
      });
    },

    /**
     * @description 获取人员列表
     * @param
     */
    loadUserList() {
      let params = {
        projectId: this.toProjectId,
        groupId: this.users
      };
      this.$api.project.pro.getPmPeople(params).then(res => {
        if (res.resCode == 10000) {
          console.log(res.data);
          this.tableData = res.data;
        } else {
          this.$message.error(res.resMsg);
        }
      });
    },
    /**
     * @description 打开添加用户
     * @param
     */
    openProUserjectSubmit() {
      this.addProUserDialog = true;
    },
    /**
     * @description 添加用户提交啦
     * @param
     */
    addProUserjectSubmit() {
      this.addProUserDialog = false;
    },
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    /**
     * @description 批量删除
     * @param
     */
    dels(data) {
      if (this.multipleSelection.length == 0) {
        this.$message.error("您还没有选中成员，请先批量选中成员");
        return false;
      }
      this.$confirm("该操作将永久删除成员", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {})
        .catch(() => {});
    },
    /**
     * @description 删除成员
     * @param
     */
    del(data) {
    
      this.$confirm("该操作将永久删除该成员", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
        
          let params = {
            projectId: this.toProjectId,
            userId: data.userId
          };
     
          this.$api.project.pro.deluser(params).then(res => {
            if (res.resCode == 10000) {
              // console.log(res.data);
              this.$message.success(res.resMsg);
              this.loadUserList()
            } else {
              this.$message.error(res.resMsg);
            }
          });
        })
        .catch(() => {});
    },
    /**
     * @description 选择用户组
     * @param
     */
    changeUsers() {
      // console.log(this.users);
      this.loadUserList();
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
    this.loadUsers();
    this.loadUserList();
  }
};
</script>

<style lang='scss'>
</style>
