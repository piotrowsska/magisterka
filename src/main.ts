import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { initializeApp } from "firebase/app";

import "./assets/main.css";

const firebaseConfig = {
    apiKey: "AIzaSyCJJDWg9W-HiLBi2ncBcxYXdNhEijPO9G0",
    authDomain: "med-app-9e51e.firebaseapp.com",
    projectId: "med-app-9e51e",
    storageBucket: "med-app-9e51e.appspot.com",
    messagingSenderId: "149514290623",
    appId: "1:149514290623:web:278a342ba61f442aac8d0a"
};

initializeApp(firebaseConfig);

const app = createApp(App);

app.use(createPinia()).use(router);

app.mount("#app");