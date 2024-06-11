<template>
  <div
    class="h-20 py-4 px-8 w-full flex items-center justify-between uppercase"
  >
    <div>LOGO</div>
    <div v-if="!isLoggedIn" class="flex space-x-20 font-medium">
      <RouterLink to="/">Home Page</RouterLink>
      <RouterLink to="/">About Us</RouterLink>
      <RouterLink to="/register">Register</RouterLink>
      <RouterLink to="/">Contact</RouterLink>
    </div>
    <button
      v-if="!isLoggedIn"
      class="bg-white text-violet font-bold py-2 px-10 rounded-2xl uppercase"
    >
      <RouterLink to="/login"> Login </RouterLink>
    </button>
    <button
      v-else
      class="bg-white text-violet font-bold py-2 px-10 rounded-2xl uppercase"
      @click="handleSignOut"
    >
      <p>Sign out</p>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { RouterLink, useRouter } from "vue-router";

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
