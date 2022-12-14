import { createApp } from 'vue'
import VueScreen from 'vue-screen';
import App from './App.vue'
import naive from "naive-ui";
import './assets/main.css'
import './index.css'
const app = createApp(App)
app.use(VueScreen); 
app.use(naive);
app.config.globalProperties.listFavorites =[];
app.mount('#app')
