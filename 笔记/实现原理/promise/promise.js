function resolvePromise(x, y, resolve, reject) {
    if (x === y) {
        throw new TypeError("chain cycle");
    }
    /**
     * x分为普通对象和promise对象
     * x:普通对象  => 直接返回结果
     * x:thenable对象(包含then方法的对象或者方法)  => 接着调用then方法继续解析
     */
    let called;
    if (x && (typeof x === "function" || typeof x === "object")) {
        try {
            const then = x.then;
            if (typeof then === "function") {
                then.call(
                    x,
                    value => {
                        if (called) return;
                        resolvePromise(value, y, resolve, reject);
                        called = true;
                    },
                    err => {
                        if (called) return;
                        reject(err);
                        called = true;
                    }
                );
            } else {
                if (called) return;
                resolve(x);
                called = true;
            }
        } catch (err) {
            if (called) return;
            reject(err);
            called = true;
        }
    } else {
        if (called) return;
        resolve(x);
        called = true;
    }
}

class PromiseS {
    static PENDING = "pending";
    static FULFILLED = "fulfilled";
    static REJECTED = "rejected";
    constructor(excutor) {
        this.state = PromiseS.PENDING;

        this.fulCbs = [];
        this.reCbs = [];
        this.value = undefined;
        this.reason = undefined;
        const resolve = value => {
            this.fulCbs.forEach(cb => cb(value));
            this.state = PromiseS.FULFILLED;
            this.value = value;
        };
        const reject = reason => {
            this.reCbs.forEach(cb => cb(reason));
            this.state = PromiseS.REJECTED;
            this.reason = reason;
        };

        try {
            excutor(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }

    then(onfulfilled, onrejected) {
        onfulfilled = typeof onfulfilled === "function" ? onfulfilled : () => {};
        onrejected = typeof onrejected === "function" ? onrejected : () => {};
        const promise2 = new PromiseS((resolve, reject) => {
            if (this.state === PromiseS.FULFILLED) {
                try {
                    const x = onfulfilled();
                    setTimeout(() => {
                        resolvePromise(x, promise2, resolve, reject);
                    });
                } catch (err) {
                    reject(err);
                }
            } else if (this.state === PromiseS.REJECTED) {
                try {
                    const x = onrejected();
                    setTimeout(() => {
                        resolvePromise(x, promise2, resolve, reject);
                    });
                } catch (err) {
                    reject(err);
                }
            } else {
                this.fulCbs.push(() => {
                    try {
                        const x = onfulfilled();
                        setTimeout(() => {
                            resolvePromise(x, promise2, resolve, reject);
                        });
                    } catch (err) {
                        reject(err);
                    }
                });

                this.reCbs.push(() => {
                    try {
                        const x = onrejected();
                        setTimeout(() => {
                            resolvePromise(x, promise2, resolve, reject);
                        });
                    } catch (err) {
                        reject(err);
                    }
                });
            }
        });

        return promise2;
    }
}
