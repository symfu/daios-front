<template>
  <div class="editor_right_box">
    <div class="editor_right_box_title fr">
      <div class="item collection_tit" @click="showCollection">收藏</div>
      <div class="item link_tit" @click="showLinkInfo">连接信息</div>
    </div>
    <div class="editor_right_box_con" v-if="isRight">
      <linkInfo v-if="isShowLink"></linkInfo>
      <rightCollection v-if="isShowCollection"></rightCollection>
    </div>
    <div class="editor_right_box_show">
      <div class="box1 fl" @click="openliftBox()" :class="{'active':isLeft}" :title="isLeft?'关闭左边侧边栏':'打开左边侧边栏'">
        <div class="box1_con" :class="{'active':isLeft}"></div>
      </div>
      <div class="box2 fr" :class="{'active':isRight}" @click="openRightBox()" :title="isRight?'关闭右边侧边栏':'打开右边侧边栏'">
        <div class="box2_con" :class="{'active':isRight}"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import linkInfo from "./link.info";
import rightCollection from "./right.collection";
export default {
  components: {
    linkInfo, //连接信息模块
    rightCollection //收藏模块
  },
  props: {},
   computed: {
    ...mapState({
      sqlEditBigScreen: state => state.work.sqlEditBigScreen,
    })
  },
  data() {
    return {
      isLeft: true,
      isRight: false,
      isShowLink:false,
      isShowCollection:true,
    };
  },

  methods: {
    /**
     * @description 打开左边侧边栏
     * @param
     */
    openliftBox() {
      this.isLeft = !this.isLeft
      let isSqlEditBigScreen = false;
      this.sqlEditBigScreen
        ? (isSqlEditBigScreen = false)
        : (isSqlEditBigScreen = true);
        //console.log(isSqlEditBigScreen)
      this.$store.commit("setSqlEditBigScreen", isSqlEditBigScreen);
    },
    /**
     * @description 打开右边侧边栏
     * @param
     */
    openRightBox() {
      this.isRight = !this.isRight;
      this.$emit("openRightBox", this.isRight);
    },
    /**
     * @description 显示收藏
     * @param 
     */
    showCollection() {
      this.isShowCollection = true
      this.isShowLink = false
    },
    /**
     * @description 显示连接信息
     * @param 
     */
    showLinkInfo() {
      this.isShowLink = true
      this.isShowCollection = false
    },
  },

  created() {}
};
</script>

<style lang='scss'>
</style>
