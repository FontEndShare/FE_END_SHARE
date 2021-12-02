/** @format */

/**
 * forEach中使用while函数遍历每一个子函数，并执行
 * 导致每一个执行都是单独的async await（即一个作用域只有一个await），而不是在同一个块级作用域中多次await
 * 所以需要重写forEach方法
 */
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

const funcs = [
    () => console.log("start"),
    () => sleep(1000),
    () => console.log(1),
    () => sleep(2000),
    () => console.log(2),
    () => sleep(3000),
    () => console.log("end"),
];

async function run() {
    for (let index = 0; index < funcs.length; index++) {
        await funcs[index]();
    }
}

// run();

Array.prototype.cForEach = async function (callback, thisArg) {
    const _arr = this,
        _thisArg = thisArg ? Object(thisArg) : new Object();

    for (let index = 0; index < _arr.length; index++) {
        await callback.call(_thisArg, _arr[index]);
    }
};

funcs.cForEach(async (func) => {
    await func();
});
