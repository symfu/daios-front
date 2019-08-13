<template>
  <div class="work_order_sygd">
    <div class="wrap-box">
      <div class="inputBox"><i class=""></i><input type="text" placeholder="发起人名称" v-model="name"></div>
      <el-button type="primary" size="mini">搜索</el-button>
      <el-button type="primary" size="mini" icon="el-icon-plus" style="float:right;" @click="show=true;">新建工单</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="发起人"
        max-width="180">
      </el-table-column>
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
        label="发起时间"
        max-width="300">
      </el-table-column>
      <el-table-column
        prop="schedule"
        label="进度"
        max-width="200">
        <template slot-scope="scope">
          <span class="dot" :style="{backgroundColor:(scope.row.schedule == '待审批' ? '#1890FF' : '#52C41A')}"></span>
          <span>{{scope.row.schedule}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
            <span style="cursor:pointer;" @click="approval(scope.$index)" :style="{color:(scope.$index == index ? 'rgba(255,255,255,0.68)':'rgba(255,255,255,1)')}">审批</span>
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
    <pop-up-box title="新建审批" v-if="show" buttonType=2 :show.sync="show"></pop-up-box>
  </div>
</template>
<script>
import PopUpBox from '../pop-up-box/pop_up_box.vue'
export default {
  data(){
    return {
      name: null,
      tableData: [
        {
          name: '赵云山',
          priority: '紧急',
          type: '项目',
          intro: '申请加入项目',
          time: '2019-01-24 10:18',
          schedule: '待审批'
        },
        {
          name: '赵云山',
          priority: '紧急',
          type: '项目',
          intro: '申请加入项目',
          time: '2019-01-24 10:18',
          schedule: '已完成'
        },
        {
          name: '赵云山',
          priority: '紧急',
          type: '项目',
          intro: '申请加入项目',
          time: '2019-01-24 10:18',
          schedule: '待审批'
        },
        {
          name: '赵云山',
          priority: '紧急',
          type: '项目',
          intro: '申请加入项目',
          time: '2019-01-24 10:18',
          schedule: '待审批'
        },
        {
          name: '赵云山',
          priority: '紧急',
          type: '项目',
          intro: '申请加入项目',
          time: '2019-01-24 10:18',
          schedule: '待审批'
        }
      ],
      show: false,
      index: null
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
    approval(i) {
      this.index = i;
      this.show = true;
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
    .wrap-box{
      margin-bottom: 24px;
    }
    .inputBox{
        width: 469px;
        height: 32px;
        display: inline-block;
        border: 1px solid rgba(235,235,235,0.15);
        margin-right: 15px;
        padding: 0 18px;
        background-color: #25262A;
        input{
            background-color: rgba(0, 0, 0, 0);
            height: 100%;
        }
    }
    .work_order_sygd{
        padding: 15px 32px;
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
</style>