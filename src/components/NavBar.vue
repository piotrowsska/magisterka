<template>
  <div
    class="h-20 py-4 px-8 w-full flex items-center justify-between uppercase"
  >
    <div>LOGO</div>
    <div class="flex space-x-20 font-medium">
      <p>Home Page</p>
      <p>About Us</p>
      <p>Register</p>
      <p>Contact</p>
    </div>
    <button
      class="bg-white text-violet font-bold py-2 px-10 rounded-2xl uppercase"
    >
      <RouterLink to="/login"> Login </RouterLink>
    </button>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>
