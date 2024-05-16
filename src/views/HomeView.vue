<template>
  <div class="w-full h-full px-40 pt-40 flex flex-col items-start">
    <p class="text-2xl">Jesteśmy dla tu dla Ciebie</p>
    <p class="text-7xl font-extrabold pt-8 pb-12">Dbamy o Twoje zdrowie</p>
    <p class="text-2xl pb-12">
      Przedstawiamy najlepszą platforme do zdalnej opieki medycznej
    </p>
    <button class="text-2xl border-4 border-white rounded-2xl p-4">
      <RouterLink to="/register"> Zarejestruj się </RouterLink>
    </button>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>
