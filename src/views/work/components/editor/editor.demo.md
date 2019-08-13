```
<template>
  <div class="flex full" style="background: #1e1e1e;" :class="{'min_editor':isShowResult}">
    <div id="container" ref="editor" class style="width:100%;height:94%"></div>
  </div>
</template>

<script>
import Store from "store";
import { mapState } from "vuex";
import * as monaco from "monaco-editor";
// import * as monaco from "bintools-editor";
import loadSqlKeyWords from "./components/keyWord.js";
import Fuse from "fuse.js"; //引入筛选库
import { sqlParser } from "./components/sqlParser.js";
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
      // let sqlParser = window.sqlParser;

      let ast = sqlParser.parse("select * from aa");
      let sql = sqlParser.stringify(ast);
      const SORT_TEXT = {
        Table: "0",
        Column: "1",
        Keyword: "2"
      };
      const db_keywords = [
        "SELECT",
        "FROM",
        "WHERE",
        "GROUP BY",
        "ORDER BY",
        "ASC",
        "DESC"
      ];
      const db_schema = (window.db_schema = {
        tables: ["", ""],
        table_columns: {
          tb_user: [
            { name: "", type: "varchar" },
            { name: "", type: "varchar" }
          ],
          tb_log: [
            { name: "", type: "varchar" },
            { name: "", type: "varchar" },
            { name: "", type: "varchar" },
            { name: "", type: "varchar" }
          ]
        }
      });
      this.loadData().then(res => {
        if (res.resCode == 10000) {
          //console.log("用户编辑器设置", res.data);
          this.editorOption = res.data;

          this.monacoEditor = monaco.editor.create(this.$refs.editor, {
            value: this.tempCode, // 见props
            language: "sql",
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
              //console.log(tokens);
              if (lastToken === "from") {
                return {
                  suggestions: db_schema.tables.map(renderTable)
                };
              } else if (lastToken === "select") {
                //console.log(tokens);
                //console.log(getAllTableColumnCompletionItems());
                return {
                  suggestions: getAllTableColumnCompletionItems()
                };
              }
              return {
                suggestions: db_schema.tables
                  .map(renderTable)
                  .concat(getAllTableColumnCompletionItems())
                  .concat(db_keywords.map(renderKeyword))
              };
            }
          });
          function getAllTableColumnCompletionItems() {
            const table_columns = [];
            Object.keys(db_schema.table_columns).forEach(table => {
              db_schema.table_columns[table].forEach(column => {
                table_columns.push(renderTableColumn(table, column));
              });
            });
            //console.log(table_columns);
            return table_columns;
          }

          function renderKeyword(keyword) {
            return {
              label: keyword,
              kind: monaco.languages.CompletionItemKind.Keyword,
              detail: "",
              sortText: SORT_TEXT.Keyword,
              insertText: keyword
            };
          }

          function renderTable(name) {
            return {
              label: name,
              kind: monaco.languages.CompletionItemKind.Module,
              detail: "<table>",
              sortText: SORT_TEXT.Table,
              insertText: name
            };
          }

          function renderTableColumn(table, column) {
            return {
              label: column.name,
              kind: monaco.languages.CompletionItemKind.Field,
              detail: "<column> " + column.type + " " + table,
              sortText: SORT_TEXT.Column,
              insertText: column.name
            };
          }
          this.monacoEditor.onDidChangeModelContent(event => {
            this.content = this.monacoEditor.getValue();
            // loadSqlKeyWords().then(res => {
            //   // var options = {
            //   //   keys: [
            //   //     {
            //   //       name: "insertText",
            //   //       weight: 0.3
            //   //     }
            //   //   ]
            //   // };
            //   // let fuse = new Fuse(res, options);
            //   // //console.log(fuse.search("s"));
            //   // //console.log(this.content);

            //   monaco.languages.registerCompletionItemProvider("sql", {
            //     triggerCharacters: [" "],
            //     provideCompletionItems: () => {
            //       return {
            //         suggestions: res
            //       };
            //     }
            //   });
            // });
            this.$emit("sqlContent", this.content);
            this.pageCurrent.sql = this.content;
            this.$store.commit("setCurrentPage", this.pageCurrent);
          });
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
    }
  },

  created() {
    this.getCurrentActivityTemp();
  },
  mounted() {
    //  monaco.editor.defineTheme("myTheme", {
    //     base: "vs",
    //     inherit: true,
    //     rules: [{ background: "#fafafa" }],
    //     colors: {
    //       "editor.foreground": "#000000",
    //       "editor.background": "#fafafa",
    //       "editorCursor.foreground": "#8B0000",
    //       "editor.lineHighlightBackground": "#0000FF20",
    //       "editorLineNumber.foreground": "#008800",
    //       "editor.selectionBackground": "#88000030",
    //       "editor.inactiveSelectionBackground": "#88000015"
    //     }
    //   });
    //   monaco.editor.setTheme("myTheme");
    // this.loadData().then(res => {
    //   if (res.resCode == 10000) {
    //     //console.log("用户编辑器设置", res.data);
    //     this.editorOption = res.data;
    //     this.monacoEditor = monaco.editor.create(this.$refs.editor, {
    //       value: this.codes, // 见props
    //       language: "sql",
    //       theme: this.editorOption.themeStyle == "BLACK" ? "vs-dark" : "vs", // 编辑器主题：vs, hc-black, or vs-dark，更多选择详见官网
    //       selectOnLineNumbers: true,
    //       roundedSelection: false,
    //       wordWrap: this.editorOption.lineBreakNum > 0 ? "on" : "off", //"off" | "on" | "wordWrapColumn" | "bounded"
    //       readOnly: this.readOnly, // 只读
    //       cursorStyle: "line", // 光标样式
    //       automaticLayout: true, // 自动布局
    //       glyphMargin: false, // 字形边缘
    //       useTabStops: false,
    //       minimap: {
    //         enabled: this.editorOption.thumbnail
    //       }, //小地图
    //       contextmenu: false, //上下文菜单
    //       lineNumbersMinChars: 4,
    //       fontSize: this.editorOption.fontSize, // 字体大小
    //       autoIndent: false, // 自动布局,
    //       suggest: {
    //         showIcons: true,
    //         shareSuggestSelections: false
    //       }
    //     });
    // this.monacoEditor.onDidChangeModelContent(event => {
    //   this.content = this.monacoEditor.getValue();
    //   this.$emit("sqlContent", this.content);
    //   this.pageCurrent.sql = this.content;
    //   this.$store.commit("setCurrentPage", this.pageCurrent);
    // });
    //   } else {
    //     this.$message.error(res.resMsg);
    //   }
    // });
  }
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

```