// 数据抓取层，实现数据入库
"use strict";


const cheerio = require('cheerio');
const request = require('request');
const Movie = require('../models/movie');
const moment = require('moment');
const fs = require('fs');
const path = require('path');
const data = require('../data/index');
const TV = require('../models/tv');
const utils = require('../utils/utils');
const Comment = require('../models/comment');
const ResponseWrapper = require('../utils/response_wrapper');
const logger = require('../utils/log').getLogger();
const db = require('../models/db');

/**
 * 添加电影的细节信息描述（未插入数据到数据库）
 * 从爱奇艺上抓取排行榜靠前的电影数据，包括图片，描述，评分
 * 
 * 
 * @param req
 * @param res
 */
exports.showMovieAddDetails = async function (req, res) {
    let response_wrapper = new ResponseWrapper(res);
    try {
        let movieurl = req.app.locals.config.movieurl;

        // 开始专区数据信息,现在主要不会使用前后端分离的实践
        let requestAsync = utils.convert(request);
        let body = await requestAsync(movieurl);
        var $ = cheerio.load(body[0].body);
        // 拿到电影的列表DOM元素
        /** 排行榜的数据标签
         * <a class="site-piclist_pic_link" href="http://www.iqiyi.com/v_19rr7peols.html" title="蚁人2：黄蜂女现身" target="_blank" rseat="709181_热播榜二级页_电影3">
    <img width="180" height="236" title="蚁人2：黄蜂女现身" rseat="709181_热播榜二级页_电影3" alt="蚁人2：黄蜂女现身" data-src="//pic8.iqiyipic.com/image/20181114/b8/b4/v_112880676_m_601_m12_180_236.jpg">
    <p class="site-piclist_icons-lt">
        <span class="dypd_piclist_nub dypd_piclist_nubHot hot-three">3</span>
    </p>
    <p class="play_coverWrap" data-videolist-elem="playbtn"><i class="site-icons icon-play5858"></i></p>
    </a>
         */
        let site_piclist = $('.site-piclist_pic_link');
        /**
         * <p class="site-piclist_info_describe">海昏侯墓终极大揭秘</p>
         */
        let site_piclist_info_describe = $('.site-piclist_info_describe');
        //评分
        /**
         * <span class="score">
     <strong class="num">9</strong>.1
    </span>
         */
        let score = $('.score');
        //let desc = $('.site-piclist_info_describe');
        // let len = site_piclist.length;
        let movieList = [];
        if (site_piclist && site_piclist.length > 0) {
            site_piclist.each(function (index) {
                var pic_item = site_piclist[index];
                if (pic_item) {
                    let href = $(pic_item).attr('href');
                    let title = $(pic_item).attr('title');
                    let img = $(pic_item).children()['0'];
                    let width = img['attribs']['width'];
                    let height = img['attribs']['height'];
                    // http://pic2.iqiyipic.com/image/20180822/7d/33/v_118006948_m_601_m4_180_236.jpg
                    let imgSrc = 'http:' + img['attribs']['data-src'];

                    //let movieinfoStr = `${href}, ${title}, ${width}, ${height}, ${imgSrc}, ${$(site_piclist_info_describe[index]).text()}, ${$(score[index]).html()}, ${$(desc[index]).text()}`;
                    movieList.push({
                        url: href,
                        title: title,
                        width: width,
                        height: height,
                        logo: imgSrc,
                        info: $(site_piclist_info_describe[index]).text(),
                        score: $(score[index]).html().trim()
                    });
                }
            })
        }
        // 在这里判断
        movieList.length = 50;
        // len = 50;
        // if (movieList.length === len) {
        movieList = saveImages(movieList);
        req.app.locals.config.movielist = movieList;
        return res.json({
            code: 1,
            movies: movieList
        });
    } catch (error) {
        //写错误日志
        logger.error(error);
        return response_wrapper.error('HANDLE_ERROR');
    }
}


/**
 * 将上面抓取的数据放入到数据库中
 * @param req
 * @param res
 */
