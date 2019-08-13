<template>
  <div class="operation_history">
    <div class="title">
      <div class="fl">
        操作历史
        <el-tooltip class="item" effect="dark" content="保留近三天操作记录" placement="right-start">
          <i class="el-icon-question"></i>
        </el-tooltip>
      </div>
      <div class="fr" title="刷新" @click="refreData">
        <i class="iconfont daiosshuaxin"></i>
      </div>
    </div>
    <div class="total">
      <div class="total_item history_total_bg">{{totalNum[0]}}</div>
      <div class="total_item history_total_bg">{{totalNum[1]}}</div>
      <div class="total_item history_total_bg">{{totalNum[2]}}</div>
      <div class="total_item history_total_bg">{{totalNum[3]}}</div>
      <div class="last">
        <p>近三天</p>
        <p>事件总数</p>
      </div>
    </div>
    <div class="onetotal">
      <div class="onetotal_item fl">
        <p>操作失败</p>
        <p style="color:#df1a1a">{{failOperateCount}}</p>
      </div>
      <div class="onetotal_item fl">
        <p>操作中断</p>
        <p style="color:#ff9900">{{interruptOperateCount}}</p>
      </div>
      <div class="onetotal_item fl">
        <p>操作成功</p>
        <p style="color:#2cd683">{{successOperateCount}}</p>
      </div>
    </div>
    <div class="filter">
      <el-input v-model="inputFilter" @keyup.enter.native="filterEnter(inputFilter)" size="mini"></el-input>
      <div class="data_tree_filter data_filter" @click="filter"></div>
    </div>
    <div v-loading="loading" class="history_list">
      <div class="one_title">
        <div class="fl">近一小时</div>
        <div class="fr hand" style="cursor: pointer;" @click="firstLoadOneHour">
          全部
          <i v-show="!isoneHourData" class="el-icon-caret-bottom"></i>
          <i v-show="isoneHourData" class="el-icon-caret-top"></i>
        </div>
      </div>
      <div class="one_hour" v-show="isoneHourData">
        <div
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="oneHourBusy"
          infinite-scroll-distance="10"
        >
          <div v-for="item,i in oneHourData" :key="i" class="load_item">
            <div class="load_top">
              <i
                class="i-circle"
                style="margin-bottom:10px"
                :class="{'bd-green': item.executeRes=='SUCCESS','bd-yellow': item.executeRes=='INTERRUPT','bd-red': item.executeRes=='FAIL'}"
              ></i>
              <el-tooltip
                class="item"
                effect="dark"
                :content="item.executeSql"
                placement="top-start"
              >
                <span class="to" style="display:inline-block;width:150px">{{item.executeSql}}</span>
              </el-tooltip>
              <!-- <span class="to" style="display:inline-block;width:150px">{{item.executeSql}}</span> -->
              <span class="fr" style="color: #666;">{{item.time}}</span>
            </div>
            <!-- <div class="load_bottom">操作结果：{{item.executeRes}}</div> -->
          </div>
        </div>
      </div>
      <div class="null_data" v-if="oneHourData.length==0">近一小时您没有操作数据哦</div>
      <div class="one_title">
        <div class="fl">最近一天</div>
        <div class="fr hand" style="cursor: pointer;" @click="firstLoadOneDay">
          全部
          <i v-show="!isoneDayData" class="el-icon-caret-bottom"></i>
          <i v-show="isoneDayData" class="el-icon-caret-top"></i>
        </div>
      </div>
      <div class="one_day" v-show="isoneDayData">
        <div
          v-infinite-scroll="loadMoreOneDay"
          infinite-scroll-disabled="oneDayBusy"
          infinite-scroll-distance="10"
        >
          <div v-for="item,i in oneDayData" :key="i" class="load_item">
            <div class="load_top">
              <i
                class="i-circle"
                :class="{'bd-green': item.executeRes=='SUCCESS','bd-yellow': item.executeRes=='INTERRUPT','bd-red': item.executeRes=='FAIL'}"
                style="margin-bottom:10px"
              ></i>
              <el-tooltip
                class="item"
                effect="dark"
                :content="item.executeSql"
                placement="top-start"
              >
                <span class="to" style="display:inline-block;width:150px">{{item.executeSql}}</span>
              </el-tooltip>
              <span class="fr" style="color: #666;">{{item.time}}</span>
            </div>
            <!-- <div class="load_bottom">操作结果：{{item.executeRes}}</div> -->
          </div>
        </div>
      </div>
      <div class="null_data" v-if="oneDayData.length==0">近一天您没有操作数据哦</div>
      <div class="one_title">
        <div class="fl">最近三天</div>
        <div class="fr hand" style="cursor: pointer;" @click="firstLoadThreeDay">
          全部
          <i v-show="!isthreeDayData" class="el-icon-caret-bottom"></i>
          <i v-show="isthreeDayData" class="el-icon-caret-top"></i>
        </div>
      </div>
      <div class="three_day" v-show="isthreeDayData">
        <div
          v-infinite-scroll="loadMoreThreeDay"
          infinite-scroll-disabled="threeDayBusy"
          infinite-scroll-distance="10"
        >
          <div v-for="item,i in threeDayData" :key="i" class="load_item">
            <div class="load_top">
              <i
                class="i-circle"
                :class="{'bd-green': item.executeRes=='SUCCESS','bd-yellow': item.executeRes=='INTERRUPT','bd-red': item.executeRes=='FAIL'}"
                style="margin-bottom:10px"
              ></i>
              <el-tooltip
                class="item"
                effect="dark"
                :content="item.executeSql"
                placement="top-start"
              >
                <span class="to" style="display:inline-block;width:150px">{{item.executeSql}}</span>
              </el-tooltip>
              <span class="fr" style="color: #666;">{{item.time}}</span>
            </div>
            <!-- <div class="load_bottom">操作结果：{{item.executeRes}}</div> -->
          </div>
        </div>
      </div>
      <div class="null_data" v-if="threeDayData.length==0">近三天您没有操作数据哦</div>
    </div>

    <!-- 筛选弹框 -->
    <filterDialogForm
      :dialog="filterDialog"
      v-on:closeDialog="closeFilterDialogForm"
      v-on:clickSubmit="clickSubmit"
    ></filterDialogForm>
  </div>
