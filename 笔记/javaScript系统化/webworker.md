<!-- @format -->

## webworker

### 种类

-   worker
-   sharedWorker

### 通信方式(同源的 iframe 之间的通信也可以使用)

-   postMessage
-   MessageChannel
-   BroadcastChannel

### 数据传递拷贝方式

-   结构化克隆
-   Transferable Objects
-   sharedArrayBuffer

### 查看当前最多可创建线程数

navigator.hardwareConcurrency
