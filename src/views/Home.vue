<template>
<div class="home">
  <div>数据msg：{{state.msg}}</div>
  <div>数据num：{{state.num}}</div>
  <div>数据arr:{{state.arr}}</div>
  <div>我是传递过来的props:{{school}}</div>
  <div>我是用ref创建的count：{{count}}</div>
  <div>作为响应式对象访问：{{state.num1}}</div>
  <button @click="handleClick">点击</button>
  
</div>
</template>

<script>
// @ is an alias to /src

/**
 * 本组件讲了 props setup reactive ref 
 * 
 */

import { reactive, watchEffect, ref } from 'vue'  // 用什么就导出什么

export default {
  props: {  // 定义接收的数据和数据类型
    school: String,
  },
  // setup为入口函数，在beforeCreate钩子之前被调用
  // 该函数接收props作为其第一个参数，第二个参数是上下文对象，从原来2.x 中this选择性地暴露了一些property
  // 并且不能解构props对象，那么就会使其失去响应性
  // attrs和slots都是内部组件实例上对应项的代理，可以确保在更新后仍然是最新值。所以可以解构，无需担心后面访问到过期的值
  // 组件使用 props 的场景更多 将 props 独立出来作为第一个参数，可以让 TypeScript 对 props 单独做类型推导，
  // 不会和上下文中的其他属性相混淆。这也使得setup render 和其他使用了TSX的函数式组件的签名保持一致。
  setup(props,context) {
    // console.log(props) 
    // console.log(context) // attrs slots emit 
    console.log(props.school) // 获得父组件传递的school数据

    // 作为响应式对象的属性访问 那么num1已经变成了state的属性 
    const num1 = ref(233)
    console.log(num1)

    // reactive：把一个对象包装成响应式的proxy对象 等价于data  
    // 在模板使用的时候需要state.msg... 
    const state = reactive({
      msg: "啦啦啦啦",
      num: 100,
      num1, 
      arr:[{name:"憨憨"}]
    })

    console.log(state)
    // 对num1的值进行修改
    state.num1 = 121212


    // ref  在模板使用的时候直接count
    const count = ref(1000)
    console.log(count.value) // 1000
    // 对count值直接修改
    // count.value++


    // 注意:如果将一个新的 ref 分配给现有的 ref， 将替换旧的 ref：
    const age = ref(28)
    state.num1 = age

    // 当嵌套在reactive Object 中时，ref 才会解套。从Array或者Map等原生集合类中访问 ref 时，不会自动解套：
    // 就是说reactive中传递对象能被解套，如果是写数组形式的，那么需要自己打点调用
    const arr = reactive([ref(0)])  // [{value:0}]
    console.log(arr[0].value) // 这才能调用成功


    // props对象是响应式的，watchEffect或watch会观察和响应 props 的更新
    watchEffect(() => {
      // console.log(`school is: ` + props.school)
    })


    // this在setup()中不可用 setup()中的this将与2.x选项中的this完全不同
    function handleClick() {
      console.log(this)
      state.num++
    }


    // 暴露给模板 返回一个对象
    return {
      count,
      state,
      handleClick
    }
  },



}


</script>
