<template>
  <div id="terminal-container"></div>
</template>

<script>
import { Terminal } from "xterm";
import * as fit from "xterm/lib/addons/fit/fit";
import { FitAddon } from "xterm-addon-fit";
Terminal.applyAddon(fit);
import { WebLinksAddon } from "xterm-addon-web-links";
import { OverlayAddon } from "./overlay";
const Command = {
  // server side
  OUTPUT: "0",
  SET_WINDOW_TITLE: "1",
  SET_PREFERENCES: "2",
  SET_RECONNECT: "3",

  // client side
  INPUT: "0",
  RESIZE_TERMINAL: "1"
};
export default {
  props: {
    id: String,
    url: String,
    options: Object
  },
  watch: {},
  data() {
    return {
      textEncoder: null,
      textDecoder: null,
      container: null,
      terminal: null,
      fitAddon: null,
      overlayAddon: null,
      socket: null,
      title: null,
      autoReconnect: null,
      resizeTimeout: null
    };
  },

  methods: {
    init() {
      this.textEncoder = new TextEncoder();
      this.textDecoder = new TextDecoder();
      this.fitAddon = new FitAddon();
      this.overlayAddon = new OverlayAddon();
    },

    onWindowResize() {
      console.log("浏览器窗口变化", this.terminal);

      // console.log('浏览器窗口变化啦');

      clearTimeout(this.resizeTimeout);
      // console.log(this.fitAddon);
      console.log(this.fitAddon);

      // this.terminal.fit()
      // this.terminal.resize(50,50);
      this.resizeTimeout = setTimeout(() => this.terminal.fit(), 250);
    },
    onWindowUnload(event) {
      console.log("离开");
      const message = "Close terminal? this will also terminate the command.";
      event.returnValue = message;
      return message;
    },
    openTerminal() {
      if (this.terminal) {
        this.terminal.dispose();
      }

      // this.socket = new WebSocket("ws://t134u.holytoolz.com:33520/ws", ["tty"]);
      this.socket = new WebSocket(this.url, ["tty"]);

      this.terminal = new Terminal(this.options);
      const { socket, terminal, overlayAddon } = this;

      socket.binaryType = "arraybuffer";
      socket.onopen = this.onSocketOpen;
      socket.onmessage = this.onSocketData;
      socket.onclose = this.onSocketClose;
      console.log(this.fitAddon);
      terminal.loadAddon(this.fitAddon);
      terminal.loadAddon(overlayAddon);
      terminal.loadAddon(new WebLinksAddon());

      terminal.onTitleChange(data => {
        if (data && data !== "") {
          document.title = data + " | " + this.title;
        }
      });
      terminal.onData(this.onTerminalData);
      terminal.onResize(this.onTerminalResize);
      if (
        document.queryCommandSupported &&
        document.queryCommandSupported("copy")
      ) {
        terminal.onSelectionChange(() => {
          overlayAddon.showOverlay("\u2702", 200);
          document.execCommand("copy");
        });
      }
      terminal.open(document.getElementById("terminal-container"));
      terminal.focus();

      window.addEventListener("resize", this.onWindowResize);
      window.addEventListener("beforeunload", this.onWindowUnload);
    },
    onSocketOpen() {
      console.log("Websocket 连接打开");
      const { socket, textEncoder } = this;
      console.log(textEncoder);
      socket.send(textEncoder.encode(JSON.stringify({ AuthToken: "" })));
      this.terminal.fit();
    },
    onSocketClose(event) {
      console.log(
        `[daios] websocket connection closed with code: ${event.code}`
      );

      const { overlayAddon, openTerminal, autoReconnect } = this;
      overlayAddon.showOverlay("😂连接关闭😂", null);
      window.removeEventListener("beforeunload", this.onWindowUnload);

      // 1008: POLICY_VIOLATION - Auth failure
      if (event.code === 1008) {
        window.location.reload();
      }
      // 1000: CLOSE_NORMAL
      if (event.code !== 1000 && autoReconnect > 0) {
        setTimeout(openTerminal, autoReconnect * 1000);
      }
    },
    onSocketData(event) {
      console.log("websocket 发送数据");
      const { terminal, textDecoder } = this;

      const rawData = new Uint8Array(event.data);
      const cmd = String.fromCharCode(rawData[0]);
      const data = rawData.slice(1);

      switch (cmd) {
        case Command.OUTPUT:
          terminal.writeUtf8(data);
          break;
        case Command.SET_WINDOW_TITLE:
          this.title = textDecoder.decode(data.buffer);
          document.title = this.title;
          break;
        case Command.SET_PREFERENCES:
          const preferences = JSON.parse(textDecoder.decode(data.buffer));
          Object.keys(preferences).forEach(key => {
            console.log(`[ttyd] setting ${key}: ${preferences[key]}`);
            terminal.setOption(key, preferences[key]);
          });
          break;
        case Command.SET_RECONNECT:
          this.autoReconnect = parseInt(textDecoder.decode(data.buffer));
          console.log(
            `[ttyd] enabling reconnect: ${this.autoReconnect} seconds`
          );
          break;
        default:
          console.warn(`[ttyd] unknown command: ${cmd}`);
          break;
      }
    },
    onTerminalResize(size) {
      console.log("终端尺寸变化", size);

      const { overlayAddon, socket, textEncoder } = this;
      if (socket.readyState === WebSocket.OPEN) {
        const msg = JSON.stringify({ columns: size.cols, rows: size.rows });
        socket.send(textEncoder.encode(Command.RESIZE_TERMINAL + msg));
      }

      setTimeout(() => {
        this.terminal.resize(size.cols, 45);
        overlayAddon.showOverlay(`${size.cols}x${size.rows}`);
      }, 500);
    },
    onTerminalData(data) {
      console.log("终端数据变化", data);
      const { socket, textEncoder } = this;
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(textEncoder.encode(Command.INPUT + data));
      }
    }
  },
  mounted() {
    this.openTerminal();
  },
  beforeDestroy() {
    this.socket.close();
    this.terminal.dispose();

    window.removeEventListener("resize", this.onWindowResize);
    window.removeEventListener("beforeunload", this.onWindowUnload);
  },
  created() {
    // console.log(this.options)
    this.init();
  }
};
</script>

<style lang="scss">
@import url("./xterm.scss");
</style>
