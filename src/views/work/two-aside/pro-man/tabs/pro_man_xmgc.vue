<template>
  <div class="pro_man_xmgc">
    <div class="tit">
      <el-input
        v-model="fliter"
        @keyup.enter.native="loadData"
        style="width:350px"
        
        placeholder="输入项目名称查找"
        size="small"
      ></el-input>
      <el-button
        type="primary"
        style="margin-left:10px"
        size="small"
        @click="loadData"
      >搜索</el-button>
    </div>
    <div class="con">
      <el-table
        ref="multipleTable"
        :data="tableData"
        max-height="500"
        v-loading="loading"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column label="项目名称" prop="projectName" min-width="120"></el-table-column>
        <el-table-column prop="managerName" label="负责人" min-width="120"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column label="范围">
          <template slot-scope="socped">
            <div>
              <span>{{socped.row.range?'公有':'私有'}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="desc" label="描述"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="socped">
            <div>
              <span>{{socped.row.exist?'已加入':'尚未加入'}}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div>
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
  </div>
</template>

<script>
import Store from "store";
import { mapState } from "vuex";
export default {
  data() {
    return {
      currentPage: 1,
      loading:false,
      fliter: "",
      tableData: []
    };
  },
 computed: {
    ...mapState({
      editUserSuccess: state => state.work.editUserSuccess,
      updataRefrePro: state => state.project.updataRefrePro,
      delRefrePro: state => state.project.delRefrePro,
      addRefrePro: state => state.project.addRefrePro,
      toProjectId: state => state.project.toProjectId,
    })
  },
  watch: {
    addRefrePro(val) {
      this.loadData()
    }
  },
  methods: {
    /**
     * @description 加载数据
     * @param
     */
    loadData() {
      this.loading = true
      let params = {
        userId: Store.get("userData").userId,
        condition: this.fliter
      };
      this.$api.project.pro.getPmGc(params).then(res => {
        if (res.resCode == 10000) {
          console.log(res.data);
          this.tableData = res.data;
          this.loading = false
        } else {
          this.$message.error(res.resMsg);
          this.loading = false
        }
      });
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
    this.loadData();
  }
};
</script>

<style lang='scss'>
</style>
