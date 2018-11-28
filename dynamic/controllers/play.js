"use strict";

const Comments = require('../models/comment');
const moment = require('moment');
moment.locale('zh-cn');
const Movie = require('../models/movie');
const MovieCol = require('../models/moviecol');
const ResponseWrapper = require('../utils/response_wrapper');
const logger = require('../utils/log').getLogger();
/**
 * 电影播放页面
 * @param req
 * @param res
 */
exports.showPlay = async function (req, res) {
    let response_wrapper = new ResponseWrapper(res);
    try {
        //视频分为爱奇艺在线视频和用户本地上传视频。如果是用户上传的视频，接收到的url值为视频对应的编号。
        let url = req.params.url.toString();
        let movie, playUrl;
        if (parseInt(url)) {
            //用户上传
            movie = await Movie.getMovieById(parseInt(url));
            playUrl = movie[0]['url'];
            url = movie[0]['url'];
        } else {
            //爱奇艺视频
            url = 'http://www.iqiyi.com/' + url;
            movie = await Movie.getMovieByUrl(url);
            playUrl = req.app.locals.config.movieParseUrl + url;
        }
        //格式化修改影视添加时间
        movie[0].addtime = moment(movie[0].addtime).format('YYYY-MM-DD');
        //修改播放数量
        await Movie.updatePlayNumsById(movie[0]['id']);
        let params = {
            movie_id: movie[0]['id'],
            start: 0,
            pageSize: req.app.locals.config.pageSize
        }
        let pageNums = Math.ceil(movie[0]['commentnum'] / req.app.locals.config.pageSize) || 1;
        // 获取当前页面的所有评论信息
        let commentRows = await Comments.getCommentByCurrentPage_MovieId(params);
        commentRows.forEach(function (element) {
            // 设置为时间格式，几天前
            element.addtime = moment(element.addtime).startOf('second').fromNow();
        });
        //判断该影视是否被用户收藏
        let isCollectMovie = false;
        if (req.session.user) {
            let uid = req.session.user.id;
            // 如果用户收藏了这个电影的话
            let result = await MovieCol.getMovieColByUserId_MovieId(uid, movie[0]['id']);
            if (result.length > 0) {
                isCollectMovie = true;
            }
        }
        //没有登陆就直接返回
        return res.render('play', {
            user: req.session.user,
            comments: commentRows,
            pageNum: pageNums,
            playUrl: playUrl,
            movie: movie[0],
            comemntNum: movie[0]['commentnum'],
            isCollectMovie: isCollectMovie
        });
    } catch (error) {
        //写错误日志
        logger.error(error);
        return response_wrapper.error('HANDLE_ERROR');
    }

    // 如果用户在切换电影（上一个/下一个），我就随机从数据库中查询出来一条数据返回给用户
    let index = req.params.index;
    // if (index == 0) {
    //     Movie.getOneRandomMovie(function (err, result) {
    //         if (err) {
    //             return next(err);
    //         }
    //         //修改电影播放的url地址
    //         // if (result.length) {
    //         //     let url = result[0].url;
    //         //     url = url.toString().substring(url.toString().lastIndexOf('/') + 1)
    //         //     result[0].url = url;
    //         // }
    //         return res.json({
    //             code: 1,
    //             movie: result
    //         });
    //     })
    //     return;
    // }
}


/**
 * 对电影或者电视剧发表评论发布用户评论
 * @param req
 * @param res
 * @param next
 */
exports.publishComment = async function (req, res) {
    let response_wrapper = new ResponseWrapper(res);
    try {
        let content = req.body.content || '该条评论为空';
        // 直接把当前时间转换为标准时间格式HH是24小时的，hh是12小时的
        let addtime = moment().format('YYYY-MM-DD HH:mm:ss')
        // 用户的ID编号
        let user_id = req.session.user.id;
        let movie_id = req.body.movie_id;
        let comments = new Comments({
            content,
            addtime,
            user_id,
            movie_id
        })
        //保存评论信息
        let result = await comments.save();
        if (result.insertId <= 0) {
            return res.json({
                code: 0,
                msg: 'faild'
            });
        }
        //向电影表中添加该视频对应评论的数量
        await Movie.updateCommentNumById(movie_id);
        return res.json({
            code: 1,
            id: result.insertId,
            msg: 'success'
        })
    } catch (error) {
        //写错误日志
        logger.error(error);
        return response_wrapper.error('HANDLE_ERROR');
    }
}


