import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import store from './store'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Vuex)
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(ElementUI)
new Vue({
    render: h => h(App),
    router: router,
    store:store,
    beforeCreate(){
        Vue.prototype.$bus =this;       //事件总线
    }
}).$mount('#app')
