<template>
  <div style="height:100%;padding:10px;">
    <div class="wrapCard">
      <line-chart title="用户在线统计" color="#2E5FB8" :data="data1" class="box" @changeData="getStatisticsData"></line-chart>
      <line-chart title="用户查询总量" color="#0EA0A7" :data="data2" class="box" @changeData="getQueryData"></line-chart>
    </div>
    <div class="wrapCard" style="margin-top:10px;">
      <ranking-list title="活跃用户Top10" columnName="用户名" :data="data3" class="box miniBox" @changeData="getActiveUser"></ranking-list>
      <ranking-list title="常用表Top10" columnName="表名" :data="data3" class="box miniBox" @changeData="getCommonTable"></ranking-list>
    </div>
  </div>
</template>

<script>
import LineChart from "../lineChart/lineChart.vue";
import RankingList from "../rankingList/rankingList.vue"
export default {
  data () {
    return {
      data1: {
        xData: [1,2,3,4,5,6],
        yData: [30,50,40,20,30]
      },
      data2: {
        xData: ['s','n','m','l','p','o'],
        yData: [90,110,130,120,80,100]
      },
      data3: [
        {
          name: '李小鹏',
          number: 5532,
          id: 1
        },
        {
          name: '李小鹏',
          number: 5532,
          id: 2
        },
        {
          name: '李小鹏',
          number: 5532,
          id: 3
        },
        {
          name: '李小鹏',
          number: 5532,
          id: 4
        },
        {
          name: '李小鹏',
          number: 5532,
          id: 5
        },
        {
          name: '李小鹏',
          number: 5532,
          id: 6
        },
        {
          name: '李小鹏',
          number: 5532,
          id: 7
        },
        {
          name: '李小鹏',
          number: 5532,
          id: 8
        },
        {
          name: '李小鹏',
          number: 5532,
          id: 9
        },
        {
          name: '李小鹏',
          number: 5532,
          id: 10
        }
      ]
    }
  },
  components: {
      LineChart,
      RankingList
  },
  methods: {
    getStatisticsData(val) {
      console.log('1111')
      this.data1 = {
        xData: [8,9,10,11,12,13],
        yData: [80,68,76,85,77,80]
      }
    },
    getQueryData(val) {
      console.log('2222')
    },
    getActiveUser(val) {
      console.log('333333')
      this.data3 = [
        {
          name: '111',
          number: 6788,
          id: 33
        }
      ]
    },
    getCommonTable(val) {
      console.log('44444')
    }
  },
  created () {
  }
}
</script>

<style lang='scss'>
  .box{
    width: 49.5%;
    height: 300px;
    padding: 10px;
    background-color: #202229;
  }
  .wrapCard{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  @media screen and (max-width: 1366px) {
    .miniBox{
      width: 100%;
      margin-bottom: 10px;
    }
  }
</style>
