import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// vue3仍然支持2.X的那种选项API
// 取代了 new Vue() 在vue成员本身不会挂载太多无用的
createApp(App).use(store).use(router).mount('#app')
