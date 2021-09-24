/** @format */

Function.prototype.cbind = function (target, ...argArray) {
    const that = this;
    return function () {
        return that.apply(target, argArray);
    };
};

function test(a, b, c) {
    console.log(a);
    console.log(b);
    console.log(c);
}

const o = {};
// test.ccall(o, 1, { name: 1 }, null);
test.bind();
