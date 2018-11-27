"use strict";


const express = require('express');
const app = express();
const router = require('./router/router');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const config = require('config')['app'];
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);     // 引入socket.io模块， 并且绑定到服务器

const log4js = require('./utils/log');
const logger = log4js.getLogger();

// 定义一个全局变量
let usernum = 0;

// 日志相关
log4js.useLogger(app, logger);

// 配置静态资源文件中间服务
app.use('/www', express.static(path.join(__dirname, 'www')));


// 挂载session中间件
app.use(session({
    secret: config.secretKey,  // 每一次在生成Cookie的时候，通过一个私钥生成一个字符串然后再交给客户端(读取我的配置文件里面的私钥key)
    resave: false,
    saveUninitialized: true,
    // cookie : {secure : true }
}));

// 配置解析POST请求体的中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 配置模板引擎中间件
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'xtpl');


// 挂载配置文件中的数据信息(密匙)
app.locals.config = config;


// 加载路由中间件（最后进入到路由）
app.use(router);

// 404 page
app.use(function (req, res) {
    return res.render('404');
});
// 错误信息处理机制
if (config.isDebug) {
    app.use(function (err, req, res, next) {
        console.log(err);
        res.status(500).send('Interal Server Error:' + err);
    })
} else {
    app.use(function (err, req, res, next) {
        logger.info(err);
        res.send('500, Interal Server Error:' + err);
    })
}


// 开启监听端口 server
server.listen(8080, 'localhost', function () {
    console.log('Server is listening at port 8080…………');
})

// websocket server
io.on('connection', function (socket) {
    //let usernum = app.locals.config.userlist;
    //接收并处理客户端发送的foo事件
    socket.on('foo', function (data) {
        //将消息输出到控制台
        if (data === 'login') {
            usernum++;
            io.sockets.emit('system', 'num', usernum);
        }
    })

    // 发布所有用户数量信息
    socket.on('publish', function (data) {
        if (!data || data === '') {
            return;
        }
        // console.log('开始广播消息', data);
        io.sockets.emit('message', data);
    });


    //断开连接的事件
    socket.on('disconnect', function () {
        if (usernum >= 2) {
            usernum--;
            //通知除自己以外的所有人
            // socket.broadcast.emit('system', '提示消息', '消息内容');
            io.sockets.emit('system', 'num', usernum);
        }
    });
});