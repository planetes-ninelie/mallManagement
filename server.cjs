//引入express
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
//配置端口号
const POST = 8086
// 创建一个app服务器实例
const app = express()

//配置静态资源
app.use(express.static(__dirname + '/docs'))

app.use(
  createProxyMiddleware({
    target: 'http://8.138.108.50:2310/',
    changeOrigin: true,
    pathFilter: '/api',
    //路径重写
    pathRewrite: {'^/api' : ''}
  })
);

//绑定端口监听
app.listen(POST,() => {
  console.log(`本地服务器启动！http://localhost:${POST}`);
})