import {createRouter, createWebHistory} from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import KuisView from "../views/KuisView.vue";
import MinigamesView from "../views/MinigamesView.vue";
import MateriView from "../views/MateriView.vue";
import SignupView from "../views/SignupView.vue";
import LoginView from "../views/LoginView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView
        },
        {
            path: "/about",
            name: "about",
            component: AboutView
        },
        {
            path: "/kuis",
            name: "kuis",
            component: KuisView,
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: "/minigames",
            name: "minigames",
            component: MinigamesView,
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: "/materi",
            name: "materi",
            component: MateriView
        },
        {
            path: "/signup",
            name: "signup",
            component: SignupView
        },
        {
            path: "/login",
            name: "login",
            component: LoginView
        }
    ]
});

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user);
            },
        );
    });
};

router.beforeEach(async (to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (await getCurrentUser()) {
            next();
        } else {
            alert("Tidak dapat mengakses, login/signup terlebih dahulu!");
            next("/");
        }
    } else {
        next();
    }
})

export default router;