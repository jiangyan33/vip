const db = require('../models/db');

/**
 * 用户收藏的电影详细信息
 * @param moviecol
 * @constructor
 */
function MovieCol(moviecol) {
    this.movie_url = moviecol.movieurl;
    this.user_id = moviecol.uid;
}



/**
 * 保存用户收藏的电影信息
 */
MovieCol.prototype.save = async function () {
    return await db.query('insert into colmovie values (null, ?, ?, NOW())', [this.movie_url, this.user_id]);
}
/**
 * 获取收藏信息
 */
MovieCol.getMovieColByUserId_MovieId = async function (uid, movieId) {
    return await db.query('select * from colmovie where user_id = ? and movie_url=? limit 1', [uid, movieId]);
}

/**
 * 直接物理删除用户收藏的电影信息
 * @param uid
 */
MovieCol.deleteColMovie = async function (uid, url) {
    return await db.query('delete from colmovie where user_id = ? and movie_url = ?', [uid, '' + url + '']);
}

/**
 * 获取用户的收藏电影的详细信息
 * @param uid
 */
MovieCol.getColMovieDetails = async function (uid) {
    return await db.query('select movies.title as title, movies.info as info, colmovie.addtime as addtime, movies.url as url from movies , colmovie WHERE movies.url = colmovie.movie_url and colmovie.user_id = ?', [uid]);
}

module.exports = MovieCol;