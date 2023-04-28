import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import userStore from '@/stores/user';
import retrieveToken from '@/stores/loginToken';



import './assets/main.css'

const app = createApp(App)
app.provide('userStore', userStore);
app.provide('token', retrieveToken);
app.provide('router', router)


app.use(router)



app.mount('#app')
