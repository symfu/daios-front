<template>
  <div class="flex full" style="background: #1e1e1e;" :class="{'min_editor':isShowResult}">
    <div id="container" ref="editor" class style="width:100%;height:94%"></div>
  </div>
</template>

<script>
import Store from "store";
import { mapState } from "vuex";
// import * as monaco from "monaco-editor";
import * as monaco from "bintools-editor";
import sqlFormatter from "sql-formatter";
import loadSqlKeyWords from "./components/keyWord.js";
import loadMongoKeyWords from "./components/mongoWord.js";
import loadMongolineHiight from "./components/mongolinehight";
import Fuse from "fuse.js"; //引入筛选库
// import { sqlParser } from "./components/sqlParser.js";





import { listen } from 'vscode-ws-jsonrpc';
import { MonacoLanguageClient, CloseAction, ErrorAction, MonacoServices, createConnection } from 'monaco-languageclient/lib/monaco-converter';
const ReconnectingWebSocket = require('reconnecting-websocket');
const normalizeUrl = require('normalize-url');
export default {
  props: {
    // 编辑器中呈现的内容
    codes: {
      type: String,
      default: function() {
        return "";
      }
    },
    readOnly: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    //根据全屏不全屏来控制编辑器高度
    isShowResult: {
      type: Boolean,
      default: function() {
        return false;
      }
    },

    // 主要配置
    editorOptions: {
      type: Object,
      default: function() {
        return {
          selectOnLineNumbers: true,
          roundedSelection: false,
          readOnly: this.readOnly, // 只读
          cursorStyle: "line", // 光标样式
          automaticLayout: true, // 自动布局
          glyphMargin: true, // 字形边缘
          useTabStops: false,
          fontSize: 16, // 字体大小
          autoIndent: true, // 自动布局,
          suggest: {
            showIcons: true,
            shareSuggestSelections: false
          }
        };
      }
    }
  },
  computed: {
    ...mapState({
      pageCurrent: state => state.work.pageCurrent,
      pageList: state => state.work.pageList
    })
  },
  data() {
    return {
      content: "",
      hasTemp: false,
      tempCode: false,
      monacoEditor: null,
      editorOption: {}
    };
  },

  methods: {
    /**
     * @description 获取用户编辑器设置
     * @param
     */
    loadData() {
      return this.$api.admin.getSettingForEditor(Store.get("userData").userId);
      // automaticLineBreak是否自动换行boolean
      //automaticSave是否自动保存boolean
      //codingStyle代码风格 LOWER-小写 UPPER-大写
      //columnHint字段提示boolean
      //fontSize代码字体大小
      //keyWordHint关键字提示boolean
      //lineBreakNum自动换行数
      //spaceHint空格智能提示boolean
      //syntaxTemplate语法模板boolean
      //tableHint表提示boolean
      //themeStyle主题风格 BLACK - 黑色 WHITE-白色
      //       thumbnail是否开启缩略图
    },
    /**
     * @description 获取当前用户激活模板
     * @param
     */
    getCurrentActivityTemp() {
      this.$api.user.template
        .getCurrentActivityTemp(Store.get("userData").userId)
        .then(res => {
          if (res.resCode == 10000) {
            //console.log("模板", res.data);
            //console.log(this.pageCurrent);
            if (
              res.data.templateContent != "" &&
              res.data.templateContent != null
            ) {
              //console.log("111");
              this.tempCode = res.data.templateContent;
              this.tempCode = this.tempCode.replace(
                "${sourceServerType}",
                this.pageCurrent.dataSource
              );
              this.tempCode = this.tempCode.replace(
                "${sourceServerVersion}",
                this.pageCurrent.dataSourceVer
              );
              this.tempCode = this.tempCode.replace(
                "${author}",
                Store.get("userData").userName
              );
              this.tempCode = this.tempCode.replace(
                "${createTime}",
                this.getNowFormatDate()
              );
            } else {
              this.tempCode = "";
            }

            this.init();
          } else {
            this.$message.error(res.resMsg);
          }
        });
    },
    /**
     * @description 初始化编辑器
     * @param
     */
    init() {
      const SORT_TEXT = {
        Table: "0",
        Column: "1",
        Keyword: "2"
      };

      //引入高亮文件
      let db_keywords, mongo_keywords;
      loadSqlKeyWords().then(res => {
        db_keywords = res;
      });
      loadMongoKeyWords().then(res => {
        mongo_keywords = res;
      });
      
      this.loadData().then(res => {
        if (res.resCode == 10000) {
          //console.log("用户编辑器设置", res.data);
          console.log(this.pageCurrent);
          let language;
          if (this.pageCurrent.dataSource == "MONGODB") {
            language = "mongodb";
          } else {
            language = "sql";
          }
          this.editorOption = res.data;
          monaco.languages.register({ id: "mongodb" });
          monaco.languages.setMonarchTokensProvider(
            "mongodb",
            loadMongolineHiight()
          );
          this.monacoEditor = monaco.editor.create(this.$refs.editor, {
            value: this.tempCode, // 见props
            language: language,
            theme: this.editorOption.themeStyle == "BLACK" ? "vs-dark" : "vs", // 编辑器主题：vs, hc-black, or vs-dark，更多选择详见官网
            selectOnLineNumbers: true,
            roundedSelection: false,
            wordWrap: this.editorOption.lineBreakNum > 0 ? "on" : "off", //"off" | "on" | "wordWrapColumn" | "bounded"
            readOnly: this.readOnly, // 只读
            cursorStyle: "line", // 光标样式
            automaticLayout: true, // 自动布局
            glyphMargin: false, // 字形边缘
            useTabStops: false,
            minimap: {
              enabled: this.editorOption.thumbnail
            }, //小地图
            contextmenu: false, //上下文菜单
            lineNumbersMinChars: 4,
            fontSize: this.editorOption.fontSize, // 字体大小
            autoIndent: false, // 自动布局,
            // suggest: {
            //   showIcons: true,
            //   shareSuggestSelections: true
            // },
            suggestOnTriggerCharacters: true
          });
          monaco.languages.registerCompletionItemProvider("sql", {
            triggerCharacters: [" ", "."],
            provideCompletionItems(model, position) {
              const { lineNumber, column } = position;
              const textBeforePointer = model.getValueInRange({
                startLineNumber: lineNumber,
                startColumn: 0,
                endLineNumber: lineNumber,
                endColumn: column
              });
              const tokens = textBeforePointer.trim().split(/\s+/);
              const lastToken = tokens[tokens.length - 1].toLowerCase();
              return {
                suggestions:
                  language == "mongodb"
                    ? mongo_keywords.map(renderKeyword)
                    : db_keywords.map(renderKeyword)
              };
            }
          });
          function renderKeyword(keyword) {
            return {
              label: keyword,
              kind: monaco.languages.CompletionItemKind.Keyword,
              detail: "",
              sortText: SORT_TEXT.Keyword,
              insertText: keyword
            };
          }
          this.monacoEditor.onDidChangeModelContent(event => {
            this.content = this.monacoEditor.getValue();
            this.$emit("sqlContent", this.content);
            this.pageCurrent.sql = this.content;
            this.$store.commit("setCurrentPage", this.pageCurrent);
          });

          //编辑器加载成功
          this.$store.commit("editorSuccess", true);
        } else {
          this.$message.error(res.resMsg);
        }
      });
    },
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate =
        date.getFullYear() +
        seperator1 +
        month +
        seperator1 +
        strDate +
        " " +
        date.getHours() +
        seperator2 +
        date.getMinutes() +
        seperator2 +
        date.getSeconds();
      return currentdate;
    },
    /**
     * @description 格式化
     * @param
     */
    fomartSql() {
      this.monacoEditor.setValue(sqlFormatter.format(this.content));
    },
    /**
     * @description 设置编辑器数据
     * @param
     */
    importSql(data) {
      //console.log("开始编辑器内容");
      //导入sql执行，将上传数据加到编辑器
      this.monacoEditor.setValue(data);
    },
    /**
     * @description 打开表视图等操作
     * @param
     */
    openTable_View(data) {
      this.monacoEditor.setValue(data);
      this.$store.commit("setOpenxxxSql", "");
    }
  },

  created() {
    this.getCurrentActivityTemp();
  },
  destroyed() {
    monaco.languages.dispose();
  },
  mounted() {}
};
</script>

<style lang='scss'>
#container {
  .margin {
    margin: 0;
  }
}
.min_editor {
  height: 50% !important;
}
</style>
