<template>
  <div class="full" style="height:58%">
    <el-tabs
      class="full res_top_tab"
      ref="resTabletab"
      @tab-click="tabClick"
      v-model="activeName"
      type="card"
    >
      <el-tab-pane class="full" label="运行日志" name="first">
        <div class="res_infos_log" style="margin-top:10px">
          <div v-for="item,i in resMsgList" class="item" :key="i">{{item.msg}}</div>
        </div>
        <footerStatus :toolsData="resultData[0]"></footerStatus>
      </el-tab-pane>
      <template v-if="resultData.length>0">
        <el-tab-pane
          ref="resTable"
          class="full"
          :label="'结果集(' + (index+1) + ')'"
          v-for="(item,index) in resultData"
          :key="index"
          :name="index + ''"
        >
          <div
            id="hotTable"
            class="hotTable"
            v-show="resultData[index].hotSettings.data.length>0"
            style="overflow:hidden;position:relative;width:100%;margin-bottom:35px;"
          >
            <HotTable
              :root="root+index"
              ref="hotTableComponent"
              :settings="resultData[index].hotSettings"
              class="result_table"
            ></HotTable>
          </div>
          <div v-show="resultData[index].hotSettings.data.length==0" style="padding:20px">该结果集暂无数据</div>
          <div style=" position: relative;">
            <footerTools
              v-on:updataRes="updataRes"
              v-on:updateResultTable="updateResultTable"
              :toolsData="resultData[index]"
            ></footerTools>
          </div>
          <div style=" position: relative;">
            <footerStatus :toolsData="resultData[index]"></footerStatus>
          </div>
        </el-tab-pane>
      </template>
    </el-tabs>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import Store from "store";
