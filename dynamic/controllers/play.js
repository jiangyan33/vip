"use strict";

const Comments = require('../models/comment');
const config = require('../config');
const moment = require('moment');
moment.locale('zh-cn');
const Movie = require('../models/movie');
const MovieCol = require('../models/moviecol');

/**
 * 电影播放页面
 * @param req
 * @param res
 * @param next
 */
exports.showPlay = function (req, res, next) {
    let url = req.params.url.toString();
    //取图片地址最后的一部分
    url = 'http://www.iqiyi.com/' + url.substring(url.indexOf('/') + 1);
    //将视频解析地址和视频播放地址进行拼接
    let playUrl = config['parseUrl'] + url;

    // 如果用户在切换电影（上一个/下一个），我就随机从数据库中查询出来一条数据返回给用户
    let index = req.params.index;
    if (index == 0) {
        Movie.getOneRandomMovie(function (err, result) {
            if (err) {
                return next(err);
            }
            //修改电影播放的url地址
            // if (result.length) {
            //     let url = result[0].url;
            //     url = url.toString().substring(url.toString().lastIndexOf('/') + 1)
            //     result[0].url = url;
            // }
            return res.json({
                code: 1,
                movie: result
            });
        })
        return;
    }


    // 根据Url地址获取电影的详细信息（其他的所有情况处理）
    Movie.getMovieByUrl(url, function (err, movie) {
        if (err) {
            return next(err);
        }
        /**
         * this.title, this.url, this.info, this.logo, this.score, this.playnum, this.commentnum, this.release_time, this.type, this.little_socre
         */
        if (!movie.length) {
            let data = {
                title: req.body.title,
                url: req.body.url,
                info: req.body.info,
                logo: req.body.logo,
                score: req.body.score,
                little_socre: req.body.little_socre,
                playnum: 0,
                commentnum: 0,
                release_time: new Date(),
                type: '电影'
            };
            let movie = new Movie(data);
            movie.save()
        }else{
            movie[0].addtime = moment(movie[0].addtime).format('YYYY-MM-DD');
        }

        // 每次进来之后，开始去数据库中修改这个电影的播放次数信息
        Movie.updatePlayNumsByUrl(url, function (err, result) {
            if (err) {
                return next(err);
            }
            // 每页显示5个
            let params = {
                movie_id: movie[0]['id'],
                start: 0,
                pageSize: 5
            }
            let pageNums = movie[0]['commentnum'];
            // 获取当前页面的所有评论信息
            Comments.getCommentByCurrentPage(params, function (err, comments) {
                if (err) {
                    return next(err);
                }

                // 获取得到的结果数组，修改日期的格式信息
                comments.forEach(function (element) {
                    // 设置为时间格式，几天前
                    element.addtime = moment(element.addtime).startOf('second').fromNow();
                })
                // 获取用户收藏的电影信息
                let isCollectMovie = false;
                if (req.session.user) {
                    let uid = req.session.user.id;
                    // 获取电影收藏的详细信息
                    MovieCol.getMovieColByUserId(uid, function (err, result) {
                        if (err) {
                            return next(err);
                        }
                        // 如果用户收藏了这个电影的话

                        let flag = result.filter((element) => element.id === movie[0]['id']);
                        if (flag.length > 0) {
                            isCollectMovie = true;
                        }
                        return res.render('play', {
                            user: req.session.user,
                            comments: comments,
                            pageNum: Math.ceil(pageNums / 5),
                            playUrl: playUrl,
                            movie: movie[0],
                            comemntNum: movie[0]['commentnum'],
                            isCollectMovie: isCollectMovie
                        });
                    })
                    return;
                }

                res.render('play', {
                    user: req.session.user,
                    comments: comments,
                    pageNum: Math.ceil(pageNums / 5),
                    playUrl: playUrl,
                    movie: movie[0],
                    comemntNum: movie[0]['commentnum'],
                    isCollectMovie: isCollectMovie
                });
            })
        })
    })
}


/**
 * 对电影或者电视剧发表评论发布用户评论
 * @param req
 * @param res
 * @param next
 */
exports.publishComment = function (req, res, next) {
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
    comments.save(function (err, result) {
        if (err) {
            return next(err);
        }
        let insertId = result.insertId;
        if (insertId <= 0) {
            return res.json({
                code: 0,
                msg: 'faild'
            });
        }
        //向电影表中添加该视频对应评论的数量
        Movie.updateCommentNumById(movie_id, function (err, result) {
            if (err) {
                return next(err);
            }
            return res.json({
                code: 1,
                id: insertId,
                msg: 'success'
            })
        })
    })

}


