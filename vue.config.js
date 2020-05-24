const path = require("path");

module.exports = {
  pages: {
    // popup - 弹出框的页面构建
    popup: {
      template: "public/browser-extension.html",
      entry: "./src/popup/main.ts",
      title: "Popup",
    },
  },
  pluginOptions: {
    browserExtension: {
      componentOptions: {
        background: {
          entry: "src/background.ts",
        },
      },
    },
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/common/less/*.less")],
    },
  },
  chainWebpack: (config) => {
    const types = ["vue-modules", "vue", "normal-modules", "normal"];
    types.forEach((type) =>
      addStyleResource(config.module.rule("stylus").oneOf(type))
    );
  },
};

function addStyleResource() {}
