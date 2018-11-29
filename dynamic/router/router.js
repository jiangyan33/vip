
const express = require('express');
// const app = express();
const router = express.Router();
// const config = require('config');
// const db = require('../models/db');
const upload = require('multer')();





const indexController = require('../controllers/index');
const userController = require('../controllers/user');
const playController = require('../controllers/play');
const commentController = require('../controllers/comment');
const movieController = require('../controllers/movie');
const colmovieController = require('../controllers/moviecol');
const adminController = require('../controllers/admin');
// 前台路由控制中心-------------------------------------------------------------------------------------------------------------------

//网站首页
router.get('/', indexController.showIndex);                             // 用户首页信息的展示
router.post('/index/:currentPage', indexController.showIndex);


//用户模块
router.get('/register', [checkLogin, userController.showRegister]);
router.post('/register', userController.doRegister);                    // 用户注册页面提交
router.get('/login', [checkLogin, userController.showLogin]);           // 用户登录页面
router.post('/login', userController.doLogin);                          // 用户登录
router.get('/logout', userController.doLogout);                         // 用户退出
router.get('/user', [checkNotLogin, userController.showUser]);                           // 显示用户中心
router.post('/user', [checkNotLogin, userController.doUser]);                            // 用户修改信息之后提交数据
// router.post('/user/upload', [upload.single('pic'), userController.uploadImage]);  // 图片上传
router.get('/captcha', userController.getCaptcha);                // 获取验证码
router.post('/userlog', userController.showUserlogs);                   // 用户中心显示日志
router.get('/comment/:currentPage', commentController.showUserComment);                 // 用户中心显示评论
router.post('/colmovie/:currentPage', colmovieController.showUserColMovie);                 //显示用户收藏的电影


//播放模块
router.get('/play', playController.showPlay);                           // 电影播放
router.post('/play', playController.publishComment);                    // 播放页面的用户评论
router.get('/play/:url', playController.showPlay);                      // 显示评论
router.get('/comment', commentController.showMovieComment)     //播放页面的评论信息
// router.get('/play/current/:index', playController.showPlay);             // 实现上一集下一个的效果（随机效果）
router.post('/play/colmovie/:tag', colmovieController.doColMovie);




// router.get('/search', movieController.showSearchMovie);
// //在线搜索视频
// router.get('/search/:content', movieController.doSearchMovieOnline);




//抓取数据模块
router.get('/showMovieAddDetails', movieController.showMovieAddDetails);
router.post('/addMovie', movieController.addMovie);     //将抓取的数据插入到数据库
router.get('/search', movieController.doSearchMovie);       //搜索功能
// //测试xtpl使用数据
//站内搜索


//测试sql语句使用
router.get('/test', indexController.test);




// //上传视频模块
router.get('/showAddMovie', movieController.showMovieAdd);
let fields = [{ name: 'logo', maxCount: 1 }, { name: 'video', maxCount: 1 }];
router.post('/video/upload', upload.fields(fields), adminController.upload);

// 路由跳转检查中心-------------------------------------------------------------------------------------------------------------------
function checkLogin(req, res, next) {
    // 如果用户登录成功的话(已经登录的用户就不能访问注册和登陆页面了，直接跳转到用户首页)
    if (req.session.user) {
        // 直接跳转到首页去
        return res.redirect('/');
    }
    // 如果用户没有登陆的话就继续向下执行， next（）之后就会执行下一个中间件
    next();
}

function checkNotLogin(req, res, next) {
    // 如果没有登录就直接跳转到首页
    if (!req.session.user) {
        return res.redirect('/');
    }
    // 就执行下一个中间件
    next();
}


module.exports = router;