"use strict";

//获取验证码
const svgCaptcha = require('svg-captcha');
const User = require('../models/user');
const utility = require('utility');   // 需要的MD5加密工具包
const path = require('path');
const fs = require('fs');
const utils = require('../utils/utils');
const Userlog = require('../models/userlog');
const moment = require('moment');
const ResponseWrapper = require('../utils/response_wrapper');
const logger = require('../utils/log').getLogger();
const uuidv1 = require('uuid/v1');
/**
 * 展示用户注册的页面信息
 * @param req
 * @param res
 */
exports.showRegister = function (req, res) {
    // 由于之前已经配置了页面跳转的中间件，这里就直接跳转到这个注册页面就行
    res.render('register');
}
/**
 * 用户点击注册按钮之后的业务逻辑
 * @param req
 * @param res
 * @param next
 */
exports.doRegister = async function (req, res) {
    let response_wrapper = new ResponseWrapper(res);
    try {
        // 1. 获取请求报文信息
        let { uname, email, phone, pwd2, vcode } = req.body;
        //世界时字符串
        let addtime = new Date().toUTCString();
        let session_vcode = req.session.captcha;
        let info = '初来乍到，请多多关照哈！'
        let face = '/www/images/userlogo.gif';
        // 2. 对用户输入的数据进行二次校验，先来看一下输入的验证码是否正常
        if (session_vcode && session_vcode.toLowerCase() !== vcode.toLowerCase()) {
            // 验证码输入错误的话，就直接报错给用户
            return response(res, 1001, '验证码输入错误');
        }
        // 3. 验证码输入正确的前提下，开始去数据库中获取用户名信息，如果没有该用户信息，就把数据信息保存起来存储到数据库中去
        // 如果已经存在了这个用户的话，就去告诉用户数据已经存在了
        if ((await User.getUserByName(uname)).length) {
            return response(res, 1002, '用户名已存在');
        }
        // 开始进行数据加密(对用户的密码进行双重加密+加上自己的密匙)
        pwd2 = utility.md5(pwd2);
        // 对密码进行再次加密
        let pwd = utility.md5(pwd2 + req.app.locals.config.secretKey);

        // 开始插入数据到数据库
        let user = new User({
            uname,
            email,
            phone,
            pwd,
            addtime,
            info,
            face
        });
        let registerResult = await user.save();
        //TODD  对受影响的行数进行判断
        if (registerResult.affectedRows <= 0) {
            return response(res, 0, 'faild');
        }
        // 用户注册成功的话，把当前插入的用户ID保存起来（唯一性，后面可以直接通过这个ID去获取这个用户的详细信息）
        //等登陆成功再把用户信息放到session中
        return response(res, 1, 'success');
    } catch (error) {
        //写错误日志
        logger.error(error);
        return response_wrapper.error('HANDLE_ERROR');
    }
};
/**
 * 开始进入到登陆页面
 * @param req
 * @param res
 */
exports.showLogin = function (req, res) {
    res.render('login');
}
/**
 * 处理用户提交的数据信息
 * @param req
 * @param res
 */
exports.doLogin = async function (req, res) {
    let response_wrapper = new ResponseWrapper(res);
    try {
        // 1. 获取用户输入的参数信息
        let { uname, pwd, vcode, session_vcode } = req.body;
        let login_time = moment().format('YYYY-MM-DD HH:mm:ss')
        // 开始获取用户的默认IP信息
        let ip = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
        let address = '未知地址';
        if (session_vcode && vcode.toLowerCase() !== session_vcode.toLowerCase()) {
            return response(res, 1001, '验证码输入错误')
        }
        // 获取用户IP详细信息
        let result = await utils.getIPInfo(ip);
        if (result) {
            address = result.data.country + result.data.region + result.data.city + result.data.isp;
        }
        // 2. 开始校验（防止用户端禁用js）， 查询比对的实际上是加密过后的数据信息
        pwd = utility.md5(pwd);
        // 对密码进行再次加密
        pwd = utility.md5(pwd + req.app.locals.config.secretKey);
        // 3. 开始具体的业务逻辑校验
        // 3.1 用户是否存在（根据用户名查询出来用户记录信息）
        let userInfo = await User.getUserByName(uname);
        if (!userInfo.length) {
            return response(res, 0, '该用户不存在');
        }
        // 用户存在的话就开始校验密码是否正确
        if (pwd !== userInfo[0].pwd) {
            return response(res, 0, '密码错误');
        }
        // 写入数据到session
        req.session.user = userInfo[0];
        // console.log(login_time, ip, address, user_id);
        let user_id = userInfo[0].id;
        // 用户登录成功之后，开始把用户的登录日志写入到数据库
        let userlog = new Userlog({
            login_time,
            ip,
            address,
            user_id
        });
        await userlog.save();
        // 跳转到首页
        return response(res, 1, 'success');
    } catch (error) {
        //写错误日志
        logger.error(error);
        return response_wrapper.error('HANDLE_ERROR');
    }
}
/**
 * 进入用户管理中心的界面
 * @param req
 * @param res
 */
