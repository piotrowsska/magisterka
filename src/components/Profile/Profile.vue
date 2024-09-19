<template>
  <div class="w-full h-full bg-white shadow-2xl rounded-lg p-10">
    <p class="text-4xl text-black font-semibold">
      {{ userData.name }} {{ userData.surname }}
    </p>
    <form
      @input="emitData"
      class="grid grid-cols-3 gap-y-16 text-lg text-black pt-20"
    >
      <div class="relative">
        <label
          class="absolute -top-2 left-3 bg-white text-xs text-grey500 font-semibold px-1 uppercase"
          >Imię</label
        >
        <input
          v-model="userData.name"
          type="text"
          placeholder="Podaj imię..."
          class="border-2 border-grey300 py-3 px-4 w-96 rounded-md focus:outline-none placeholder:text-grey500"
        />
      </div>
      <div class="relative">
        <label
          class="absolute -top-2 left-3 bg-white text-xs text-grey500 font-semibold px-1 uppercase"
          >Nazwisko</label
        >
        <input
          v-model="userData.surname"
          type="text"
          placeholder="Podaj nazwisko..."
          class="border-2 border-grey300 py-3 px-4 w-96 rounded-md focus:outline-none placeholder:text-grey500"
        />
      </div>
      <div class="relative">
        <label
          class="absolute -top-2 left-3 bg-white text-xs text-grey500 font-semibold px-1 uppercase"
          >Pesel</label
        >
        <input
          v-model="userData.pesel"
          type="text"
          placeholder="Podaj pesel..."
          class="border-2 border-grey300 py-3 px-4 w-96 rounded-md focus:outline-none placeholder:text-grey500"
        />
      </div>
      <div class="relative">
        <label
          class="absolute -top-2 left-3 bg-white text-xs text-grey500 font-semibold px-1 uppercase"
          >Numer telefonu</label
        >
        <input
          v-model="userData.number"
          type="text"
          placeholder="Podaj numer..."
          class="border-2 border-grey300 py-3 px-4 w-96 rounded-md focus:outline-none placeholder:text-grey500"
        />
      </div>
      <div class="relative">
        <label
          class="absolute -top-2 left-3 bg-white text-xs text-grey500 font-semibold px-1 uppercase"
          >Adres</label
        >
        <input
          v-model="userData.adress"
          type="text"
          placeholder="Podaj adres..."
          class="border-2 border-grey300 py-3 px-4 w-96 rounded-md focus:outline-none placeholder:text-grey500"
        />
      </div>
      <div class="relative">
        <label
          class="absolute -top-2 left-3 bg-white text-xs text-grey500 font-semibold px-1 uppercase"
          >Płeć</label
        >
        <input
          v-model="userData.gender"
          type="text"
          placeholder="Podaj płeć..."
          class="border-2 border-grey300 py-3 px-4 w-96 rounded-md focus:outline-none placeholder:text-grey500"
        />
      </div>
    </form>
    <button
      class="bg-blue text-white mt-16 py-3 px-4 w-96 h-14 rounded-md"
      @click="saveData"
    >
      Zapisz dane
    </button>
    <p v-if="successMessage" class="text-success font-semibold pt-2">
      {{ successMessage }}
    </p>
    <p v-if="errorMessage" class="text-error font-semibold pt-2">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const props = defineProps<{
  user: any;
  successMessage: string;
  errorMessage: string;
}>();

const userData = reactive({ ...props.user });

const emit = defineEmits(["updateData", "saveData"]);

const emitData = () => {
  emit("updateData", { ...userData });
};

const saveData = () => {
  emit("saveData");
};
</script>
