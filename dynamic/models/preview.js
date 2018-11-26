const db = require('./db');


/**
 * preview table
 * @param preview
 * @constructor
 */
function Preview(preview) {
    this.title = preview.title;
    this.content = preview.content;
    this.playurl = preview.playurl;
    this.imgurl = preview.imgurl;
}


/**
 * 获取电影详细信息
 * @param callback
 */
Preview.getPreview = async function (callback) {
    return await db.query('select * from preview limit 0,7');
}

module.exports = Preview;