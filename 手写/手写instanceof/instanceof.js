/** @format */

function instanceofF(left, right) {
    let isSame = false;
    while (left) {
        if (left.__proto__ === right.prototype) {
            isSame = true;
            break;
        }
        left = left.__proto__;
    }
    return isSame;
}

class A {}

class B {}

const a = new A();

console.log(instanceofF(a, Object));
