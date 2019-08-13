<template>
  <div class="admin-user-container full bg-white flex">
    <div class="admin-sidebar">
      <ul class="sidebar__list">
        <li class="sidebar__li">
          <div class="item" :class="{active:role==''}" @click="doCategory('')">
            <i class="i-circle"></i>
            <span class="text-nowrap title">全部</span>
            <span class="num">{{categoryInfo.total}}</span>
          </div>
        </li>
        <li class="sidebar__li">
          <div class="item" :class="{active:role=='ADMIN'}" @click="doCategory('ADMIN')">
            <i class="i-circle bd-blue"></i>
            <span class="text-nowrap title">管理员</span>
            <span class="num">{{categoryInfo.admin}}</span>
          </div>
        </li>
        <li class="sidebar__li">
          <div class="item" :class="{active:role=='GENERAL'}" @click="doCategory('GENERAL')">
            <i class="i-circle bd-yellow"></i>
            <span class="text-nowrap title">普通成员</span>
            <span class="num">{{categoryInfo.general}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="admin-content padding">
      <div class="row-title">
        <h3>用户管理</h3>
        <div class="row-title__ft" v-if="userInfo.role=='ADMIN'">
          <el-button size="mini" @click="dialogAddVisible=true" icon="iconfont icon-adduser">添加用户</el-button>
          <el-button size="mini" icon="iconfont icon-export" @click="dialogImportVisible=true">导入外部用户</el-button>
        </div>
      </div>
      <div class="filter-box pt">
        <el-form inline>
          <el-input v-model="searchValue" size="small" style="width:calc(100% - 82px);max-width:400px" placeholder="输入姓名或账户" @keyup.enter.native="doFilter"></el-input>
          <el-button class="ml-sm" style="width:72px" type="blue" size="small" @click="doFilter">确定</el-button>
        </el-form>
      </div>
      <div class="mt" :style="'height:'+height+'px'">
        <el-table :height="height" v-loading="loading" :data="tableData" @selection-change="handleSelectionChange" size="small">
          <el-table-column type="selection" width="30"></el-table-column>
          <el-table-column prop="nickName" label="姓名"></el-table-column>
          <el-table-column prop="userName" label="账户"></el-table-column>
          <el-table-column label="角色">
            <template slot-scope="scope">
              <div v-if="scope.row.role=='ADMIN'">
                <i class="we-icon-admin"></i>
                <span>管理员</span>
              </div>
              <div v-if="scope.row.role=='GENERAL'">
                <span>普通用户</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="加入时间" min-width="140"></el-table-column>
          <el-table-column label="操作" min-width="200px" v-if="userInfo.role=='ADMIN'">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="changeRole(scope.row)">更改角色</el-button>
              <el-button type="text" size="mini" @click="modifyPassword(scope.row)" v-if="scope.row.dataSource!=='DINGTALK'">修改密码</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="mt clearfix">
          <div class="fl">
            <el-button type="danger" v-if="userInfo.role=='ADMIN'" size="mini" @click="removeUsers">批量删除</el-button>
          </div>
          <div class="fr">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="total"
              :page-size="pageSize"
              :current-page="currentPage"
              @current-change="currentChange">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <!-- 新增用户弹窗 -->
    <DialogAdd :visible.sync="dialogAddVisible" v-if="dialogAddVisible" @success="createSuccess"></DialogAdd>

    <!-- 修改用户角色弹窗 -->
    <DialogRole :visible.sync="dialogRoleVisible" :data="modifyData" v-if="dialogRoleVisible" @success="changeRoleSuccess"></DialogRole>

    <!-- 导入用户选择弹窗 -->
    <DialogImport :visible.sync="dialogImportVisible"></DialogImport>

    <!-- 修改用户密码弹窗 -->
    <DialogModifyPassword :visible.sync="dialogModifyPasswordVisible" v-if="dialogModifyPasswordVisible" :data="modifyData"></DialogModifyPassword>
  </div>
</template>

<script>
import DialogAdd from './components/dialog-add'
import DialogImport from './components/dialog-import'
import DialogRole from './components/dialog-role'
import DialogModifyPassword from './components/dialog-modifyPassword'
import Store from 'store'
  export default {
    components: {
      DialogAdd,
      DialogImport,
      DialogRole,
      DialogModifyPassword
    },
    data () {
      return {
        loading: false,
        userInfo: Store.get('userData'),
        tableData: [],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        searchValue: '',
        dialogAddVisible: false, //新建弹窗
        dialogRoleVisible: false, //修改角色弹窗
        dialogImportVisible: false, //导入外部用户
        dialogModifyPasswordVisible: false, //用户修改密码弹窗
        categoryInfo: {
          total: 0,
          admin: 0,
          general: 0
        },
        total: 0,
        height: 400,
        modifyData: {},
        selectionList: [],
        role: ''
      }
    },
    created() {
      this.loadCategory()
      this.loadData('first')
    },
    mounted() {
      window.onresize = () => {
        this.initHeight()
      }
    },
    methods: {
      initHeight() {
        const _height = document.getElementsByClassName('admin-content')[0].clientHeight
        this.height = _height - document.querySelector('.row-title').clientHeight
          - document.querySelector('.filter-box').clientHeight - 114
        //console.log(_height, this.height)
      },
      loadCategory() {
        this.$api.admin.getUserCategory().then(res => {
          this.categoryInfo = {
            total: res.data[0].total + res.data[1].total,
            admin: res.data[0].total,
            general: res.data[1].total
          }
        })
      },
      loadData(type) {
        this.loading = true
        const params = {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          condition: this.searchValue,
          role: this.role
        }
        this.$api.admin.getUsesList(params).then(res => {
          if(res.resCode == 10000) {
            this.tableData = res.data.rows
            this.total = res.data.total
            if(type == "first") {
              this.initHeight()
            }
            this.loading = false
          } else {
            this.$message.error(res.resMsg)
          }
        })
      },
      handleSelectionChange(val) {
        this.selectionList = val
      },
      removeUsers() {
        if(this.selectionList.length == 0) {
          this.$message.error('请先选择要删除的用户')
          return false
        }
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const list = this.selectionList.map(x => {
            return x.userId
          })
          const params = list.join(',')
          this.$api.admin.deleteUsers(params).then(res => {
            if(res.resCode == 10000) {
              this.$message.success('操作成功')
              this.loadCategory()
              this.loadData()
            } else {
              this.$message.error(res.resMsg)
            }
          })
        }).catch(err => {
        });
      },
      createSuccess() {
        this.dialogAddVisible = false
        this.loadCategory()
        this.loadData()
      },
      changeRole(item) {
        this.modifyData = item
        this.dialogRoleVisible = true
      },
      modifyPassword(item) {
        this.modifyData = item
        this.dialogModifyPasswordVisible = true
      },
      changeRoleSuccess() {
        this.dialogRoleVisible = false
        this.loadCategory()
        this.loadData()
      },
      currentChange(val) {
        this.currentPage = val
        this.loadData()
      },
      doCategory(role) {
        this.currentPage = 1
        this.role = role
        this.searchValue = ""
        this.loadData()
      },
      doFilter() {
        this.currentPage = 1
        this.loadData()
      }
    }
  }
