//通用的错误信息
const RETURN_CODE = {
    'OK': 00, // 处理成功
    'URL_ERROR': 01, // api错误
    'AUTH_ERROR': 02, // app_key, app_seceret认证信息错误
    'PARAMETERS_ERROR': 03, // 上送参数错误
    'HANDLE_ERROR': 04, // 业务处理错误
    'NULL_ERROR': 05, // 空数据
    'EXCEED_FRQ_ERROR': 06, // 访问频率过快
    'AUTH_FAILURE': 1000 //认证失败
};

const RETURN_MSG = {
    'OK': 'OK', // 处理成功
    'URL_ERROR': 'api not found', // api错误
    'AUTH_ERROR': 'authentication error', // app_key, app_seceret认证信息错误
    'PARAMETERS_ERROR': 'parameters error', // 上送参数错误
    'HANDLE_ERROR': 'servercie error', // 业务处理错误
    'NULL_ERROR': 'cannot query data', // 查询不到数据
    'EXCEED_FRQ_ERROR': 'api freq out of limit', // 访问频率过快
    'AUTH_FAILURE': 'invalid_request' //认证失败
};

function ResponseWrapper(res) {
    this.res = res;
}

ResponseWrapper.prototype.error = function (type, desc, data) {
    this.res.status(200);
    var msg = desc ? desc : RETURN_MSG[type];
    return this.res.json({
        code: RETURN_CODE[type],
        msg: msg,
        data: data || null,
    });
}

// ResponseWrapper.prototype.succ = function (data) {
//     this.res.status(200);
//     return this.res.json({
//         code: RETURN_CODE['OK'],
//         msg: RETURN_MSG['OK'],
//         data: data,
//     });
// }

// ResponseWrapper.prototype.send = function (data) {
//     this.res.status(200);
//     data.data = data.data || null;
//     return this.res.json(data);
// }

module.exports = ResponseWrapper;