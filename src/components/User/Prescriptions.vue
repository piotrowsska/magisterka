<template>
  <div class="w-full h-full flex bg-white shadow-2xl rounded-lg p-10">
    <div v-if="user.prescriptions.length > 0" class="w-full h-full flex">
      <div class="w-1/5 h-[1040px] overflow-y-auto">
        <div v-for="(prescription, index) in user.prescriptions" :key="index">
          <p
            class="text-2xl py-7 truncate cursor-pointer pl-3"
            :class="index % 2 === 0 ? 'bg-grey100' : 'bg-white'"
            @click="selectedPrescription = prescription"
          >
            {{ prescription.id }}
          </p>
        </div>
      </div>
      <div v-if="selectedPrescription" class="w-4/5 ml-20">
        <div class="w-full flex items-center justify-center pb-5">
          <p class="text-4xl font-semibold truncate">
            Recepta {{ selectedPrescription.id }}
          </p>
        </div>
        <div class="w-full flex flex-col gap-y-5 text-2xl pb-16">
          <p>
            <span class="font-semibold">Numer recepty:</span>
            {{ selectedPrescription.id }}
          </p>
          <p>
            <span class="font-semibold">Wystawiono:</span>
            {{ selectedPrescription.date }}
          </p>
        </div>
        <div class="w-full flex flex-col gap-y-5 text-2xl border-y-2 py-5">
          <p>
            <span class="font-semibold">Pacjent:</span>
            {{ user.name }} {{ user.surname }}
          </p>
          <p>
            <span class="font-semibold">Pesel:</span>
            {{ user.pesel }}
          </p>
          <p>
            <span class="font-semibold">Wystawca:</span>
            dr. {{ selectedPrescription.doctor }}
          </p>
        </div>
        <div class="h-[650px] overflow-y-auto">
          <div
            v-for="(medicine, index) in selectedPrescription.medicines"
            :key="index"
          >
            <div class="border-b-2 py-5 flex flex-col gap-y-3">
              <p>
                Lek {{ index + 1 }} z
                {{ selectedPrescription.medicines.length }}
              </p>
              <p class="text-3xl font-bold">{{ medicine.name }}</p>
              <p class="text-xl">
                {{ medicine.dose }}, {{ medicine.quantity }}
              </p>
              <p class="text-xl">{{ medicine.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="w-full h-full flex items-center justify-center">
      <p class="text-5xl font-bold">Brak recept</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { User } from "@/types/types";

defineProps<{
  user: User;
}>();

const selectedPrescription: any = ref(null);
</script>
