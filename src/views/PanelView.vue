<template>
  <p>{{ auth.currentUser?.email }}</p>
</template>

<script setup lang="ts">
import { getAuth } from "firebase/auth";

const auth = getAuth();
</script>
