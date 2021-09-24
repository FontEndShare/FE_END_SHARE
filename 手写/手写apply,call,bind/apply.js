/** @format */

Function.prototype.capply = function (target, argArray) {
    target.fn = this;
    const result = target.fn(...argArray);

    delete target.fn;

    return result;
};

function test(a, b, c) {
    console.log(a);
    console.log(b);
    console.log(c);
}

const o = {};
test.capply(o, [1, { name: 1 }, null]);
