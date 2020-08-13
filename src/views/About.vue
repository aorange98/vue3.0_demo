<template>
  <div class="about">
    <div>原来的值：{{count}}</div>
    <div>计算属性的值：{{plusOne}}</div>
    <div>原来的num:{{num}}</div>
    <div>计算属性的num：{{plusTwo}}</div>
    <p>---------</p>
    <div>侦听器侦听count：{{state.count}}</div>
    <div>侦听器侦听xixi：{{xixi}}</div>
    <button @click="handleClick">点我</button>
  </div>
</template>

<script>


/** 
 * 本组件讲了computed readonly watchEffect watch 
 * 
 */

import { reactive, watchEffect, ref, computed, readonly, onMounted, watch } from 'vue'  // 用什么就导出什么

export default {
  setup(props,context) {

    const count = ref(1)
    const num = ref(60)

    // 计算属性 是一个函数 一般情况下只用getter,传递一个回调函数
    const plusOne = computed(()=>{
      return count.value + 1
    })
    // console.log(plusOne.value)  // 2  得到数据
    // console.log(plusOne)    // 如下图所示


    // 计算属性 setter的话就要传递对象形式
    const plusTwo = computed({
      get(){
        return num.value + 10
      },
      set(val){ // val就是触发setter设置的值
        console.log(val)
        num.value = val - 2 
      }
    })

    // 创建响应式对象
    const original = reactive({
      age:28
    })
    // 创建只读对象 
    const copy = readonly(original)
    
    watchEffect(() => {
      // 依赖追踪
      // console.log(copy.age)
    })


    // 侦听器watch 
    // 侦听一个 getter
    const state = reactive({
      count:100
    })

    // 第一个值是侦听参数 第二个值是对这个参数要做的回调
    watch(
      ()=>state.count,  
      (val, oldVal)=>{
        console.log('我是新值'+val, '我是旧的值'+oldVal)
      }
    )

    // 直接侦听一个 ref
    const xixi = ref(0)
    watch(xixi, (val, oldVal) => {
      console.log(val, oldVal)
    })



    function handleClick(){
      // console.log(this)

      // 修改state中的值
      // count.value ++

      // 修改计算属性的值触发setter
      // plusTwo.value = 1000

      // 查看plusTwo修改后的值触发getter
      // console.log(plusTwo.value)  // 1000-2+10 = 1008

      // original 上的修改会触发 copy 上的侦听
      // original.age++  

      // 无法修改 copy 并会被警告
      // copy.age++ // warning!

      state.count++
      xixi.value++
      
    }

    // watchEffect
    // const hanhan = ref(50)
    // watchEffect(()=>{
    //   console.log(hanhan.value)   // -> 打印出 50
    // })
    // setTimeout(()=>{  // -> 500ms后打印出 51
    //   hanhan.value++
    // },500)





   
    // 暴露给模板 返回一个对象
    return {
      xixi,
      state,
      original,
      count,
      plusOne,
      num,
      plusTwo,
      handleClick
    }

  },

}


</script>

