import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import PortalVue from "portal-vue";
import '../tailwind';
import './styles/main.css';


Vue.config.productionTip = false;

Vue.use(PortalVue);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
