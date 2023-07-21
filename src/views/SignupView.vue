<template>
	<h1>Create an Account</h1>
	<p><input type="text" placeholder="email" v-model="email" /></p>
	<p><input type="password" placeholder="Password" v-model="password" /></p>
	<p><button @click="register">Submit</button></p>
	<p><button v-on:click="signInWithGoogle">Sign In with Google</button></p>
</template>

<script setup>
import {ref} from "vue";
import {getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth"; 
import {useRouter} from "vue-router";

const router = useRouter();
const email = ref("");
const password = ref("");
const register = () => {
	createUserWithEmailAndPassword(getAuth(), email.value, password.value).then((data) => {
		router.push('/')
	}).catch((error) => {
		alert(error.message);
	})
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