<template>
  <div class="work_order_wfqdgd">
    <div class="searchBox">
      <div class="wrap-button">
        <div class="item" v-for="(item,i) in buttons" :class="['item'+i,{'active-item': i==index}]" @click="selectButton(i)" :key="i">{{item.name}}</div>
      </div>
      <input type="text" v-model="word" placeholder="请输入">
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="priority"
        label="优先级"
        max-width="180">
      </el-table-column>
      <el-table-column
        prop="type"
        label="资源类型"
        max-width="180">
      </el-table-column>
      <el-table-column
        prop="intro"
        label="工单简介">
      </el-table-column>
      <el-table-column
        prop="time"
        label="开始时间"
        max-width="300">
      </el-table-column>
      <el-table-column
        prop="schedule"
        label="进度"
        max-width="150">
        <template slot-scope="scope">
          <span class="dot" :style="{backgroundColor:(scope.row.schedule == '待审核' ? '#1890FF' : '#52C41A')}"></span>
          <span>{{scope.row.schedule}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="150">
        <template slot-scope="scope">
          <span class="operation">查看</span>
          <span style="margin:8px;color:#D8D8D8;">|</span>
          <span class="operation">删除</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next, sizes, jumper"
      @size-change="changeSize"
      @current-change="currentPage"
      :total="100">
    </el-pagination>
    <el-button type="primary" icon="el-icon-plus" size="small" style="margin-top:15px;" @click="show=true;">新建工单</el-button>
    <pop-up-box title="新建工单" buttonType=2 v-if="show" :show.sync="show"></pop-up-box>
  </div>
</template>
<script>
import PopUpBox from '../pop-up-box/pop_up_box.vue'
export default {
  data(){
    return {
      buttons: [
        {
          name: '全部'
        },
        {
          name: '已完成'
        },
        {
          name: '待审批'
        }
      ],
      index: null,
      word: null,
      show: false,
      tableData: [
        {
          priority: '紧急',
          type: '项目',
          intro: '申请加入项目',
          time: '2018-06-16 14:03',
          schedule: '待审核'
        },
        {
          priority: '紧急',
          type: '项目',
          intro: '申请加入项目',
          time: '2018-06-16 14:03',
          schedule: '待审核'
        },
        {
          priority: '紧急',
          type: '项目',
          intro: '申请加入项目',
          time: '2018-06-16 14:03',
          schedule: '待审核'
        },
        {
          priority: '紧急',
          type: '项目',
          intro: '申请加入项目',
          time: '2018-06-16 14:03',
          schedule: '已完成'
        },
        {
          priority: '紧急',
          type: '项目',
          intro: '申请加入项目',
          time: '2018-06-16 14:03',
          schedule: '待审核'
        },
      ]
    }
  },
  components:{
    PopUpBox
  },
  props:{},
  created() {},
  watch:{},
  computed:{},
  methods:{
    selectButton(i) {
      this.index = i;
    },
    changeSize(val) {
      console.log('changeSize', val)
    },
    currentPage(val) {
      console.log('currentPage', val)
    }
  },
  mounted() {}
}
</script>
<style lang="scss" scoped>
  .work_order_wfqdgd{
    padding: 15px 32px;
    .searchBox{
      float: right;
      display: flex;
      margin-bottom: 20px;
    }
    .wrap-button{
      display: flex;
      margin-right: 16px;
      .item{
        height: 32px;
        line-height: 32px;
        padding: 0 16px;
        border: 1px solid #3D3F44;
        margin: 0 -1px;
        cursor: pointer;
      }
      .item0{
        border-radius: 4px 0 0 4px;
      }
      .item1{
        border-left: none;
        border-right: none;
      }
      .item2{
        border-radius: 0 4px 4px 0;
      }
      .active-item{
        border: 1px solid#1890FF
      }
    }
    input{
      width: 272px;
      height: 32px;
      background-color: #25262A;
      padding: 0 12px;
      border-radius:4px;
      border:1px solid rgba(235,235,235,0.15);
    }
  }
  .el-pagination{
    float: right;
    margin-top: 15px;
  }
  .dot{
    width: 6px;
    height: 6px;
    display: inline-block;
    background-color: #1890FF;
    margin-right: 10px;
    border-radius: 50%;
  }
  .operation{
    color: #1890FF;
    cursor: pointer;
  }
</style>