exports.addMovie = async function (req, res) {

    let response_wrapper = new ResponseWrapper(res);
    try {
        // let checkNum = req.body.checkNum;
        // console.log('开始进行数据入库了', checkNum, req.app.locals.config.movielist)
        // if (checkNum != -9999) {
        //     // console.log('传参不一致，返回');
        //     return res.json({
        //         code: 0,
        //         msg: '数据入库失败'
        //     })
        // }
        // 开始获取用户抓取的结果
        let movieList = req.app.locals.config.movielist;
        // console.log('读取本地抓取记录', movieList)
        if (movieList) {
            // console.log('数据去重成功……………………, 有效记录', movieList.length - movieList.length, '条', '去重记录', movieList.length + '条')
            // 3. 开始把去重之后的数据插入到数据库

            movieList = movieList.map((item, index) => {
                let total = item.score.replace(/\D/g, '');
                let url = item.url;
                let title = item.title;
                let logo = item.logo;
                let info = item.info;
                let score = total.substring(0, total.length - 1);
                // let addtime = moment().format('YYYY-MM-DD HH:mm:ss');
                let playnum = 0;
                let commentnum = 0;
                // let release_time = now();
                let type = '电影';
                let little_score = total.substring(total.length - 1);
                let movie = [null, title, url, info, logo, score, playnum, commentnum, new Date(), new Date(), type, little_score, 2];
                return movie;
            })
            let params = [];
            for (let item of movieList) {
                params = params.concat(item);
            }
            let picKey = ['id', 'title', 'url', 'info', 'logo', 'score', 'playnum', 'commentnum', 'release_time', 'addtime', 'type', 'little_score', 'source'];
            let insertSql = `insert into movies(${picKey.join()}) values ${movieList.map(() => `(${picKey.map(() => '?').join()})`)}`;
            let result = await db.query(insertSql, params);
            //执行去重复sql语句，同时删除重复数据对应的图片
            await delete_movie();
            return res.json({
                code: 0,
                msg: result
            })
        }
    } catch (error) {
        //写错误日志
        logger.error(error);
        return response_wrapper.error('HANDLE_ERROR');
    }
}


/**
 * 展示电影添加界面
 * @param req
 * @param res
 * @param next
 */
exports.showMovieAdd = function (req, res) {
    // 专门用于添加电影
    res.render('admin');
}


/**
 * 当前的搜索电影页面
 * @param req
 * @param res
 * @param next
 */
exports.showSearchMovie = function (req, res, next) {
    res.render('search');
}


/**
 * 数据库中查询数据信息
 * @param req
 * @param res
 * @param next
 */
exports.doSearchMovie = async function (req, res) {
    let response_wrapper = new ResponseWrapper(res);
    try {
        // 换一种思路来解析数据， 开始从网上抓取数据信息
        let searchMoviename = req.query.moviename;
        let pageSize = req.app.locals.config.pageSize;
        let currentPage = req.query.currentPage || 1;
        // 这里需要判断一下，如果用户输入的是url地址的话,只有播放的功能
        if (searchMoviename.startsWith('http')) {
            //searchMoviename = searchMoviename.substring(searchMoviename.lastIndexOf('/') + 1);
            searchMoviename = req.app.locals.config.movieParseUrl + searchMoviename;

            // 开始获取用户评论的数据信息
            // 获取评论的详细信息
            // 就直接解析当前地址， 然后播放视频
            return res.render('play', {
                playUrl: searchMoviename,
                comments: [],
                pageNum: 1,
            });

        }
        //从站内获取数据
        //获取数据
        let result = await Movie.getMovieByName(searchMoviename);
        result.map((item) => {
            if (item.source === 1) {
                item.url = item.id;
            } else {
                item.url = item.url.substring(item.url.toString().lastIndexOf('/') + 1);
            }
        })
        if (result.length > 3) {
            result.length = 3;
        }
        return res.render('search', {
            movies: result
        });
    } catch (error) {
        //写错误日志
        logger.error(error);
        return response_wrapper.error('HANDLE_ERROR');
    }
}


/**
 * 保存图片信息到本地
 * @param movieList
 */
function saveImages(movieList) {
    // let nums = movieList.length;
    let tempArr = [];
    if (movieList && movieList.length > 0) {
        movieList.forEach(function (item) {
            // 保存成功之后，开始下载图片到本地 saveDir = '/www/uploads/movie/' + time + '.jpg';
            let url = item.url.substring(item.url.lastIndexOf('/') + 1);
            if (url) {
                tempArr = url.toString().split('.');
                if (tempArr.length === 2) {
                    url = tempArr[0];
                }
                let newPath = '../www/uploads/image/' + (+new Date()) + url + '.jpg';
                // 开始下载图片数据信息
                request(item.logo).pipe(fs.createWriteStream(path.join(__dirname, newPath)));
                item.logo = newPath.substr(2);
                // nums--;
                // if (nums === 0) {
                //     callback(null);
                // }
            }
        })
    }
    return movieList;
}


