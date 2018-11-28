"use strict";

const MovieCol = require('../models/moviecol');
const ResponseWrapper = require('../utils/response_wrapper');
const logger = require('../utils/log').getLogger();
/**
 * 用于处理用户的 收藏电影的请求
 * @param req
 * @param res
 */
exports.doColMovie = async function (req, res) {
    let response_wrapper = new ResponseWrapper(res);
    try {
        let movieurl = req.body.url;
        let uid = req.session.user.id;
        //1为取消收藏，0为收藏
        let tag = parseInt(req.params.tag);

        // 去除特殊字符
        // movieurl.replace('#', '');
        // 开始还原为最初始的url地址http://www.iqiyi.com/v_19rrk2p2mo.html
        // movieurl = 'http://www.iqiyi.com/' + movieurl;

        if (!movieurl || !uid) {
            return res.json({
                code: 0,
                msg: 'faild'
            });
        }
        let colmovie = new MovieCol({
            movieurl,
            uid
        })
        if (tag === 0) {
            // 收藏
            let result = await colmovie.save();
            if (!result.insertId > 0) {
                return res.json({
                    code: 0,
                    msg: 'faild'
                });
            }
            return res.json({
                code: 1,
                msg: 'success'
            });
        } else if (tag === 1) {
            // 删除 (取消电影收藏的列表信息)
            await MovieCol.deleteColMovie(uid, movieurl);
            return res.json({
                code: 1,
                msg: 'success'
            });
        }
    } catch (error) {
        //写错误日志
        logger.error(error);
        return response_wrapper.error('HANDLE_ERROR');
    }

}

/**
 *获取用户收藏的电影信息
 * @param req
 * @param res
 */
exports.showUserColMovie = async function (req, res) {
    let response_wrapper = new ResponseWrapper(res);
    try {
        let uid = req.session.user.id;
        let tag = req.body.tag;
        if (tag !== 'comment') {
            return res.json({
                err: 0,
                msg: 'faild'
            });
        }
        //获取用户收藏的所有电影
        let result = await MovieCol.getColMovieDetails(uid);
        if (result.length) {
            //处理电影对应的url，用户上传url修改为电影的id信息。
            result.forEach(function (element) {
                if (element.source === 1) {
                    element.url = '/play/' + element.id;
                } else {
                    let url = element.url;
                    element.url = url.toString().substring(url.lastIndexOf('/') + 1)
                    element.url = '/play/' + element.url;
                }
            });
        }
        return res.json({
            code: 1,
            msg: result
        });
    } catch (error) {
        //写错误日志
        logger.error(error);
        return response_wrapper.error('HANDLE_ERROR');
    }
}