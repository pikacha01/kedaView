import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import pinia from '@/store'
import 'ant-design-vue/dist/antd.css';


const app = createApp(App)



app.use(pinia)

app.mount('#app')
