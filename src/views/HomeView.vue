<template>
  <div class="w-full h-full px-40 pb-40 pt-14">
    <div class="flex items-center justify-between gap-x-40">
      <div>
        <p class="text-2xl font-medium">Jesteśmy dla tu dla Ciebie</p>
        <p class="text-7xl font-extrabold py-8 text-blue">
          Dbamy o Twoje zdrowie
        </p>
        <p class="text-2xl pb-12 font-medium">
          Przedstawiamy najlepszą platforme do zdalnej opieki medycznej
        </p>
        <RouterLink
          to="/register"
          class="text-lg bg-orange text-white rounded-full py-4 px-8"
        >
          Dołącz do nas
        </RouterLink>
      </div>
      <img src="../assets/image.png" />
    </div>
    <div class="mt-14">
      <div class="flex w-full items-center gap-x-4">
        <div class="h-[2px] w-1/2 bg-black bg-opacity-75"></div>
        <div class="w-4 h-4 bg-black rotate-45"></div>
        <div class="h-[2px] w-1/2 bg-black bg-opacity-75"></div>
      </div>
      <div class="flex items-center justify-between mt-10">
        <div class="flex flex-col items-center w-48">
          <i class="ri-stethoscope-line text-5xl text-orange"></i>
          <p class="font-semibold text-center">Konsultacje z lekarzem</p>
        </div>
        <div class="flex flex-col items-center w-48">
          <i class="ri-heart-pulse-line text-5xl text-orange"></i>
          <p class="font-semibold text-center">Monitorowanie zdrowia</p>
        </div>
        <div class="flex flex-col items-center w-48">
          <i class="ri-robot-3-line text-5xl text-orange"></i>
          <p class="font-semibold text-center">
            Wsparcie sztucznej inteligencji
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>