</template>

<script>
import Store from "store";
import filterDialogForm from "./components/history.dialog";
export default {
  components: {
    filterDialogForm
  },
  data() {
    return {
      loading: false,
      filterDialog: false,
      inputFilter: "",
      oneHourData: [],
      isoneHourData: true,
      oneHourBusy: false,
      oneHourCurrentPage: 1,
      oneHourpageSize: 10,
      oneHourcondition: "",
      oneHourtype: "",
      oneDayData: [],
      isoneDayData: false,
      oneDayBusy: false,
      oneDayCurrentPage: 1,
      oneDaypageSize: 4,
      oneDaycondition: "",
      oneDaytype: "",
      threeDayData: [],
      isthreeDayData: false,
      threeDayBusy: false,
      threeDayCurrentPage: 1,
      threeDaypageSize: 4,
      threeDaycondition: "",
      threeDaytype: "",
      totalNum: [],
      failOperateCount: 0,
      successOperateCount: 0,
      interruptOperateCount: 0
    };
  },

  methods: {
    /**
     * @description 根据用户id获取近三天操作数量
     * @param {userId}
     */
    getUserHistoryNum() {
      this.loading = true;
      this.$api.user.history
        .getUserHistoryNum(Store.get("userData").userId)
        .then(res => {
          if (res.resCode == 10000) {
            this.totalNum = [];
            this.failOperateCount = res.data.failOperateCount;
            this.successOperateCount = res.data.successOperateCount;
            this.interruptOperateCount = res.data.interruptOperateCount;
            let num = this.add0(res.data.totalNum, 4);
            for (let n = 0; n < num.length; n++) {
              let i = num[n];
              this.totalNum.push(i);
            }
            console.log(num, this.totalNum);
            this.loading = false;
          } else {
            this.$message.error(res.resMsg);
            this.loading = false;
          }
        });
    },
    /**
     * @description 总条数补零
     * @param
     */
    add0(num, length) {
      for (var len = (num + "").length; len < length; len = num.length) {
        num = "0" + num;
      }
      return num;
    },

    /**
     * @description 根据用户id获取最后一小时用户历史记录列表
     * @param
     */
    loadOneHour() {
      let params = {
        userId: Store.get("userData").userId,
        pageSize: this.oneHourpageSize,
        currentPage: this.oneHourCurrentPage,
        condition: this.oneHourcondition,
        type: this.oneHourtype
      };
      //console.log("一小时参数", params);
      this.$api.user.history.getUserHistory_hour_one(params).then(res => {
        if (res.resCode == 10000) {
          for (let i = 0; i < res.data.historyList.rows.length; i++) {
            const element = res.data.historyList.rows[i];
            this.oneHourData.push(element);
          }
          if (this.oneHourData.length == 0) {
            this.isoneHourData = false;
          }
        } else {
          this.$message.error(res.resMsg);
        }
      });
    },
    /**
     * @description 根据用户id获取最后一天用户历史记录列表
     * @param
     */
    loadOneDay() {
      let params = {
        userId: Store.get("userData").userId,
        pageSize: this.oneDaypageSize,
        currentPage: this.oneDayCurrentPage,
        condition: this.oneDaycondition,
        type: this.oneDaytype
      };
      //console.log("一天参数", params);
      this.$api.user.history.getUserHistory_Day_one(params).then(res => {
        if (res.resCode == 10000) {
          for (let i = 0; i < res.data.historyList.rows.length; i++) {
            const element = res.data.historyList.rows[i];
            this.oneDayData.push(element);
          }
        } else {
          this.$message.error(res.resMsg);
        }
      });
    },
    /**
     * @description 根据用户id获取最后三天用户历史记录列表
     * @param
     */
    loadThreeDay() {
      let params = {
        userId: Store.get("userData").userId,
        pageSize: this.threeDaypageSize,
        currentPage: this.threeDayCurrentPage,
        condition: this.threeDaycondition,
        type: this.threeDaytype
      };
      //console.log("三天参数", params);
      this.$api.user.history.getUserHistory_Day_Three(params).then(res => {
        if (res.resCode == 10000) {
          for (let i = 0; i < res.data.historyList.rows.length; i++) {
            const element = res.data.historyList.rows[i];
            this.threeDayData.push(element);
          }
        } else {
          this.$message.error(res.resMsg);
        }
      });
    },
    /**
     * @description 第一次点击一小时全部加载
     * @param
     */
    firstLoadOneHour() {
      this.isoneHourData = !this.isoneHourData;
      this.oneHourCurrentPage = 2;
      this.oneHourpageSize = 6;
      this.loadOneHour();
    },
    /**
     * @description 第一次点击一天全部加载
     * @param
     */
    firstLoadOneDay() {
      this.isoneDayData = !this.isoneDayData;
      this.oneDayCurrentPage = 2;
      this.oneDaypageSize = 6;
      this.loadOneDay();
    },
    /**
     * @description 第一次点击三天全部加载
     * @param
     */
    firstLoadThreeDay() {
      this.isthreeDayData = !this.isthreeDayData;
      this.threeDayCurrentPage = 2;
      this.threeDaypageSize = 6;
      this.loadThreeDay();
    },
    /**
     * @description 一小时加载数据
     * @param
     */
    loadMore() {
      this.oneHourBusy = false;
      setTimeout(() => {
        this.oneHourCurrentPage++;
        this.loadOneHour();
        this.oneHourBusy = false;
      }, 1000);
    },
    /**
     * @description 一天加载数据
     * @param
     */
    loadMoreOneDay() {
      this.oneDayBusy = false;

      setTimeout(() => {
        this.oneDayCurrentPage++;
        this.loadOneDay();
        this.oneDayBusy = false;
      }, 1000);
    },
    /**
     * @description 三天加载数据
     * @param
     */
    loadMoreThreeDay() {
      this.threeDayBusy = false;
      setTimeout(() => {
        this.threeDayCurrentPage++;
        this.loadThreeDay();
        this.threeDayBusy = false;
      }, 1000);
    },
    /**
     * @description 打开筛选弹框
     * @param
     */
    filter() {
      this.filterDialog = true;
    },
    /**
     * @description 筛选回车事件
     * @param
     */
    filterEnter(data) {
      this.oneHourtype = "";
      this.oneDaytype = "";
      this.threeDaytype = "";
      this.oneHourcondition = "";
      this.oneDaycondition = "";
      this.threeDaycondition = "";
      this.oneHourCurrentPage = 1;
      this.oneDayCurrentPage = 1;
      this.threeDayCurrentPage = 1;
      this.oneHourcondition = data;
      this.oneDaycondition = data;
      this.threeDaycondition = data;
      this.filterRefreData();
    },
    /**
     * @description 监听关闭弹框
     * @param
     */
    closeFilterDialogForm(data) {
      this.filterDialog = data;
    },
    /**
     * @description 监听弹框确认
     * @param
     */
    clickSubmit(data) {
      this.oneHourtype = "";
      this.oneDaytype = "";
      this.threeDaytype = "";
      this.oneHourcondition = "";
      this.oneDaycondition = "";
      this.threeDaycondition = "";
      this.oneHourCurrentPage = 1;
      this.oneDayCurrentPage = 1;
      this.threeDayCurrentPage = 1;
      //获取选项，开始帅选
      this.oneHourtype = data;
      this.oneDaytype = data;
      this.threeDaytype = data;
      this.filterRefreData();
      this.filterDialog = false;
    },
    /**
     * @description 刷新
     * @param
     */
    refreData() {
      this.oneHourtype = "";
      this.oneDaytype = "";
      this.threeDaytype = "";
      this.oneHourcondition = "";
      this.oneDaycondition = "";
      this.threeDaycondition = "";
      this.oneHourCurrentPage = 1;
      this.oneDayCurrentPage = 1;
      this.threeDayCurrentPage = 1;
      this.oneHourData = [];
      this.oneDayData = [];
      this.threeDayData = [];
      this.getUserHistoryNum();
      this.loadOneHour();
      this.loadOneDay();
      this.loadThreeDay();
    },
    /**
     * @description 帅选刷新
     * @param
     */
    filterRefreData() {
      this.oneHourData = [];
      this.oneDayData = [];
      this.threeDayData = [];
      this.loadOneHour();
      this.loadOneDay();
      this.loadThreeDay();
    }
  },

  created() {
    this.getUserHistoryNum();
    this.loadOneHour();
    this.loadOneDay();
    this.loadThreeDay();
  }
};
</script>

<style lang='scss'>
@import "./index.scss";
</style>
v-infinite-scroll="loadMore"表示回调函数是loadMore
infinite-scroll-disabled="busy"表示由变量busy决定是否执行loadMore，false则执行loadMore，true则不执行，看清楚，busy表示繁忙，繁忙的时候是不执行的。
infinite-scroll-distance="10"这里10决定了页面滚动到离页尾多少像素的时候触发回调函数，10是像素值。通常我们会在页尾做一个几十像素高的“正在加载中...”，这样的话，可以把这个div的高度设为infinite-scroll-distance的值即可。
其他选项：
infinite-scroll-immediate-check   默认值为true，该指令意思是，应该在绑定后立即检查busy的值和是否滚动到底。如果你的初始内容高度不够高、不足以填满可滚动的容器的话，你应设为true，这样会立即执行一次loadMore，会帮你填充一些初始内容。
infinite-scroll-listen-for-event  当事件在Vue实例中发出时，无限滚动将再次检查。
infinite-scroll-throttle-delay    检查busy的值的时间间隔，默认值是200，因为vue-infinite-scroll的基础原理就是，vue-infinite-scroll会循环检查busy的值，以及是否滚动到底，只有当：busy为false且滚动到底，回调函数才会执行。
