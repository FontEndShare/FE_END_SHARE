/** @format */

Function.prototype.ccall = function (target, ...args) {
    target.fn = this;

    let result = target.fn(...args);

    delete target.fn;
    return result;
};

function test(a, b, c) {
    console.log(a);
    console.log(b);
    console.log(c);
}

const o = {};
test.ccall(o, 1, { name: 1 }, null);
