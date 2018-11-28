const db = require('./db');

/**
 * 用户评论表的处理
 * @param comments
 * @constructor
 */
function Comment(comments) {
    this.id = comments.id;
    this.content = comments.content;
    this.movie_id = comments.movie_id;
    this.user_id = comments.user_id;
    this.addtime = comments.addtime;
}
/**
 * 开始执行数据插入的操作
 */
Comment.prototype.save = async function () {
    // 开始执行数据插入操作
    let params = [this.content, this.movie_id, this.user_id, this.addtime];
    return await db.query('insert into comments values (null, ?, ?, ?, ?)', params);
}

/**
 * 根据用户id获取用户的评论信息，包含评论信息和用户信息
 * @param id
 */
Comment.getCommentByCurrentPage_UserId = async function (param) {
    let params = [param.user_id, param.start, param.pageSize];
    return await db.query('select users.id, users.uname, users.face, comments.addtime, comments.content  from users, comments where users.id = comments.user_id and comments.user_id = ? ORDER BY comments.addtime desc limit ?, ?', params);
}

/**
 * 根据影视编号获取分页评论信息
 * @param params
 */
Comment.getCommentByCurrentPage_MovieId = async function (param) {
    let params = [param.movie_id, param.start, param.pageSize];
    return await db.query('select users.id, users.uname, users.face, comments.addtime, comments.content from users, comments where users.id = comments.user_id and movie_id=? ORDER BY comments.addtime desc LIMIT  ?, ?', params);
}


/**
 * 根据影视id获取对应的评论数量
 * @param callback
 */
Comment.getCommenCountByMovieId = async function (movie_id) {
    return await db.query('select count(*) as pageNums from comments where movie_id=?', [movie_id]);
}


/**
 * 根据用户id获取评论数量
 */
Comment.getCommentCountByUserId = async function (uid) {
    return await db.query('select count(*) from comments where user_id = ?', [uid]);
}

module.exports = Comment;