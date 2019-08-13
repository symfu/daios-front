<template>
  <div class="work_order_dclgd">
    <div class="wrap-box">
      <div class="inputBox"><i class="iconfont daiosSearch"></i><input type="text" placeholder="发起人名称" v-model="name"></div>
      <el-button type="primary" size="mini">搜索</el-button>
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
    <pop-up-box title="工单审批" v-if="show" :show.sync="show"></pop-up-box>
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
                name: '陈刚',
                priority: '紧急',
                type: '项目',
                intro: '申请加入项目',
                time: '2019-01-24 10:16',
            },
            {
                name: '陈刚',
                priority: '紧急',
                type: '项目',
                intro: '申请加入项目',
                time: '2019-01-24 10:16',
            },
            {
                name: '陈刚',
                priority: '紧急',
                type: '项目',
                intro: '申请加入项目',
                time: '2019-01-24 10:16',
            },
            {
                name: '陈刚',
                priority: '紧急',
                type: '项目',
                intro: '申请加入项目',
                time: '2019-01-24 10:16',
            },
            {
                name: '陈刚',
                priority: '紧急',
                type: '项目',
                intro: '申请加入项目',
                time: '2019-01-24 10:16',
            },
            {
                name: '陈刚',
                priority: '紧急',
                type: '项目',
                intro: '申请加入项目',
                time: '2019-01-24 10:16',
            },
            {
                name: '陈刚',
                priority: '紧急',
                type: '项目',
                intro: '申请加入项目',
                time: '2019-01-24 10:16',
            }
        ],
        index: null,
        show: false
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
      display: flex;
    }
    .inputBox{
        width: 469px;
        height: 32px;
        display: flex;
        border: 1px solid rgba(235,235,235,0.15);
        background:rgba(37,38,42,1);
        margin-right: 15px;
        padding: 0 18px;
        .daiosSearch{
          margin-right: 15px;
          line-height: 30px;
        }
        input{
            background-color: rgba(0, 0, 0, 0);
            height: 100%;
            flex: auto;
        }
    }
    .work_order_dclgd{
        padding: 15px 32px;
    }
    .el-pagination{
      float: right;
      margin-top: 15px;
    }
</style>