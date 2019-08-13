<template>
  <div class="soft_shenji_hdsj">
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
        prop="type"
        label="类型"
        max-width="180">
      </el-table-column>
      <el-table-column
        prop="operation"
        label="操作">
      </el-table-column>
      <el-table-column
        prop="time"
        label="时间"
        max-width="300">
      </el-table-column>
      <el-table-column
        prop="result"
        label="结果"
        width="100">
      </el-table-column>
      <el-table-column
        prop="dangerLevel"
        label="危险等级"
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
                type: '项目',
                operation: '推出AA项目',
                time: '2018-06-16 15:38',
                result: '成功',
                dangerLevel: '无'
            },
            {
                name: '张顺天',
                type: '项目',
                operation: '推出AA项目',
                time: '2018-06-16 15:38',
                result: '成功',
                dangerLevel: '无'
            },
            {
                name: '张顺天',
                type: '项目',
                operation: '推出AA项目',
                time: '2018-06-16 15:38',
                result: '成功',
                dangerLevel: '无'
            },
            {
                name: '张顺天',
                type: '项目',
                operation: '推出AA项目',
                time: '2018-06-16 15:38',
                result: '成功',
                dangerLevel: '无'
            },
            {
                name: '张顺天',
                type: '项目',
                operation: '推出AA项目',
                time: '2018-06-16 15:38',
                result: '成功',
                dangerLevel: '无'
            },
            {
                name: '张顺天',
                type: '项目',
                operation: '推出AA项目',
                time: '2018-06-16 15:38',
                result: '成功',
                dangerLevel: '无'
            },
            {
                name: '张顺天',
                type: '项目',
                operation: '推出AA项目',
                time: '2018-06-16 15:38',
                result: '成功',
                dangerLevel: '无'
            },
            {
                name: '张顺天',
                type: '项目',
                operation: '推出AA项目',
                time: '2018-06-16 15:38',
                result: '成功',
                dangerLevel: '无'
            }
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
  mounted() {}
}
</script>
<style lang="scss" scoped>
    .soft_shenji_hdsj{
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
            border-bottom-color: #444 !important;
            top: 0px !important;
        }
    }
</style>