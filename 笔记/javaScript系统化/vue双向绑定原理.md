### 1.初始化 Observer

    - defineReactive: 初始化 dep 实例
    - get：添加 watcher => Dep.target
    - set: dep.notify,通知 subs 里面的 watcher 更新视图

#### Dep

-   subs 存放 watcher
-   addSubs 存放完之后，删除 Dep.target 上挂载的 watcher，防止重复放入相同的 watcher
-   notify

### 2.初始化 Compile

-   初始化视图
-   绑定更新函数，同时初始化 watcher

#### Watcher

-   expr
-   cb 更新函数
-   getOldValue 初始化时需要保存旧值，同时将自己挂载在 Dep.target 上，Dep.target = this
