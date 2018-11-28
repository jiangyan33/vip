"use strict";

const Movie = require('../models/movie');
const Preview = require('../models/preview');
const TV = require('../models/tv');
const ResponseWrapper = require('../utils/response_wrapper');
const logger = require('../utils/log').getLogger();
const db = require('../models/db');

/**
 * 显示首页信息
 * @param req
 * @param res
 */
exports.showIndex = async function (req, res) {
    let response_wrapper = new ResponseWrapper(res);
    let return_data = {};
    // 为了实现ajax分页的效果
    let pageNow = req.params.currentPage || 1;
    let pageSize = 10;
    let params = {
        start: (pageNow - 1) * pageSize,
        pageSize: pageSize
    };
    let type = req.body.type;
    try {
        if (type === 'tv') {
            // 1. 获取电视列表所有信息
            let TVResult = await TV.getTVSByCurrentPage(params);
            //修改访问的url
            TVResult.map((item) => {
                item.url = item.url.substring(item.url.toString().lastIndexOf('/') + 1);
            });
            // 2. 获取电视列表的总数量信息
            let TVCount = await TV.getTVPageNums();
            let pageNum = Math.ceil(TVCount[0].pageNum / pageSize);
            return_data = {
                tvs: TVResult,
                tvPageNum: pageNum
            };
            return res.json(return_data);
        } else {
            // 获取首页轮播图效果
            let previewResult = await Preview.getPreview();
            previewResult.map((item) => {
                item.playurl = item.playurl.substring(item.playurl.toString().lastIndexOf('/') + 1);
            });
            // 获取电影的数量信息
            let movieCount = await Movie.getMoviePageNums();
            let pageNum = Math.ceil(movieCount[0].pageNum / pageSize);

            // 展示首页的时候，开始去数据库中查询数据
            let movieResult = await Movie.getMoviesByCurrentPage(params);
            movieResult.map((item) => {
                if (item.source === 1) {
                    item.url = item.id;
                } else {
                    item.url = item.url.substring(item.url.toString().lastIndexOf('/') + 1);
                }
            });
            // 用户注册成功的话，就去直接跳转到首页信息(如果是默认请求首页的话)
            if (pageNow === 1) {
                return res.render('index', {
                    user: req.session.user,
                    movies: movieResult,
                    pageNum: pageNum,
                    previews: previewResult,
                });
            }
            // 主要问题，如果用户直接请求的是url地址，返回的是json 数据， 解决方式，使用POST请求
            // 其他页面的话，就直接返回json数据信息(为了搜索引擎，这里不适用这种分页方式)
            return res.json({
                code: 1,
                movies: movieResult,
                pageNum: pageNum
            });
        }
    } catch (error) {
        //写错误日志，可以加上接口的名称
        logger.error(error);
        return response_wrapper.error('HANDLE_ERROR');
    }
}

exports.test = async function (req, res) {
    let result = await db.query('delete from movies where id in (1,2)');
    return res.json(['ok']);
}