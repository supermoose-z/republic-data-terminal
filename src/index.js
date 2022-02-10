
// get vue bootstrap
//import { createRouter, createWebHistory }  from 'vue-router';
import { createApp } from 'vue';

// import CSS
import './styles/main.scss';

// import state storage
import store from './store';

// import shared components
import { registerComponents } from './ux';

// import main components
import Main from './comp/Main.vue';

// initialize app
const app = createApp(Main);

// add state storage
app.use(store);

// register global components
registerComponents(app);

// mount app
app.mount('#app-root');




