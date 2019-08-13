<template>
  <div class="work_init_page">
    <div class="work_init_con">
      <div class="con_tit">
        <i class="sql_daios_logo"></i>
        Daios快捷操作
      </div>
      <div class="con_con">
        <div class="con_list" v-for="item,i in data" :key="i">
          <div class="item">
            <span style="color: #666666">●</span>
            {{item.value}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          value: "格式化- F3"
        },
        {
          value: "收藏- F4"
        },
        {
          value: "运行- F8"
        },
        {
          value: "停止- F9"
        },
        {
          value: "撤销- Ctrl + S | Cmd + S"
        },
        {
          value: "重做- Ctrl + Z | Cmd + Z"
        },
        {
          value: "查找- Ctrl + F | Cmd + F"
        },
        {
          value: "替换- Ctrl + H | Cmd + H"
        },
        {
          value: "注释- Ctrl + / | Cmd + /"
        },
        {
          value: "同词选择- Ctrl + D | Cmd + D"
        },
       
      ]
    };
  },

  methods: {},

  created() {}
};
</script>

<style lang='scss'>
</style>
