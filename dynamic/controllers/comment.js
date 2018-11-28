const Comment = require('../models/comment');
const moment = require('moment');
const ResponseWrapper = require('../utils/response_wrapper');
const logger = require('../utils/log').getLogger();
// 使用中文显示时间
moment.locale('zh-cn');


/**
 * 展示用户的评论详细信息
 * @param req
 * @param res
 */
exports.showUserComment = async function (req, res) {
    let response_wrapper = new ResponseWrapper(res);
    try {
        // 获取当前显示的页数
        let pageNow = parseInt(req.params.currentPage) || 1;
        let pageSize = req.app.locals.config.pageSize;
        // 每页显示5个
        let params = {
            user_id: req.session.user.id,
            start: (pageNow - 1) * pageSize,
            pageSize: pageSize
        }
        //  用户的评论数量
        let commentCount = await Comment.getCommentCountByUserId(params['user_id']);
        //当前页面的评论信息
        let commentRows = await Comment.getCommentByCurrentPage_UserId(params);
        // 修改时间显示的格式

        // 在这里把时间修改为相对时间,如果commentRows为空，对foreach不影响
        commentRows.forEach(function (element) {
            element.addtime = moment(element.addtime).format('YYYY-MM-DD HH:mm:ss');
        })
        // 向上取整
        let pageNum = Math.ceil(commentCount / pageSize)||0;
        return res.json({
            code: 1,
            comments: commentRows,
            pageNum: pageNum
        });
    } catch (error) {
        //写错误日志，可以加上接口的名称
        logger.error(error);
        return response_wrapper.error('HANDLE_ERROR');
    }
}


/**
 * 获取影视的评论信息
 */
exports.showMovieComment = async function (req, res) {
    let response_wrapper = new ResponseWrapper(res);


    // 获取当前显示的页数
    let pageNow = parseInt(req.query.currentPage) || 1;
    let movieId = req.query.movieId;
    let pageSize = req.app.locals.config.pageSize;
    // 每页显示5个
    let params = {
        movie_id: movieId,
        start: (pageNow - 1) * pageSize,
        pageSize: pageSize
    }
    //  用户的评论数量
    let commentCount = await Comment.getCommenCountByMovieId(movieId);
    //当前页面的评论信息
    let commentRows = await Comment.getCommentByCurrentPage_MovieId(params);
    // 修改时间显示的格式
    // 在这里把时间修改为相对时间
    commentRows.forEach(function (element) {
        element.addtime = moment(element.addtime).startOf('second').fromNow();
    })
    // 向上取整
    let pageNum = Math.ceil(commentCount / pageSize)||1;
    return res.json({
        code: 1,
        comments: commentRows,
        pageNum: pageNum
    });
}

