<template>
  <div style="height: 100%;
  min-height: 100%;
  margin: 0;
  overflow: hidden;">
    <Xterm :url="url" :options="termOptions"></Xterm>
  </div>
</template>

<script>
import Xterm from "./components/xterm";
import { mapState } from "vuex";
export default {
  components: {
    Xterm
  },
  computed: {
    ...mapState({
      pageCurrent: state => state.work.pageCurrent
    })
  },
  data() {
    return {
      url: "",
      termOptions: {}
    };
  },

  methods: {
    init() {
      const protocol =
        window.location.protocol === "https:" ? "wss://" : "ws://";
      const wsPath = window.location.pathname.endsWith("/") ? "ws" : "/ws";
      // this.url = [
      //   protocol,
      //   window.location.host,
      //   window.location.pathname,
      //   wsPath,
      //   window.location.search
      // ].join("");
      this.url = `ws://${this.pageCurrent.shellUrl}/ws`
      this.termOptions = {
        fontSize: 13,
        rows:45,
        
        fontFamily:
          "Menlo For Powerline,Consolas,Liberation Mono,Menlo,Courier,monospace",
        theme: {
          foreground: "#d2d2d2",
          background: "#2b2b2b",
          cursor: "#adadad",
          black: "#000000",
          red: "#d81e00",
          green: "#5ea702",
          yellow: "#cfae00",
          blue: "#427ab3",
          magenta: "#89658e",
          cyan: "#00a7aa",
          white: "#dbded8",
          brightBlack: "#686a66",
          brightRed: "#f54235",
          brightGreen: "#99e343",
          brightYellow: "#fdeb61",
          brightBlue: "#84b0d8",
          brightMagenta: "#bc94b7",
          brightCyan: "#37e6e8",
          brightWhite: "#f1f1f0"
        }
      };
    }
  },

  created() {
    this.init();
  }
};
</script>

<style >
</style>
