<!-- @format -->

## webworker

### 种类

-   worker:专用工作者线程
-   sharedWorker:共享工作者线程
-   serviceWorker:服务工作者线程

### 通信方式(同源的 iframe 之间的通信也可以使用)

-   postMessage：隐式使用 MessagePort
-   MessageChannel：通过 MessagePort 通信
-   BroadcastChannel：通过广播通信

### 数据传递拷贝方式

-   结构化克隆
-   Transferable Objects
-   sharedArrayBuffer

### 查看当前最多可创建线程数

navigator.hardwareConcurrency
