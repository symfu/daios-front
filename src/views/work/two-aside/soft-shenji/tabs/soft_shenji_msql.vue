<template>
  <div class="soft_shenji_msql">
    <header class="header">
        <el-select class="selectBox" v-model="name" size="small" clearable placeholder="用户姓名">
            <el-option
            v-for="item in names"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <input class="input" type="text" placeholder="请输入">
        <el-button type="primary" size="small">搜索</el-button>
        <select-time style="float:right;" @selectDate="switchData"></select-time>
    </header>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="用户姓名"
        max-width="180">
      </el-table-column>
      <el-table-column
        prop="connect"
        label="使用连接"
        max-width="180">
      </el-table-column>
      <el-table-column
        prop="operation"
        label="执行的SQL">
        <template slot-scope="scope">
            <el-tooltip :content="scope.row.operation" placement="top">
                <span style="cursor:pointer;">{{scope.row.operation|cutout}}</span>
            </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        prop="time"
        label="开始执行时间"
        max-width="300">
      </el-table-column>
      <el-table-column
        prop="status"
        label="当前状态"
        max-width="100">
      </el-table-column>
      <el-table-column
        prop="elapsedTime"
        label="耗时(ms)"
        sortable
        width="100">
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next, sizes, jumper"
      @size-change="changeSize"
      @current-change="currentPage"
      :total="100">
    </el-pagination>
  </div>
</template>
<script>
import SelectTime from '../../tongji/selectTime/selectTime.vue'
export default {
  data(){
    return {
        name: null,
        names: [
            {
                label: '秋意浓',
                value: '1'
            },
            {
                label: '袁隆平',
                value: '2'
            },
            {
                label: '曾祥',
                value: '3'
            },
            {
                label: '钱鹏飞',
                value: '4'
            }
        ],
        tableData: [
            {
                name: '张顺天',
                connect: 'connect1',
                operation: 'Select * from table1',
                time: '2018-06-16 15:38',
                status: '正在执行',
                elapsedTime: '638'
            },
            {
                name: '张顺天',
                connect: 'connect1',
                operation: 'Select * from table1',
                time: '2018-06-16 15:38',
                status: '正在执行',
                elapsedTime: '752'
            },
            {
                name: '张顺天',
                connect: 'connect1',
                operation: 'Select * from table1',
                time: '2018-06-16 15:38',
                status: '正在执行',
                elapsedTime: '649'
            },
            {
                name: '张顺天',
                connect: 'connect1',
                operation: 'Select * from table1',
                time: '2018-06-16 15:38',
                status: '正在执行',
                elapsedTime: '356'
            },
            {
                name: '张顺天',
                connect: 'connect1',
                operation: 'Select * from table1',
                time: '2018-06-16 15:38',
                status: '正在执行',
                elapsedTime: '455'
            },
            {
                name: '张顺天',
                connect: 'connect1',
                operation: 'Select * from table1',
                time: '2018-06-16 15:38',
                status: '正在执行',
                elapsedTime: '777'
            },
            {
                name: '张顺天',
                connect: 'connect1',
                operation: 'Select * from table1',
                time: '2018-06-16 15:38',
                status: '正在执行',
                elapsedTime: '888'
            },
            {
                name: '张顺天',
                connect: 'connect1',
                operation: 'Select * from table1',
                time: '2018-06-16 15:38',
                status: '正在执行',
                elapsedTime: '999'
            },
        ]
    }
  },
  components:{
    SelectTime
  },
  props:{},
  created() {},
  watch:{},
  computed:{},
  methods:{
    switchData(val) {
        console.log('122111')
        this.$emit('changeData',val)
    },
    changeSize(val) {
      console.log('changeSize', val)
    },
    currentPage(val) {
      console.log('currentPage', val)
    }
  },
  mounted() {},
  filters: {
      cutout: function(value) {
          if(value.length>13){
              return value.slice(0,13) + '...'
          }else{
              return value
          }
      }
  },
}
</script>
<style lang="scss" scoped>
    .soft_shenji_msql{
        padding: 15px 32px;
        .header{
            margin-bottom: 20px;
        }
        .selectBox{
            width: 109px;
            height: 32px;
            margin-right: 18px;
        }
        .input{
            width: 396px;
            padding: 0 10px;
            height: 32px;
            background-color: #25262A;
            margin-right: 4px;
            background:rgba(37,38,42,1);
            border-radius:4px;
            border:1px solid rgba(235,235,235,0.15);
        }
        .el-pagination{
            float: right;
            margin-top: 15px;
        }
        .popper__arrow::after {
            background-color: rgba(0,0,0,0) !important;
            border-bottom-color: #444 !important;
            top: 0px !important;
        }
    }
</style>