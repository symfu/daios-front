const MONACO_PATH = '../Plugin/monaco-editor/min/vs';

// 处理 monaco-editor 资源的加载
export default function loadMonaco() {
  if (window.__MONACO_PROMISE__) {
    return window.__MONACO_PROMISE__;
  }
  const scriptStr = `
    require.config({
        paths: {
            'vs': '${MONACO_PATH}'
        }
    });
    require(['vs/editor/editor.main'], function () {
        window.__monaco_editor__ = monaco;
    });
  `;
  const editorPromise = new Promise((resolve, reject) => {
    // loader 加载
    const loaderScript = document.createElement('script');
    loaderScript.id = 'monaco-editor-loader';
    loaderScript.src = MONACO_PATH + '/loader.js';
    loaderScript.onload = () => {
      loaderScript.onload = null;
      resolve('loader');
    };
    loaderScript.onerror = () => {
      loaderScript.onerror = null;
      reject('monaco-editor资源加载失败');
    };
    document.body.appendChild(loaderScript);
  })
    .then(() => {
      // 依赖资源加载
      return new Promise((resolve, reject) => {
        const editorScript = document.createElement('script');
        editorScript.text = scriptStr;
        editorScript.onerror = () => {
          editorScript.onerror = null;
          reject('monaco-editor资源加载失败');
        };
        document.body.appendChild(editorScript);
        resolve('editor');
      });
    })
    .then(() => {
      // 加载检测
      return new Promise((resolve, reject) => {
        let timer;
        let count = 0;

        function check() {
          // 已经加载则直接成功
          if (window.__monaco_editor__) {
            clearTimeout(timer);
            resolve();
          } else {
            // 否则继续检测 但总次数不超过1000
            if (count++ < 1000) {
              setTimeout(check, 30);
            } else {
              reject('monaco-editor资源加载失败');
            }
          }
        }
        check();
      });
    });
  return (window.__MONACO_PROMISE__ = editorPromise);
}