const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    host: "localhost", //本地
    port: 8080, //端口号
    open: true, //默认false   true自动打开
  },
});
