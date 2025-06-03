import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './styles/tailwind.css';

const app = createApp(App);

app.use(router);
app.mount('#app');

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('authToken');
    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login');
    } else {
        next();
    }
});
