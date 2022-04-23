<template>
  <p>My name is {{ name }}</p>
  <p>My age is {{ age }}</p>

  <button @click="addCount">增加次数</button>
  <p>次数：{{ refsInfo.count }}</p>
  <button @click="addNumber">增加数字</button>
  <p>数字：{{ refsInfo.number }}</p>

</template>

<script>
import { ref, toRefs,reactive,toRaw } from "vue";
export default {
  setup(props, context) {
    /**
     * ref 基本数据类型，修改数据，数据不会影响原始值，会改变视图，
     *     引用类型的数据，修改数据，会影响原始值，会改变视图；
     * toRef 将对象中的某个属性变成响应式数据，修改数据，会影响原始值，不会影响视图；
     * toRefs 将对象中的所有属性都变成响应式数据，修改数据，会影响原始值，不会影响视图；
     * reactive 将对象中的所有属性都变成响应式数据，修改数据，会影响原始值，会影响视图；
     */
    const name = ref({ val: 'bai', sex: 'male' });
    const age = ref(20);
    let obj = { count: 1, number: 1 };
    // const refsInfo = toRefs(obj);
    const refsInfo = reactive(obj);
    // console.log('props', props);
    // console.log('context', context);
    // console.log('name', name.value.sex);
    // console.log('age', age.value);
    function addCount() {
      obj.count++;
      // refsInfo.count++;
      console.log('obj', obj);
      console.log('refsInfo', refsInfo);
      console.log('toRaw', toRaw(refsInfo));

    }
    function addNumber() {
      refsInfo.number++;
      console.log('obj', obj);
      console.log('refsInfo', refsInfo);
    }
    console.log('refsInfo', refsInfo);

    return { name, age, refsInfo, addCount, addNumber }
  }
}
</script>

<style lang="scss" scoped>
</style>
