<template>
  <div
    class="h-20 py-4 px-8 w-full flex items-center justify-between uppercase z-50"
    :class="{ 'shadow-md': route.path === '/panel' }"
  >
    <div class="font-medium flex items-center rounded-full">
      <div class="relative flex items-center justify-center">
        <div
          class="w-10 h-10 bg-orange rounded-full absolute left-0 z-10"
        ></div>
        <div class="w-10 h-10 bg-blue rounded-full absolute left-5"></div>
      </div>
      <p class="text-blue text-2xl ml-[70px]">Med</p>
    </div>
    <div v-if="!isLoggedIn" class="flex space-x-20 text-black font-medium">
      <RouterLink to="/">Strona główna</RouterLink>
      <RouterLink to="/">O nas</RouterLink>
      <RouterLink to="/register">Rejestracja</RouterLink>
      <RouterLink to="/">Kontakt</RouterLink>
    </div>
    <RouterLink
      to="/login"
      v-if="!isLoggedIn"
      class="bg-blue text-white py-2 px-6 rounded-2xl uppercase"
    >
      Logowanie
    </RouterLink>
    <button
      v-else
      class="bg-blue text-white py-2 px-6 rounded-2xl uppercase"
      @click="handleSignOut"
    >
      <p>Wyloguj się</p>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { RouterLink, useRouter, useRoute } from "vue-router";

const route = useRoute();
const router = useRouter();

const isLoggedIn = ref(false);

let auth: any;

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/");
  });
};
</script>
