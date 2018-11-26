const db = require('./db');
/**
 * 电视剧列表的对象信息
 * @param tv
 * @constructor
 */
function TV(tv) {
    this.title = tv.title;
    this.info = tv.info;
    this.url = tv.url;
    this.addtime = tv.addtime;
}

/**
 * 保存抓取的电视剧信息
 * @param callback
 */
TV.prototype.save = async function () {
    let params = [this.title, this.info, this.url];
    let result = await db.query(`insert into tvs values (null, ?, ?, ?, NOW())`, params);
    // 插入完成之后开始进行数据去重
    await db.query(`delete from tvs where url  in (select url from (select url from tvs group by url having count(url)>1) as tmp1) and id not in (select id from (select min(id) as id from tvs group by url having count(url)>1) as temp2)`);
    return result;
}
/**
 * 获取当前页面的数据
 * @param params
 * @param callbaack
 */
TV.getTVSByCurrentPage = async function (params) {
    return await db.query('select * from tvs limit ?, ?', [params.start, params.pageSize]);
}


/**
 * 获取电视剧的数量信息
 * @param callback
 */
TV.getTVPageNums = async function () {
    return await db.query('select count(id) as pageNum from tvs');
}
module.exports = TV;