/**
 * 获取电视剧列表信息，这个方法有问题，循环查询数据肯定不行
 * @param req
 * @param res
 * @param next
 */
exports.doGetTVs = function (req, res, next) {
    data.getTVsOnline(function (err, result) {
        if (err) {
            return next(err);
        }
        // 开始插入数据到数据库
        let index = 0;
        if (result.length > 0) {
            result.forEach(function (element) {
                let title = element.title;
                let info = element.info;
                let url = element.url;
                let tv = new TV({
                    title,
                    info,
                    url
                });
                tv.save(function (err, result) {
                    if (err) {
                        return next(err);
                    }
                    index++;

                    if (result.length === index) {
                        console.log('数据全部入库成功！')
                    }
                });
            })
        }
    })
}


/**
 * 使用get请求获取电影的方式(使用get方式搜索需要设置权限)
 * @param req
 * @param res
 * @param next
 */
exports.doSearchMovieOnline = function (req, res, next) {
    let searchMoviename = req.params.content;
    if (!searchMoviename) {
        return;
    }

    // 这里需要判断一下，如果用户输入的是url地址的话
    if (searchMoviename.startsWith('http')) {
        //searchMoviename = searchMoviename.substring(searchMoviename.lastIndexOf('/') + 1);
        searchMoviename = 'http://jx.598110.com/index.php?url=' + searchMoviename;

        // 开始获取用户评论的数据信息
        let params = {
            start: 0,
            pageSize: 5
        }
        // 获取评论的详细信息
        Comment.getCommentByCurrentPage(params, function (err, comments) {
            if (err) {
                return next(err);
            }

            // 获取评论数量信息
            Comment.getCommentNums(function (err, pageInfo) {
                if (err) {
                    return next(err);
                }
                let pageNum = pageInfo.pageNums;
                // 就直接解析当前地址， 然后播放视频
                return res.render('play', {
                    playUrl: searchMoviename,
                    comments: comments,
                    pageNum: Math.ceil(pageNum / 5),
                });
            })
        })
        return;
    }

    // 直接从爱奇艺网站抓取数据
    data.searchMovie(searchMoviename, function (err, movies) {
        if (err) {
            return next(err);
        }
        // 如果没有找到的话就去数据库中找一下
        if (movies.length === 0) {
            Movie.getMovieByName(searchMoviename, function (err, result) {
                if (err) {
                    return next(err);
                }
                if (result.length > 3) {
                    result = [result[0], result[1], result[2]];
                }
                result.forEach(function (element) {
                    let url = element.url;
                    element.url = url.substring(url.lastIndexOf('/') + 1)
                    element.addtime = moment(element.addtime).format('YYYY-MM-DD');
                    if (element.info.toString().length > 20) {
                        element.info = element.info.toString().substring(0, 30);
                    }
                })
                return res.render('search', {
                    movies: result
                });
            })
        } else {
            movies.forEach(function (element) {
                let url = element.url;
                element.url = url.substring(url.lastIndexOf('/') + 1);
                element.addtime = moment().format('YYYY-MM-DD');
                if (element.info.toString().length > 50) {
                    element.info = element.info.toString().substring(0, 50);
                }
            })
            // 返回抓取的所有信息
            return res.render('search', {
                movies: movies
            });
        }
    })
}

/**
 * 数据库表数据去重复
 */
async function delete_movie() {
    let deleteSql = `select id,logo from movies   
    where url  in (select  url  from movies  group  by  url   having  count(url) > 1)  
    and  id   not in (select max(id) from  movies  group by url  having count(url )>1)`;
    let delete_result = await db.query(deleteSql);
    if (delete_result.length !== 0) {
        //执行删除重复数据操作
        let ids = delete_result.map((it) => { return it.id });
        let logos = delete_result.map((it) => { return it.logo });
        await db.query(`delete from movies where id in ( ${ids.map(() => '?').join()} )`, ids);
        //删除图片信息操作
        let filepath = path.join(__dirname, '../');
        for (let logo of logos) {
            try {
                //如果找不到图片文件，不进行处理
                fs.unlinkSync(filepath + logo);
            } catch (error) {
                console.log(error);
            }
        }
    }
}