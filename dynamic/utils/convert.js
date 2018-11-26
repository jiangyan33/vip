//将异步操作变为同步操作的通用函数

module.exports = function (orginFunc) {
    return async function () {
        const that = this;
        //原方法对应的参数
        const args = Array.prototype.slice.call(arguments);
        //这个方法返回一个promise对象。
        return new Promise(function (resolve, reject) {
            //执行原方法
            orginFunc.apply(that, [...args, function () {
                let callBackArgs = Array.prototype.slice.call(arguments);
                if (callBackArgs[0]) {
                    reject(callBackArgs[0]);
                } else {
                    //将err外的参数都返回
                    callBackArgs.splice(0, 1);
                    resolve(callBackArgs);
                }
            }]);
        });
    };
};