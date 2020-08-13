<template>
  <div id="app">
    <!-- <home :school="state.school"/> -->
    <!-- <about/> -->
    <lifeCyle/>
  </div>
</template>

<script>
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import lifeCyle from '@/views/lifeCyle.vue'
import {reactive} from "vue"
  export default {
    name:"app",
    setup(){
      const state = reactive({
        school:"我是清华大学"
      })
      
      setTimeout(()=>{
        state.school = "我已经被修改了"
      },1000)

      return {
        state
      }
    },
    components:{
      Home,
      About,
      lifeCyle
    }
  }
</script>

<style lang="less" scoped>

</style>
