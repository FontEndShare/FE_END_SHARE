#### webpack 基本梳理

https://juejin.cn/post/6844903726981840904

https://notes.jindll.com/webpack/20%20Webpack%20%E4%BC%98%E5%8C%96%E4%B9%8B%E9%80%9F%E5%BA%A6%E4%BC%98%E5%8C%96.html#%E5%88%A9%E7%94%A8%E5%A4%9A%E7%BA%BF%E7%A8%8B%E6%8F%90%E5%8D%87%E6%9E%84%E5%BB%BA%E9%80%9F%E5%BA%A6

webpack 基本配置

> webpack-merge 合并公共部分和开发和生产环境的配置，避免重复性的公共代码

webpack 构建和打包

webpack 高级配置

> 多入口配置
>
> entry 需要设置多个 js 文件，设置多个入口文件
>
> output 需要配置对应打包输出文件
>
> HtmlWebpackPlugin 为每一个多入口文件生成对应的 html 页面，同时配置 chunks,让每个页面引用对应的 js 文件
>
> splitChunks：根据实际的需求进行打包，分块打包，提取公共的部分，避免重复打包

webpack 中 loader 和 plugin、chunk

chunk
组成最终打包完成的部分、几种情况下会产生 chunk
1、多入口
2、根据需要分块 splitChunk
3、路由懒加载组的时候，会产生不同的 chunk

module 就是需要加载解析的代码

loader

> 主要将依赖的非 js 的模块，转化为能够识别的 js 模块。  
> 转化的时机：加载依赖模块的时候  
> 比如，less-loader 将 less 语言转化为 css  
> css-loader:将 css 转化能够识别的 js 模块  
> style-loader : 将转化的 css 模块生成 style 标签插入到 dom 结构中  
> vue-loader:解析但 vue 文件，将 vue 文件中的 template、script、style 分别提取出来交给对应的 loader 进行处理；  
> vue-template-complier-loader:将 vue-loader 解析出来的 template 部分转化为 render 函数，最终输出 Vnode

plugin

> webpack 的插件，扩展丰富 webpack 的功能
>
> 作用于 webpack 的整个流程

webpack 构建优化—构建速度

> Dllplugin: 将同一个第三方库直接打包好，不用每次构建都需要打包
>
> 1、先使用 Dllplugin，预打包；
>
> 2、需要使用第三方依赖库的时候，使用 DllReferPlugin 在 manifest.json 查找是否有第三方库，如果有，直接引用打包的文件
>
> 优化 bable-loader ：
>
> happyPack：开启多进程打包，将主任务分解，然后给多个子进程，进行处理，处理完成后，在返回给主进程。
> 在运行多任务处理的时候，可以开启，可以提高效率。小的文件处理时，不需要开启，开启多个子进程，也需要时间和空间开销。
>
> IgnorePlugin：利用正则表达式，对插件中某些部分，不进行打包
>
> noPrase：设置不需要解析的文件/模块，比如第三方库等
>
> ParallUglifyPlugin：多个子进程压缩 js，一般在生产环境；
>
> 热更新：状态不会丢失，网页不刷新；
>
> 自动刷新：状态会丢失，整个网页全部刷新，速度较慢

splitChunks：代码分割，避免重复打包，减少打包的后的体积

https://segmentfault.com/a/1190000021074403

> 作用:
>
> 单独分割出公共部分依赖；
>
> 提高代码打包的速度；
>
> 使用场景：
>
> 1、将代码按照需要分割，按照每个页面需要得依赖进行加载，一般和有多个入口文件配合使用；
>
> 2、打包的时候，避免重复打包依赖；

多入口文件打包配置

> entry：需要多个入口 js 文件
>
> 需要配置多个 min-css-extract-plugin
>
> 需要配置 多个 htmlWebpackPlugin

webpack 开发环境需要放的配置

> 热更新
>
> 代理配置
>
> sourceMap:方便调试
>
> eslint 等规范工具

webpack 生产环境需要放的配置

> 压缩 css、js 代码
>
> 去除注释和 console
>
> 提取公共代码

webpack 编译打包原理及过程

