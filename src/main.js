import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import axios from 'axios'
// import mock from 'mockjs'

Vue.config.productionTip = false
Vue.use(Antd);
// Vue.use(axios);
Vue.prototype.$axios = axios

// axios.defaults.baseURL = "http://192.168.12.149:8080/"
// axios.defaults.baseURL = 'http://192.168.10.124:8080/'  //关键代码   //menu/findMenuRole
// axios.defaults.baseURL = 'https://www.runoob.com/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



