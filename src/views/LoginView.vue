<template>
    <h1>Sign in</h1>
    <p><input type="text" placeholder="email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <p><button @click="login">Submit</button></p>
    <p><button v-on:click="signInWithGoogle">Sign In with Google</button></p>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const password = ref("");
const errorMessage = ref();
const login = () => {
    signInWithEmailAndPassword(getAuth(), email.value, password.value).then((data) => {
        router.push('/')
    }).catch((error) => {
        switch (error.code) {
            case "auth/invalid-email":
                errorMessage.value = "Email tidak sesuai";
                break;
            case "auth/user-not-found":
                errorMessage.value = "Akun dengan email tersebut tidak ditemukan";
                break;
            case "auth/wrong-password":
                errorMessage.value = "Password salah";
                break;
            default:
                errorMessage.value = "Email atau password salah";
                break;
        }
    });
};

const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider).then((result) => {
        router.push("/");
    }).catch((error) => {
        alert(error.message);
    });
};
</script>