> 1、收集命令行和 webpack 配置作为 complier 的基本参数；
>
> 2、拿到基本参数后，确定 entry 的入口
>
> 3、确定入口，根据入口的 js 代码，加载入口代码所依赖的模块，并使用对应的 loader 解析加载的模块，在解析加载过程中，如果发现依赖模块，还有对应的依赖，递归加载调用对应 loader 解析，直到所有模块加载解析完毕；
>
> 4、模块加载解析完毕后，产生依赖图谱。
>
> 5、根据依赖图谱，将 module 转化成 chunk。
>
> 6、将不同的 chunk 进行组合，生成最终的文件写入到指定的目录中，比如，打包的 dist 目录下
>
> 在整个过程中，webpack 会在特定的时候，触发事件，让插件知道，执行插件所要执行的逻辑
>
> 例子 1：在 loader 的`翻译`过程中，如果使用的 happpypack，就会触发 happypack 的逻辑，将`翻译`的任务分解成多个小任务给多个子进程并行处理，提高`翻译`效率；
>
> 例子 2：在组成 chunk 的过程中，使用 miniExtractCss 和 ParalleUglifyPlugin 分别对 css 和 js 文件进行提取的压缩；

补充:
安装 babel 的核心模块
babel-core
babel-env
babel-loader

---

webpack 感想

产生 chunk 的情况

1、entry 中每一个入口产生单独的 chunk；

2、异步加载的文件，产生单独的 chunk;

3、使用 splitChunk 对产生的 chunk 进一步加工；

打包构建过程

1、预备环境：初始化参数，初始化插件，比如 entryOptionPlugin，处理 entry 配置；

2、make 构建过程：主要使用各种 loader 和插件对模块进行处理，生成依赖关系图谱；

3、seal 生成阶段：根据 2 中的依赖图谱，将 module 转化成 chunks 集合。

4、write 写入：将生成的 chunks 组织写入到某个文件中输出。

hash 配置

-   1.全局 hash: filename: 'js/[name].[hash].js',所有文件的 hash 值都一样，每次编译，所有文件的 hash 都会改变
-   2.分组 hash: filename: 'js/[name].[chunkhash].js',打包后的 hash 值会根据入口文件的不用而不一样，当某个入口文件修改后重新打包，会导致本入口文件关联的所有文件的 hash 值都修改，但是不会影响到其他入口文件的 hash 值
-   3.内容 hash: filename: 'js/[name].[contenthash].js',打包后，每个文件的 hash 值都不一样，修改某个文件后，对应文件的 hash 会发生变化

---

编译阶段

> run 阶段：启动一次新的编译。this.hooks.run.callAsync。

> compile: 该事件是为了告诉插件一次新的编译将要启动，同时会给插件带上 compiler 对象。

> compilation: 当 Webpack 以开发模式运行时，每当检测到文件变化，一次新的 Compilation 将被创建。一个 Compilation 对象包含了当前的模块资源、编译生成资源、变化的文件等。Compilation 对象也提供了很多事件回调供插件做扩展。

> make:一个新的 Compilation 创建完毕主开始编译 完毕主开始编译 this.hooks.make.callAsync。

> addEntry: 即将从 Entry 开始读取文件。

> addModuleChain: 根据依赖查找对应的工厂函数，并调用工厂函数的 create 来生成一个空的 MultModule 对象，并且把 MultModule 对象存入 compilation 的 modules 中后执行 MultModule.build。

> buildModules: 使用对应的 Loader 去转换一个模块。开始编译模块,this.buildModule(module) buildModule(module, optional, origin,dependencies, thisCallback)。

> build: 开始真正编译模块。

> doBuild: 开始真正编译入口模块。

> normal-module-loader: 在用 Loader 对一个模块转换完后，使用 acorn 解析转换后的内容，输出对应的抽象语法树（AST），以方便 Webpack 后面对代码的分析。

> program: 从配置的入口模块开始，分析其 AST，当遇到 require 等导入其它模块语句时，便将其加入到依赖的模块列表，同时对新找出的依赖模块递归分析，最终搞清所有模块的依赖关系。

输出阶段

> seal: 封装 compilation.seal seal(callback)。

> addChunk: 生成资源 addChunk(name)。

> createChunkAssets: 创建资源 this.createChunkAssets()。

> getRenderManifest: 获得要渲染的描述文件 getRenderManifest(options)。

> render: 渲染源码 source = fileManifest.render()。

> afterCompile: 编译结束 this.hooks.afterCompile。

> shouldEmit: 所有需要输出的文件已经生成好，询问插件哪些文件需要输出，哪些不需要。this.hooks.shouldEmit。

> emit: 确定好要输出哪些文件后，执行文件输出，可以在这里获取和修改输出内容。

> done: 全部完成 this.hooks.done.callAsync。

Tapable:

> 注册：tap tapAsync tapPromise
> 触发回调：call callAsync callPromise
> 钩子类型：

-   1.基本类型：按钩子注册顺序，逐次调用回调
-   2.waterfall：前一个回调的返回值会被带入下一个回调
-   3.bail：逐次调用回调，若有任何一个回调返回非 undefined 值，则终止后续调用
-   4.loop：：逐次、循环调用，直到所有回调函数都返回 undefined
