<template>
  <el-dialog
    :visible.sync="dialog"
    width="30%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="cancle"
  >
    <span slot="title">设置</span>
    <p style="color:rgba(255,255,255,0.45);text-align: center;">暂未创建数据字典，请先创建</p>
    <p style="color:rgba(255,255,255,0.45);text-align: center;">上次成功创建时间：2019-02-23 12:21:54</p>

    <div style="text-align: center;margin-top:5px;">
      <el-radio-group v-model="radio">
        <el-radio :label="1">手动创建</el-radio>
        <el-radio :label="2">定时创建</el-radio>
      </el-radio-group>
    </div>
    <!-- <template v-if="radio==1">
      <div style="height:100px;line-heoght:100px;text-align: center;">
        <el-button style="margin-top:40px" @click="submit" type="primary" size="mini">立即创建</el-button>
      </div>
    </template>-->
    <template v-if="radio==2">
      <div class="dscj">
        <div>设置时间</div>
        <div>
          <div class="fl" style="margin-bottom:10px;margin-right:10px;">
            周：
            <el-select v-model="day" placeholder>
              <el-option label="每天" value="day"></el-option>
              <el-option label="周一" value="day1"></el-option>
              <el-option label="周二" value="day2"></el-option>
              <el-option label="周三" value="day3"></el-option>
              <el-option label="周四" value="day4"></el-option>
              <el-option label="周五" value="day5"></el-option>
              <el-option label="周六" value="day6"></el-option>
              <el-option label="周日" value="day7"></el-option>
            </el-select>
          </div>
          <div class="fl">
            时间：
            <el-time-picker v-model="value1" placeholder="任意时间点"></el-time-picker>
          </div>
        </div>
      </div>
    </template>
    <div slot="footer" class="dialog-footer">
      <div>
        <el-checkbox v-model="checked">开启实时同步变更 该操作可能会影响数据源性</el-checkbox>
      </div>
      <el-button @click="submit" v-if="radio==2" type="blue" size="mini">确定</el-button>
      <el-button @click="submit" v-if="radio==1" type="blue" size="mini">立即创建</el-button>
      <el-button @click="cancle" type="gary" size="mini">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  components: {},
  props: {
    dialog: Boolean
  },
  watch: {
    dialog(val) {
      if (val == true) {
        (this.radio = 1), (this.day = "day"), (this.value1 = "");
      }
    }
  },
  data() {
    return {
      radio: 1,
      day: "day",
      value1: ""
    };
  },

  methods: {
    /**
     * @description 提交
     * @param
     */
    submit() {
      this.$emit("clickSubmit", false);
    },
    /**
     * @description 取消
     * @param
     */
    cancle() {
      this.$emit("closeDialog", false);
    }
  },

  created() {}
};
</script>

<style lang='scss'>
.dscj {
  margin-bottom: 10px;
  overflow: hidden;
}
.el-time-panel.el-popper {
  border: none;
  background-color: #1d1e22;
}
.el-time-spinner__item:hover:not(.disabled):not(.active) {
  background-color: #27292e;
}
.el-time-panel__footer {
  border-top: 1px solid #27292e;
}
.el-popper[x-placement^="bottom"] .popper__arrow {
  border-color: #1d1e22;
}
.el-popper[x-placement^="bottom"] .popper__arrow::after {
  border-color: #1d1e22;
}
.el-time-panel__content::after,
.el-time-panel__content::before {
  border-color: #27292e;
}
</style>
