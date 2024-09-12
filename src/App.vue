<script setup lang="ts">
import { RouterView } from "vue-router";
import NavBar from "@/components/NavBar.vue";
</script>

<template>
  <div
    class="flex flex-col h-screen overflow-auto bg-white text-black tracking-normal"
  >
    <NavBar />
    <main role="main" class="flex-1">
      <RouterView />
    </main>
  </div>
</template>
