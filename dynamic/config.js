"use strict";

const path = require('path');

module.exports = {
    http: 'localhost:8080',
    isDebug: true,                                                         // 是否为调试模式
    secretKey: 'video-2018',                                               // 验证码session
    pageSize: 5,                                                           // 每页显示内容数量
    uploadDir: path.join(__dirname, 'www', 'uploads'),                     // 文件上传的主目录
    avatarDir: path.join(__dirname, 'www', 'uploads', 'avatar'),           // 用户的图像目录
    movieDir: path.join(__dirname, 'www', 'uploads', 'movie'),
    movieurl: 'http://vip.iqiyi.com/hot.html?cid=1',                       // 电影地址，
    movielist: [],                                                         // 存储了用户获取的电影列表信息
    //视频解析接口
    parseUrl: 'https://cdn.yangju.vip/k/?url=',
    userlist: 0
}