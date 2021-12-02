### diff手写步骤
1.init 执行后返回一个patch函数
2.使用h函数和vnode函数将对象封装为vnode对象
3.patch:
  3.1判断oldVnode是否为vnode对象，如果不是则将dom元素包装为vnode对象(emptyNode方法)
  3.2对比oldVnode与vnode,如果相同，则执行patchVnode按照递归比较其孩子节点（过程见3），如果不同，则使用createElm函数将vnode转化为真实的dom，并替代原有dom节点（此过程中text属性与children属性互斥）
4.patchVnode:使用patchVnode对比vnode之间差异
    4.1如果oldVnode与vnode都是文本节点，则直接更新oldVnode的文本节点
    4.2如果oldVnode是文本节点，vnode是children对象,则直接将vnode的children对象转化为dom并添加到oldVnode下
    4.3如果oldVnode是children对象，vnode是文本节点，则直接移除oldVnode的children节点，并更新文本
    4.4如果oldVnode和vnode都是children对象，则执行updateChildren方法（具体详见4）
5.updateChildren:
    5.1取得新的开始，新的结束，旧的开始，旧的结束的节点及下标
    5.2判断所有节点是否为空，为空则移动下标及节点
    5.3判断节点是否相同
        5.3.1新的开始和旧的开始是否相同
        5.3.2新的开始和旧的结束是否相同
        5.3.3新的结束和旧的开始是否相同
        5.3.4新的结束和旧的结束是否相同
    5.4将旧节点的key和下标形成一个map，用新的开始节点的key去查找旧的对应key的节点的下标
        5.4.1如果存在下标，则对比sel是否相同
                5.4.1.1如果sel相同，通过patchVnode对比对应的旧节点与新的开始节点，将旧节点置为空，将新节点插入旧节点
                5.4.1.2如果sel不相同，则创建新的节点并插入旧的节点中
        5.4.2如果不存在下标，则创建新的节点，并插入到旧的节点中