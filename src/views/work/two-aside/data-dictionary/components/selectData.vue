<template>
  <div class="data_select">
    <!-- <div class="shi fl">
      <div style="cursor: pointer;">上</div>
      <div style="cursor: pointer;">下</div>
    </div>
    <div class="fen fl"></div>-->
    <div @click="shang" style="cursor: pointer;">上</div>
    <div
      :style="{height:height*lineNum + 'px'}"
      class="rollScreen_container"
      id="rollScreen_container"
    >
      <ul
        class="rollScreen_list"
        :style="{transform:transform}"
        :class="{rollScreen_list_unanim:num===0}"
      >
        <li
          class="rollScreen_once"
          v-for="(item,index) in contentArr"
          :key="index"
          :style="{height:height+'px'}"
        >
          <span>{{item}}</span>
        </li>
        <li
          class="rollScreen_once"
          v-for="(item,index) in contentArr"
          :key="index+contentArr.length"
          :style="{height:height+'px'}"
        >
          <span>{{item}}</span>
        </li>
      </ul>
    </div>
    <div @click="xia" style="cursor: pointer;">下</div>
  </div>
</template>

<script>
export default {
  props: {
    height: {
      default: 20,
      type: Number
    },
    lineNum: {
      default: 3,
      type: Number
    }
  },
  data() {
    return {
      contentArr: [
        "内容1",
        "内容2",
        "内容3",
        "内容4",
        "内容5",
        "内容6",
        "内容7"
      ],
      num: 0
    };
  },
  computed: {
    transform: function() {
      return "translateY(-" + this.num * this.height + "px)";
    }
  },
  methods: {
    shang() {
      console.log(this.num);
      if (this.num !== this.contentArr.length) {
        this.num++;
      } else {
        this.num = 0;
      }
      console.log(this.num);
    },
    xia() {
      console.log(this.num);
      if (this.num == 0) {
        this.num = this.contentArr.length
      }
      if (this.num !== 0) {
        this.num--;
      }   else {
        
      }
      console.log(this.num);
    }
  },

  created() {}
};
</script>

<style lang='scss'>
.data_select {
  width: 100px;
  height: 100px;
  overflow: hidden;
  background-color: #fff;
  .shi,
  .fen {
    width: 50px;
    height: 100px;
  }
  .fen {
    background-color: red;
  }
}
.rollScreen_container {
  display: inline-block;
  position: relative;
  overflow: hidden;
}
.rollScreen_list {
  transition: 1s linear;
}
.rollScreen_list_unanim {
  transition: none;
}
</style>