exports.showUser = function (req, res) {
    return res.render('user', {
        // 为了使得头部的显示正常
        user: req.session.user
    });
}
/**
 * 实现用户的退出
 * @param req
 * @param res
 */
exports.doLogout = function (req, res) {
    // 清空user的session，然后退出首页
    req.session.user = null;
    // 直接跳转到首页
    return res.redirect('/');
}
/**
 * 处理文件上传的请求
 * @param req
 * @param res
 * @param next
 */
exports.uploadImage = async function (req, res, next) {
    let response_wrapper = new ResponseWrapper(res);
    try {
        // formidable的parse方法没有找到异步的写法，放弃了
        let pic = req.file;
        let size = pic.size;
        // 1MB 的大小
        if (size > 1024 * 1024) {
            return response(req, 0, '请不要上传大于1MB的文件！');
        }
        // 随机生成的
        let filename = uuidv1() + path.extname(pic.originalname);
        //现在只修改的session中的数据，等修改的所有信息提交时再更新数据库
        let filePath = '/www/uploads/avatar/' + filename;
        req.session.user.face = filePath;
        let temp_path = path.join(__dirname, '../www/uploads/avatar/' + filename);
        fs.writeFileSync(temp_path, pic.buffer);
        return response(res, 1, filePath);
    } catch (error) {
        //写错误日志
        logger.error(error);
        return response_wrapper.error('HANDLE_ERROR');
    }
}
/**
 * 用于修改用户的详细信息
 * @param req
 * @param res
 * @param next
 */
exports.doUser = async function (req, res) {
    let response_wrapper = new ResponseWrapper(res);
    try {
        // 1. 获取表单参数信息
        let { id, pwd, face } = req.session.user;
        let { pwd1, pwd2, pwd3 } = req.body;

        let uname = req.body.uname || req.session.user.uname;
        let email = req.body.email || req.session.user.email;
        let phone = req.body.phone || req.session.user.phone;
        let info = req.body.info || req.session.user.info;

        // 检测初始密码是否正确
        if (pwd3) {
            // 旧密码
            pwd1 = utility.md5(pwd1);
            // 对密码进行再次加密
            pwd1 = utility.md5(pwd1 + req.app.locals.config.secretKey);
            // 开始进行密码检验
            if (pwd1 !== pwd) {
                return res.json({
                    code: 0,
                    msg: 'error'
                });
            }
        }
        // console.log('密码校验结束', pwd, pwd1, pwd2, pwd3);
        // 为了实现修改密码和会员中心修改的同步性，使用这个变量用来区分会员中心和修改密码这两个模块的信息修改
        if (pwd3) {
            // console.log('我是要开始修改密码了');
            // 开始修改密码
            pwd2 = utility.md5(pwd2);
            // 对密码进行再次加密
            pwd = utility.md5(pwd2 + req.app.locals.config.secretKey);
        }
        let user = new User({ id, uname, pwd, email, phone, info, face });
        let result = await user.update();
        //更新一下session中的数据
        req.session.user = user;
        if (result.changedRows > 0) {
            // 开始修改
            //当修改密码时才清空session
            if (pwd3) {
                req.session.user = null;
            }
            // 如果是修改密码的话，就直接跳转到登录首页(修改成功)
            return response(res, 1, 'success');
        }
        return response(res, 0, 'faild');
    } catch (error) {
        //写错误日志
        logger.error(error);
        return response_wrapper.error('HANDLE_ERROR');
    }
}


/**
 * 获取用户的日志详细记录信息
 * @param req
 * @param res
 * @param next
 */
exports.showUserlogs = async function (req, res) {
    let response_wrapper = new ResponseWrapper(res);
    try {
        let id = req.session.user.id;
        let result = await Userlog.getUserlogsById(id);
        // 转换日期格式信息
        if (result) {
            // 获取得到的结果数组，修改日期的格式信息
            result.forEach(function (element) {
                element.login_time = moment(element.login_time).format('YYYY-MM-DD HH:mm:ss');
            })
        }
        return response(res, 1, result);
    } catch (error) {
        //写错误日志
        logger.error(error);
        return response_wrapper.error('HANDLE_ERROR');
    }
}


/**
 * 用户发送get请求的时候获取验证码
 * @param req
 * @param res
 * @param next
 */
exports.getCaptcha = function (req, res) {
    // 获取验证码
    //res.send('123456');
    let captcha = svgCaptcha.create();
    // 把数据写入到session对象里面（第一次访问的话默认是没有验证码信息的）
    req.session.captcha = captcha.text;
    //console.log('获取验证码！', req.session.captcha)
    // 设置类型
    res.type('svg');
    // console.log(captcha.data)
    res.status(200).send(captcha.data);
}
//抽一个返回的方法
function response(res, code, msg) {
    res.json({
        code: code,
        msg: msg
    });
}

// function parseAsync(req, func) {
//     return new Promise((resolve, reject) => {
//         func(req, function (err, fileds, files) {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(fileds, files);
//             }
//         })
//     })
// }