import { HotTable } from "@handsontable/vue";
import footerTools from "./components/result-bottom-tools/res.footer.tools";
import footerStatus from "./components/result-bottom-tools/res.footer.status";
export default {
  computed: {
    ...mapState({
      pageCurrent: state => state.work.pageCurrent,
      reSizeResTable: state => state.work.reSizeResTable
    })
  },
  watch: {
    reSizeResTable(val) {
      if (val) {
        console.log("自适应");
        setTimeout(() => {
          if (this.isSourt) {
          } else {
            this.reSize();
            this.isSourt = false;
          }
        }, 100);
      } else {
      }
    }
  },
  data: function() {
    return {
      websock: null,
      activeName: "0",
      root: "text",
      resultData: [], //结果集数据
      resMsgList: [],
      style: "",
      isSourt: false,
      hotSettings: {
        colHeaders: ["id", "name", "id", "name", "id", "name", "a"],
        data: [],
        licenseKey: "non-commercial-and-evaluation",
        resultMune: null,
        resultButoon: true,
        resultState: true,
        autoColumnSize: true,
        // fillHandle:true,
        // excuteTime: 173,
        // colWidths: 100,
        width: "100%",
        height: 320,
        rowHeights: 23,
        executeSentence: null,
        // columns: [
        //   {
        //     type: "text",
        //     readOnly: true
        //   },
        //   {
        //     type: "text",
        //     readOnly: true
        //   },
        //   {
        //     type: "text",
        //     readOnly: true
        //   },
        //   {
        //     type: "text",
        //     readOnly: true
        //   }
        // ],

        // search: true,
        // startRows: 11, //行列范围
        // startCols: 6,//开始列
        minRows: 10, //最小行列
        // minCols: 1,
        // maxRows: 28, //最大行列
        // maxCols: 20,
        // readOnly:true,
        rowHeaders: true, //行表头，可以使布尔值（行序号），可以使字符串（左侧行表头相同显示内容，可以解析html），也可以是数组（左侧行表头单独显示内容）。
        // colHeaders: [
        //   "题目",
        //   "<span style='color:red'>aa</span><i class='el-icon-video-camera-solid'></i>",
        //   "B选项",
        //   "C选项",
        //   "D选项",
        //   "答案"
        // ], //自定义列表头or 布尔值

        // minSpareCols: 2, //列留白
        // minSpareRows: 2, //行留白
        currentRowClassName: "currentRow", //为选中行添加类名，可以更改样式
        copyPaste: false,
        currentColClassName: "currentCol", //为选中列添加类名
        autoWrapRow: true, //自动换行
        // contextMenu: {
        //   //自定义右键菜单，可汉化，默认布尔值
        //   items: {
        //     row_above: {
        //       name: "上方插入一行"
        //     },
        //     row_below: {
        //       name: "下方插入一行"
        //     },
        //     col_left: {
        //       name: "左方插入列"
        //     },
        //     col_right: {
        //       name: "右方插入列"
        //     },
        //     hsep1: "---------", //提供分隔线
        //     remove_row: {
        //       name: "删除行"
        //     },
        //     remove_col: {
        //       name: "删除列"
        //     },
        //     make_read_only: {
        //       name: "只读"
        //     }
        //   }
        // },
        manualColumnFreeze: true, //手动固定列
        manualColumnMove: true, //手动移动列
        manualRowMove: true, //手动移动行
        manualColumnResize: true, //手工更改列距
        manualRowResize: true, //手动更改行距
        // comments: true, //添加注释
        // cell: [{ row: 1, col: 1, comment: { value: "this is test" } }],
        customBorders: [], //添加边框
        columnSorting: true, //排序
        stretchH: "all", //根据宽度横向扩展，last:只扩展最后一列，none：默认不扩展<div class=""></div>
        afterChange: function(changes, source) {
          //数据改变时触发此方法
          //console.log(this.getData());
        }
      }
    };
  },
  components: {
    HotTable,
    footerTools,
    footerStatus
  },
  created() {},
  destroyed() {
    //console.log("close");
    this.websock.close(); //离开路由之后断开websocket连接
  },
  mounted() {
    let box = document.querySelector("#HandsontableCopyPaste");
    box.parentNode.removeChild(box);
  },
  methods: {
    /**
     * @description 点击tab页
     * @param
     */
    tabClick(tab) {
      // //console.log(tab);
      // //console.log(this.activeName);
      // //console.log(this.$refs.hotTableComponent);
      if (this.activeName != "first") {
        //console.log("close");
        this.websock.close();
      }
    },
    /**
     * @description 初始化结果集数据
     * @param
     */
    loadData(data) {
      // //console.log(this.$refs.hotTableComponent);
      if (this.$refs.hotTableComponent !== undefined) {
        //需要更新表格
        console.log("需要更新表格");
        this.resultData = [];
        setTimeout(() => {
          this.loadResult(data);
        }, 300);
        return false;
      }
      this.loadResult(data);
    },
    /**
     * @description 初始化结果集
     * @param
     */
    loadResult(data) {
      console.log("初始化结果集");
      this.$store.commit("reSizeResTable", false);
      let self = this;
      let _data = _.cloneDeep(data);
      let arr = [];
      for (let i = 0; i < _data.length; i++) {
        let element = _data[i];
        let obj = {};

        obj = {
          updateRowData: [],
          deleteRowData: [],
          columnsInfo: element.columnInfo,
          pkNameList: element.pkName,
          total: element.total,
          pages: element.pages,
          currentPage: element.currentPage,
          executeSentence: element.executeSentence,
          excuteTime: element.excuteTime,
          leadOutResult: element.leadOutResult,
          resultButoon: element.resultButoon,
          resultState: element.resultState,
          hotSettings: {
            colHeaders: element.hotSettings.colHeaders,
            data: element.hotSettings.data,
            columns: element.hotSettings.columns,
            // columns: [
            //   { data: "id", type: "text", readOnly: true },
            //   {
            //     data: "name",
            //     type: "text",
            //     readOnly: true
            //   },
            //   {
            //     data: "address",
            //     type: "text",
            //     readOnly: false
            //   }
            // ],
            licenseKey: "non-commercial-and-evaluation",
            resultMune: null,
            resultButoon: true,
            resultState: true,
            autoColumnSize: true,
            width: "100%",
            height: 300,
            rowHeights: 23,
            executeSentence: null,
            minRows: 0,
            rowHeaders: true,
            copyPaste: false,
            autoWrapRow: true,
            readOnly: false,
            manualColumnFreeze: true, //手动固定列
            manualColumnMove: true, //手动移动列
            manualRowMove: true, //手动移动行
            manualColumnResize: true, //手工更改列距
            manualRowResize: true, //手动更改行距
            customBorders: [], //添加边框
            columnSorting: true, //排序
            stretchH: "all",
            contextMenu: {
              //自定义右键菜单，可汉化，默认布尔值
              items: {
                row_above: {
                  name: "上方插入一行"
                },
                row_below: {
                  name: "下方插入一行"
                },
                // col_left: {
                //   name: "左方插入列"
                // },
                // col_right: {
                //   name: "右方插入列"
                // },
                hsep1: "---------", //提供分隔线
                remove_row: {
                  name: "删除行"
                }
                // remove_col: {
                //   name: "删除列"
                // },
                // make_read_only: {
                //   name: "只读"
                // }
              }
            },
            //监听数据数据修改后
            afterChange: function(changes, source) {
              //数据改变时触发此方法
              //获取增加或修改的数据
              if (changes) {
                console.log(changes);
                let newCgange = _.cloneDeep(changes);
                let rowIndex = newCgange[0][0];
                let colunName = newCgange[0][1];
                let oldColum = newCgange[0][2];
                let newColum = newCgange[0][3];
                // //console.log(this.getSourceDataAtRow(rowIndex));
                if (oldColum == newColum) {
                } else {
                  obj.updateRowData = [this.getSourceDataAtRow(rowIndex)];
                  //console.log(newCgange);
                  let columns =
                    self.resultData[self.activeName].hotSettings.columns;
                  for (let i = 0; i < columns.length; i++) {
                    let element = columns[i];
                    if (element.readOnly) {
                    } else {
                      element.readOnly = true;
                    }
                  }
                }
              }
            },
            beforeRemoveRow: function(index, amount, physicalRows, source) {
              if (index || amount || physicalRows || source) {
                obj.deleteRowData = [this.getSourceDataAtRow(index)];
                let columns =
                  self.resultData[self.activeName].hotSettings.columns;
                for (let i = 0; i < columns.length; i++) {
                  let element = columns[i];
                  if (element.readOnly) {
                  } else {
                    element.readOnly = true;
                  }
                }
              }
              // //console.log(index,amount,physicalRows,source)
              //监听删除操作
              // //console.log(this.getSourceDataAtRow(index));
              // // //console.log(this.getDataAtRow(index));
              //  obj.deleteRowData.push(this.getSourceDataAtRow(index))
            },
            afterCreateRow: function(index, amount, source) {
              if (index || amount || source) {
                //监听添加一行，但是没什么卵用，目前
              }
            },
            beforeColumnSort: function(
              currentSortConfig,
              destinationSortConfigs
            ) {
              if (currentSortConfig || destinationSortConfigs) {
                //监听排序
                console.log("排序触发了");
                self.isSourt = true;
              }
            }
          }
        };
        arr.push(obj);
      }
      this.resultData = arr;
    },
    /**
     * @description 每次执行之后清除上一次日志信息
     * @param
     */
    clearresMsgList() {
      this.resMsgList = [];
    },
    /**
     * @description 初始化wensocket
     * @param
     */
    initWebSocket() {
      this.resMsgList = [];
      //初始化weosocket
      let wsuri;
      if (process.env.NODE_ENV == "development") {
        // wsuri = `ws://${window.location.hostname}:8080/dms/echo`;
        wsuri = `ws://cq214.holytoolz.com:8080/dms/echo`;
      } else if (process.env.NODE_ENV == "production") {
        wsuri = `ws://${window.location.hostname}:8080/dms/echo`;
      }
      this.websock = new WebSocket(wsuri);
      //数据接收
      this.websock.onmessage = this.websocketonmessage;
      //连接建立之后执行send方法发送数据
      // this.websock.onopen = this.websocketonopen;
      //连接建立失败重连
      this.websock.onerror = this.websocketonerror;
      //关闭
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen() {
      //连接建立之后执行send方法发送数据
      let actions = { test: "12345" };
      this.websocketsend(JSON.stringify(actions));
    },
    websocketonerror() {
      //连接建立失败重连
      // this.initWebSocket();
    },
    websocketonmessage(e) {
      //数据接收
      const redata = JSON.parse(e.data);
      //console.log(redata);
      setTimeout(() => {
        this.resMsgList.push(redata);
      }, 300);
    },
    websocketsend(Data) {
      //数据发送
      this.websock.send(Data);
    },
    websocketclose(e) {
      //关闭
      //console.log("断开连接", e);
    },

    /**
     * @description 翻页更新结果集
     * @param
     */
    updataRes(data) {
      //console.log(data[this.activeName].hotSettings.data);
      this.resultData[this.activeName].hotSettings.columns =
        data[this.activeName].hotSettings.columns;
      this.$refs.hotTableComponent[this.activeName].hotInstance.loadData(
        data[this.activeName].hotSettings.data
      );
      this.resultData[this.activeName].updateRowData = [];
      this.resultData[this.activeName].deleteRowData = [];
      this.resultData[this.activeName].currentPage =
        data[this.activeName].currentPage;
      // hotInstance.destroy();
    },
    /**
     * @description 增删改成功，更新结果集
     * @param
     */
    updateResultTable(data) {
      //console.log(data);
      // this.loadData(data);
      // this.resultData[this.activeName].hotSettings.columns =
      //   data[this.activeName].hotSettings.columns;
      this.resultData[this.activeName].updateRowData = [];
      this.resultData[this.activeName].deleteRowData = [];
    },
    /**
     * @description 魔改表格自适应
     * @param
     */
    reSize() {
      // //console.log(this.$refs.hotTableComponent[this.activeName].hotInstance.getSourceData())

      let data = this.$refs.hotTableComponent[
        this.activeName
      ].hotInstance.getSourceData();
      this.$refs.hotTableComponent[this.activeName].hotInstance.loadData(data);
      this.$store.commit("reSizeResTable", false);
    }
  }
};
</script>
<style src="../../../../../node_modules/handsontable/dist/handsontable.full.css"></style>
<style lang='scss' >
@import "../../work-core/index.scss";
</style>
