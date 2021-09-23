/** @format */

const PENDING = "pending";
const FULFIlled = "fulfilled";
const REJECTED = "rejected";

class PromiseF {
    constructor(excutor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;

        this.fuCollection = [];
        this.reCollection = [];
        const resolve = (value) => {
            this.status = FULFIlled;
            this.value = value;
            this.fuCollection.forEach((onFulfilled) => onFulfilled());
        };
        const reject = (reason) => {
            this.status = REJECTED;
            this.reason = reason;
            this.reCollection.forEach((onRejected) => onRejected());
        };
        try {
            excutor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled =
            typeof onFulfilled === "function" ? onFulfilled : (value) => value;

        onRejected =
            typeof onRejected === "function"
                ? onRejected
                : (reason) => {
                      throw reason;
                  };

        const promise2 = new PromiseF((resolve, reject) => {
            if (this.status === FULFIlled) {
                try {
                    let x = onFulfilled();
                    setTimeout(() => {
                        this._resolvePromise(promise2, x, resolve, reject);
                    });
                } catch (e) {
                    reject(e);
                }
            }
            if (this.status === REJECTED) {
                try {
                    let x = onRejected();
                    setTimeout(() => {
                        this._resolvePromise(promise2, x, resolve, reject);
                    });
                } catch (e) {
                    reject(e);
                }
            }
            if (this.status === PENDING) {
                this.fuCollection.push(() => {
                    let x = onFulfilled(this.value);
                    this._resolvePromise(promise2, x, resolve, reject);
                });

                this.fuCollection.push(() => {
                    let x = onRejected(this.reason);
                    this._resolvePromise(promise2, x, resolve, reject);
                });
            }
        });
        return promise2;
    }

    _resolvePromise(promise, x, resolve, reject) {
        if (promise === x) {
            return new TypeError("chain cycle");
        }

        let called = false;
        if (x && (typeof x === "function" || typeof x === "object")) {
            try {
                const then = x.then;
                if (typeof then === "function") {
                    then.call(
                        x,
                        (y) => {
                            if (called) return;
                            called = true;
                            this._resolvePromise(promise, y, resolve, reject);
                        },
                        (r) => {
                            if (called) return;
                            called = true;
                            reject(r);
                        }
                    );
                } else {
                    if (called) return;
                    called = true;
                    resolve(x);
                }
            } catch (e) {
                if (called) return;
                called = true;
                reject(e);
            }
        } else {
            if (called) return;
            called = true;
            resolve(x);
        }
    }

    catch(onRejected) {
        this.then(null, onRejected);
    }
}
