const createPool = require('mysql2/promise').createPool;
const config = require('config').get('db');


// 创建一个数据库连接池

const pool = createPool(config);

/**
 * 用于执行数据库的SQL语句
 * @param sql
 * @param params
 * @param callback
 */
exports.query = async function (sql,params) {

    // 传参校验
    if (params) {
        params = params.map(item => (item === undefined ? null : item));
    }
    if (process.env.NODE_ENV === 'development') {
        console.log(sql);
        console.log(params);
    }
    let connection = await pool.getConnection();
    try {
        let [rows, fields] = await connection.execute(sql, params);
        return rows;
    } finally {
        connection.release();
    }
}