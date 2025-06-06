import { createWebHistory, createRouter} from "vue-router";

import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import UserPanelView from "../views/UserPanelView.vue";


const routes = [
    { path: "/", name : 'Home', component: HomeView },
    { path: "/login", name : 'Login', component: LoginView },
    { path: "/register", name : 'Register', component: RegisterView },
    { path: '/user-panel', name : 'UserPanel', component: UserPanelView, meta: { requiresAuth: true } },
]


const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;