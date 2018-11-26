const db = require('./db');
/**
 * 定义电影实体的类对象
 * @param movie
 * @constructor
 */
function Movie(movie) {
    this.id = movie.id;
    this.title = movie.title;
    this.url = movie.url;
    this.info = movie.info;
    this.logo = movie.logo;
    this.score = movie.score;
    this.playnum = movie.playnum;
    this.commentnum = movie.commentnum;
    this.release_time = movie.release_time;
    this.addtime = movie.addtime;
    this.type = movie.type;
    this.little_socre = movie.little_socre;
}

/**
 * 插入数据到数据库,先一次保存一条数据
 */
Movie.prototype.save = async function () {
    let params = [this.title, this.url, this.info, this.logo, this.score, this.playnum, this.commentnum, this.release_time, this.type, this.little_socre];
    let result = await db.query(`insert into movies values(null, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?,?)`, params);
    // 如如完毕之后，开始执行数据去重操作,
    await db.query(`delete from movies where url  in (select url from (select url from movies group by url having count(url)>1) as tmp1) and id not in (select id from (select min(id) as id from movies group by url having count(url)>1) as temp2)`);
    return result;
}


/**
 * 获取所有的电影对象,这个不提供
 */
// Movie.getAllMovies = function (callback) {
//     db.query('select * from movies', [],
//         function (err, result) {
//             if (err) {
//                 return callback(err, null);
//             }

//             callback(null, result);
//         })
// }


/**
 * 获取当前页面的电影详情页面
 * @param params
 */
Movie.getMoviesByCurrentPage = async function (params) {
    return await db.query('select * from movies limit ?, ?', [params.start, params.pageSize]);
}

/**
 * 根据URl地址获取电影的详细信息
 * @param url
 */
Movie.getMovieByUrl = async function (url, callback) {
    return await db.query('select * from movies where url = ? limit 1', [url]);
}
/**
 * 统计电影数量
 */
Movie.getMoviePageNums = async function () {
    return await db.query('select count(id) as pageNum from movies');
}

/**
 * 根据电影标题模糊查询
 * @param name
 */
Movie.getMovieByName = async function (name) {
    return await db.query('select * from movies where title like ?', ['%' + name + '%']);
}


/**
 * 修改电影的播放数量信息
 * @param url
 */
Movie.updatePlayNumsById = async function (id) {
    return await db.query('update movies set playnum = playnum +1 where id = ?', [id]);

}
/**
 * 修改电影评论数量
 * @param url
 */
Movie.updateCommentNumById = async function (id) {
    return await db.query('update movies set commentnum = commentnum +1 where id = ?', [id]);

}

/**
 * 随机从电影表中查询一条数据
 */
Movie.getOneRandomMovie = async function (callback) {
    return await db.query('select * from movies order by rand() limit 1');

}
module.exports = Movie;