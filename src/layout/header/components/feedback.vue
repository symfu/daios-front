<template>
  <el-dialog
    :visible="visible"
    width="597px"
    class="feedback-dialog"
    :modal="false"
    @close="closeHandle"
  >
    <div class="feedback-box theme-WHITE">
      <div class="feedback-box__body">
        <div class="feedback-box__body-inner">
          <div class="feedback-box__main">
            <div class="title">
              <h2>请描述您的问题</h2>
            </div>
            <el-form
              ref="form"
              :model="form"
              :rules="rules"
              label-position="left"
              label-width="80px"
              size="small"
            >
              <el-form-item label="问题类型">
                <el-select
                  @focus="clickSelect"
                  v-model="form.feedbackType"
                  @change="changeType"
                  style="width:100%"
                >
                  <el-option ref="select" class="feedback__select" value="TYPE_BUGS" label="问题报告"></el-option>
                  <el-option value="TYPE_FEATURES" label="功能需求"></el-option>
                  <el-option value="TYPE_PERFORMANCE" label="性能问题"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="标题" prop="title">
                <el-input v-model="form.title"></el-input>
              </el-form-item>
              <el-form-item label="建议内容" prop="step">
                <el-input
                  type="textarea"
                  rows="5"
                  v-model="form.step"
                  resize="none"
                  :placeholder="placeholder"
                ></el-input>
              </el-form-item>
              <el-form-item label="联系方式" prop="tel">
                <el-input v-model="form.tel" placeholder="您的电话或邮箱地址"></el-input>
              </el-form-item>
              <el-form-item label>
                <span style="color:#FF9900">保留您的联系方式能让我们修复后尽快跟您取得联系</span>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <i class="feedback-icon-left"></i>
      <i class="feedback-icon-right"></i>
      <div class="feedback-box__footer t-center">
        <el-button style="width:210px;margin-top:92px" type="blue" round @click="onSubmit">立即提交</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import Store from "store";
export default {
  props: ["visible"],
  data() {
    return {
      form: {
        feedbackType: "TYPE_BUGS", // 反馈类型 TYPE_PERFORMANCE-性能问题 TYPE_FEATURES-功能需求 TYPE_BUGS-问题报告
        title: "",
        step: "",
        tel: ""
      },
      placeholder:
        "请描述重新此问题的必要步骤，并包含实际和预期结果，我们将尽快解决。",
      rules: {
        title: [{ required: true, message: "标题不能为空", trigger: "blur" }],
        step: [{ required: true, message: "描述不能为空", trigger: "blur" }],
        tel: [{ required: true, message: "联系方式不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    closeHandle() {
      this.$refs.form.resetFields();
      this.$emit("update:visible", false);
    },
    changeType(e) {
      switch (e) {
        case "TYPE_BUGS":
          this.placeholder =
            "请描述重新此问题的必要步骤，并包含实际和预期结果，我们将尽快解决。";
          break;
        case "TYPE_FEATURES":
          this.placeholder = "请描述您希望能够使用的功能，我们将尽快解决。";
          break;
        case "TYPE_PERFORMANCE":
          this.placeholder =
            "请描述这个性能问题是在什么时候发生的，是在启动时，还是在一系列特定的操作之后？我们将尽快解决。";
          break;
      }
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const params = {
            userId: Store.get("userData").userId,
            ...this.form
          };
          this.$api.admin.feedback(params).then(res => {
            if (res.resCode == 10000) {
              this.$alert("我们已经收到您的反馈，感谢您的反馈", "", {
                confirmButtonText: "确定",
                callback: action => {
                  this.$refs.form.resetFields();
                  this.$emit("update:visible", false);
                }
              });
            } else {
              this.$message.error(res.resMsg);
            }
          });
        }
      });
    },
    clickSelect() {
      let aa = document.querySelector(".feedback__select");
      aa.parentNode.parentNode.parentNode.id = "aa";
      aa.parentNode.parentNode.parentNode.parentNode.id = "bb";
    }
  },
  mounted() {}
};
</script>

