<template>
  <div class="w-full h-full flex bg-white shadow-2xl rounded-lg p-10">
    <div v-if="user.tests.length > 0" class="w-full h-full flex">
      <div class="w-1/5 h-[1040px] overflow-y-auto">
        <div v-for="(test, index) in user.tests" :key="index">
          <p
            class="text-2xl py-7 truncate cursor-pointer pl-3"
            :class="index % 2 === 0 ? 'bg-grey100' : 'bg-white'"
            @click="selectedTest = test"
          >
            {{ test.name }}
          </p>
        </div>
      </div>
      <div v-if="selectedTest" class="w-4/5 ml-20">
        <div class="w-full flex items-center justify-center pb-5">
          <p class="text-4xl font-semibold">Wynik badań</p>
        </div>
        <div class="w-full flex flex-col gap-y-5 text-2xl pb-16">
          <p>
            <span class="font-semibold">Imie i nazwisko:</span> {{ user.name }}
            {{ user.surname }}
          </p>
          <p>
            <span class="font-semibold">Pesel:</span>
            {{ user.pesel }}
          </p>
          <p>
            <span class="font-semibold">Data badania:</span>
            {{ selectedTest.date }}
          </p>
        </div>
        <p class="text-4xl pb-5">
          <span class="font-semibold">Badanie:</span>
          {{ selectedTest.name }}
        </p>
        <div class="h-[720px] overflow-y-auto border-t-2">
          <div v-for="(result, index) in selectedTest.results" :key="index">
            <div v-for="(value, key) in result" :key="key">
              <div
                class="text-xl py-5 border-b-2 flex justify-between font-semibold px-10"
              >
                <p>{{ key }}</p>
                <p>{{ value }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="w-full h-full flex items-center justify-center">
      <p class="text-5xl font-bold">Brak badań</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { User } from "@/types/types";

defineProps<{
  user: User;
}>();

const selectedTest: any = ref(null);
</script>
