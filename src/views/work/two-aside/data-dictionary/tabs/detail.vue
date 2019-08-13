<template>
  <div class="data_dictionary_detail" v-loading="loading">
    <div class="title">
      <span class="fl">连接：{{}}</span>
      <span class="fr">表：{{}}</span>
    </div>
    <div class="da_table">
      <el-table :data="tableData" @row-click="rowClick" max-height="400" tooltip-effect="dark" style="width: 100%">
        <el-table-column label="字段名" min-width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="类型" min-width="120"></el-table-column>
        <el-table-column prop="name" label="长度"></el-table-column>
        <el-table-column prop="name" label="小数点"></el-table-column>
        <el-table-column prop="name" label="不为null"></el-table-column>
        <el-table-column prop="name" label="键"></el-table-column>
        <el-table-column prop="address" label="注释"></el-table-column>
      </el-table>
    </div>
    <div class="common" v-if="shouCom">
      <div class="com_list" v-for="item,i in comList" :key="i">
        <div class="avatar mini"></div>
        <el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">
          <span class="span1 to">{{item.name}}</span>
        </el-tooltip>
        <span class="span2">{{item.time}}</span>
        <el-tooltip class="item" effect="dark" content="这个字段ID时从100开始,必须大于0" placement="top-start">
          <span class="span3 to">{{item.com}}</span>
        </el-tooltip>
      </div>
    </div>
    <div class="sub_com" v-if="shouCom">
      <el-input v-model="addCom" type="textarea" placeholder="追加评论..." size="mini"></el-input>
      <el-button type="black" size="mini" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      pageList: state => state.work.pageList,
      pageCurrent: state => state.work.pageCurrent
    })
  },
  watch: {
    pageCurrent(val) {
      if (val.zdId) {
        //是数据字典的页面
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
        }, 300);
      }
    }
  },
  data() {
    return {
      loading: false,
      shouCom: false,
      addCom: "",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      comList: [
        {
          name: "海洋zzzzzzzzz哥哥",
          time: "2019-02-27",
          com: "这个字段ID时从100开始，必须大于0"
        },
        {
          name: "海洋zzzzzzzzz哥哥",
          time: "2019-02-27",
          com: "这个字段ID时从100开始，必须大于0"
        },
        {
          name: "海洋zzzzzzzzz哥哥",
          time: "2019-02-27",
          com: "这个字段ID时从100开始，必须大于0"
        },
        {
          name: "海洋zzzzzzzzz哥哥",
          time: "2019-02-27",
          com: "这个字段ID时从100开始，必须大于0"
        },
        {
          name: "海洋zzzzzzzzz哥哥",
          time: "2019-02-27",
          com: "这个字段ID时从100开始，必须大于0"
        },
        {
          name: "海洋zzzzzzzzz哥哥",
          time: "2019-02-27",
          com: "这个字段ID时从100开始，必须大于0"
        },
        {
          name: "海洋zzzzzzzzz哥哥",
          time: "2019-02-27",
          com: "这个字段ID时从100开始，必须大于0"
        }
      ]
    };
  },

  methods: {
    /**
     * @description 提交评论
     * @param
     */
    submit() {
      if (this.addCom == "") {
        this.$message.error("评论不能为空");
        return false;
      }
    },
    /**
     * @description 点击单元格某一行
     * @param 
     */
    rowClick(row, column, event) {
      //点击某一行显示评论,加载评论数据
      this.shouCom = true
    }
  },

  created() {}
};
</script>

<style lang='scss'>
@import "../index.scss";
</style>