<style lang="scss" >
.feedback-dialog {
  .el-dialog {
    background: transparent !important;
    box-shadow: none !important;
  }
  .el-dialog__header {
    background: transparent !important;
  }
  .el-dialog__body {
    padding: 0 !important;
    .el-input {
      .el-input__inner {
        height: 25px;
        line-height: 25px;
        background-color: #fff;
        border: 1px solid #dcdfe6;
        color: #606266;
      }

      .el-input__inner:focus {
        background-color: #fff;
        color: #606266;
      }
    }
    .el-textarea {
      .el-textarea__inner {
        height: 60px;
        border: 1px solid #dcdfe6;
        background-color: #fff;
      }

      .el-textarea__inner:focus {
        border: 1px solid #409eff;
        color: #606266;
        background-color: #fff;
      }

      .el-textarea__inner::-webkit-scrollbar {
        width: 10px;
        height: 10px;
      }

      .el-textarea__inner::-webkit-scrollbar-thumb {
        background-color: #dcdfe6;
        border-radius: 5px;
      }
    }
  }
  .el-dialog__headerbtn {
    top: 40px !important;
    right: 40px !important;
    z-index: 10 !important;
  }
}

#aa {
  background-color: #fff;
  .el-select-dropdown__wrap.el-scrollbar__wrap {
    .el-select-dropdown__item {
    }

    .el-select-dropdown__item:hover {
      background-color: #f5f7fa !important;
      color: #606266;
    }
    .el-select-dropdown__item.hover {
      background-color: #f5f7fa !important;
      color: #606266;
    }
    .el-select-dropdown__item.selected {
      background-color: #fff;
      color: #409eff;
    }
  }
}
#bb {
  background-color: #fff;
  border: 1px solid #fff;
  .popper__arrow {
    background-color: #fff;
    border-bottom-color: #fff;
  }

  .popper__arrow:after {
    border-bottom-color: #fff;
  }
}
</style>
<style lang="scss" scoped>
.title {
  text-align: center;
  margin-bottom: 25px;
}
.title h2 {
  position: relative;
  line-height: 30px;
}
.title h2:before,
.title h2:after {
  content: "";
  display: block;
  position: absolute;
  width: 153px;
  height: 35px;
}
.title h2:before {
  background: url("~@/assets/images/feedback_title_left.png") no-repeat center
    center;
  background-size: 153px 35px;
  left: 0;
  top: 0;
}
.title h2:after {
  background: url("~@/assets/images/feedback_title_right.png") no-repeat center
    center;
  background-size: 153px 35px;
  right: 0;
  top: 0;
}
.feedback-box {
  position: relative;
}
.feedback-box__body {
  width: 576px;
  box-sizing: border-box;
  border-radius: 7px;
  background: #d4ecff;
  margin: 0 auto;
  padding: 7px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 3;
}
.feedback-box__body-inner {
  background: #fff;
  border-radius: 7px;
  padding: 10px;
}
.feedback-box__main {
  background: #fff;
  border: 2px solid #d4ecff;
  border-radius: 7px;
  padding: 30px 50px 70px;
}
.feedback-box {
  width: 597px;
}
.feedback-box__footer {
  width: 597px;
  height: 183px;
  background: url("~@/assets/images/feedback_ft.png") no-repeat center center;
  background-size: 597px 183px;
  position: absolute;
  bottom: -68px;
  z-index: 4;
}
.feedback-icon-left {
  display: block;
  width: 10.5px;
  height: 7.5px;
  position: absolute;
  left: 0;
  bottom: 115px;
  background: url("~@/assets/images/feedback_ft_left.png") no-repeat center
    center;
  background-size: 10.5px 7.5px;
}
.feedback-icon-right {
  display: block;
  width: 10.5px;
  height: 7.5px;
  position: absolute;
  right: 0;
  bottom: 115px;
  background: url("~@/assets/images/feedback_ft_right.png") no-repeat center
    center;
  background-size: 10.5px 7.5px;
}
// body.theme-BLACK {
//   .el-select-dropdown.el-popper.bb {
//     border: 1px solid #fff;
//     background-color: #fff;

//     .el-scrollbar {
//       background-color: #fff;
//     }

//     .popper__arrow {
//       background-color: #fff;
//       border-bottom-color: #fff;
//     }

//     .popper__arrow:after {
//       border-bottom-color: #fff;
//     }
//   }
// }
</style>
