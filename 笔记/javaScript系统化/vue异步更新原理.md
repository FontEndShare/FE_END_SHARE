### watcher

-   1.watcher 实例调用 update 方法
-   2.update 中调用 queueWatcher，即将当前的函数存入数组中
-   3.调用 nextTick 函数，将 flushQueueWatcher 作为参数传入，flushQueueWatcher 中包含视图更新的动作

### nextTick

-   1.用 callbacks 数组存放 nextTick 中传入的 fn
-   2.timerFunc，根据具体的浏览器匹配合适的异步执行方法

### timeFunc

-   1.调用 flushCallbacks 方法
