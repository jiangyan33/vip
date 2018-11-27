"use strict";

const db = require('./db');


/**
 * 创建一个User对象，用于映射数据中的关系表
 * @param user
 * @constructor
 */
function User(user) {
    this.id = user.id;
    this.uname = user.uname;
    this.pwd = user.pwd;
    this.email = user.email;
    this.phone = user.phone;
    this.info = user.info;
    this.face = user.face;
    this.addtime = user.addtime;
}

/**
 * 获取所有的用户列表信息
 */
User.getAllUsers = async function (callback) {
    return await db.query('select * from users');
}


/**
 * 静态方法（由于我只需要获取用户信息，因此没必要在使用这个方法之前先去new 一个USER对象）
 * @param uname
 */
User.getUserByName = async function (uname) {
    return await db.query(`select * from users where uname = ? limit 1`, [uname]);
}


/**
 * 根据用户ID编号获取用户详细信息
 * @param uid
 */
User.getUserById = async function (uid) {
    return await db.query(`select * from users where id = ?`, [uid]);
}
/**
 * 从数据库中删除用户
 */
User.deleteUserById = async function (id) {
    return await db.query('delete from users where id = ?', [id]);
}

/**
 * 函数的原型方法（使用之前需要先new 一个实例对象， 然后就可以在线面直接使用this 这个属性了，  原型方法是子类实例都可以循环调用的）
 */
User.prototype.save = async function () {
    // 这里直接使用mysql中内置的这个now()函数获取当前的时间信息
    let params = [this.uname, this.pwd, this.email, this.phone, this.info, this.face];
    return await db.query('insert into users values(null, ?, ?, ?, ?, ?, ?, Now())', params);
}


/**
 * 修改用户信息
 */
User.prototype.update = async function () {
    //console.log('数据库中信息--------------------------', this)
    let params = [this.pwd, this.email, this.phone, this.info, this.face, this.id];
    return await db.query('update users set  pwd = ?, email = ?, phone = ?, info = ?, face = ? where id = ?', params);
}


/**
 * update user info
 * @param callback
 */
User.prototype.updateinfo = async function () {
    let params = [this.email, this.phone, this.info, this.id];
    return await db.query('update users set email = ?, phone = ?, info = ? where id = ?', params);
}


// 把当前的对象暴露出去
module.exports = User;