</script>

<style lang="scss" scoped>
.admin-sidebar {
  width: 240px;
  height: calc(100vh - 90px);
  overflow-y: auto;
  background-image: linear-gradient(180deg, #EBE8FF 0%, #FEFDF1 100%);
}
.sidebar__li {
  width: 100%;
  height: 36px;
  .item {
    width: 100%;
    height: 100%;
    line-height: 36px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all .3s ease-in-out
  }
  .item.active {
    background: #fff;
    .title {
      color: #333333;
    }
  }
  .item:hover {
    background: rgba(255,255,255,.5)
  }
  .i-circle {
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    border: 2px solid #8992BD;
    margin-left: 13px;
    margin-right: 9px;
  }
  .bd-blue {
    border-color: #53D0EE
  }
  .bd-yellow {
    border-color: #FAB847
  }
  .title {
    display: inline-block;
    width: 150px;
    font-size: 14px;
    color: #666666;
  }
  .num {
    flex: 1;
    padding-right: 15px;
    text-align: right;
    font-size: 12px;
    color: #70A5E2;
    letter-spacing: 0;
  }
}
.admin-content {
  flex: 1;
  overflow-y: auto;
  height: calc(100vh - 90px)
}
.we-icon-admin {
  
}
</style>
<style lang="scss">
  .icon-adduser, .icon-export {
    font-size: 14px;
  }
</style>