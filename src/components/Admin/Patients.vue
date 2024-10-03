<template>
  <div class="w-full h-full bg-white shadow-2xl rounded-lg p-10">
    <div class="flex items-center gap-x-5">
      <p class="text-xl font-medium">Lista pacjentów:</p>
      <Listbox v-model="selectedPatient">
        <div class="relative">
          <ListboxButton
            class="relative w-60 rounded-lg bg-white py-2 pl-3 pr-10 text-left border"
          >
            <span v-if="selectedPatient" class="block truncate font-medium"
              >{{ selectedPatient.name }} {{ selectedPatient.surname }}</span
            >
            <span v-else class="block truncate">Wybierz pacjenta...</span>
          </ListboxButton>
          <ListboxOptions
            class="absolute mt-1 max-h-60 w-60 overflow-auto rounded-md bg-white py-1 shadow-lg z-50"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="person in patients"
              :key="person.name"
              :value="person"
              as="template"
            >
              <li class="relative cursor-pointer select-none py-2 pl-10 pr-4">
                <span
                  :class="[
                    selected
                      ? 'font-semibold text-blue'
                      : 'font-medium text-black',
                    'block truncate',
                  ]"
                  >{{ person.name }} {{ person.surname }}</span
                >
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3"
                >
                  <i class="ri-check-line font-semibold text-blue"></i>
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
    <div v-if="selectedPatient">
      <div class="py-10">
        <div class="flex">
          <button
            class="font-medium border-2 border-orange py-2 px-4 rounded-l-xl transition duration-200"
            :class="
              selectedMode === 'tests' ? 'bg-orange text-white' : 'text-orange'
            "
            @click="selectedMode = 'tests'"
          >
            Badania
          </button>
          <button
            class="font-medium border-2 border-orange py-2 px-4 rounded-r-xl transition duration-200"
            :class="
              selectedMode === 'prescriptions'
                ? 'bg-orange text-white'
                : 'text-orange'
            "
            @click="selectedMode = 'prescriptions'"
          >
            Recepty
          </button>
        </div>
      </div>
      <div v-if="selectedMode === 'tests'">
        <div v-if="selectedPatient.tests.length > 0" class="flex">
          <div class="w-1/5 h-[830px] overflow-y-auto">
            <div v-for="(test, index) in selectedPatient.tests" :key="index">
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
                <span class="font-semibold">Imie i nazwisko:</span>
                {{ selectedPatient.name }}
                {{ selectedPatient.surname }}
              </p>
              <p>
                <span class="font-semibold">Pesel:</span>
                {{ selectedPatient.pesel }}
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
            <div class="h-[500px] overflow-y-auto border-t-2">
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
        <div v-else class="w-full h-[830px] flex items-center justify-center">
          <p class="text-5xl font-bold">Brak badań</p>
        </div>
      </div>
      <div v-else class="flex w-full">
        <div
          v-if="selectedPatient.prescriptions.length > 0"
          class="flex w-full"
        >
          <div class="w-1/5 h-[830px] overflow-y-auto">
            <div
              v-for="(prescription, index) in selectedPatient.prescriptions"
              :key="index"
            >
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
            <div class="w-full flex flex-col gap-y-5 text-2xl border-y-2 py-5">
              <p>
                <span class="font-semibold">Pacejent:</span>
                {{ selectedPatient.name }} {{ selectedPatient.surname }}
              </p>
              <p>
                <span class="font-semibold">Pesel:</span>
                {{ selectedPatient.pesel }}
              </p>
              <p>
                <span class="font-semibold">Wystawca:</span>
                {{ selectedPrescription.doctor }}
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
        <div v-else class="w-full h-[830px] flex items-center justify-center">
          <p class="text-5xl font-bold">Brak recept</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import type { User } from "@/types/types";

defineProps<{
  patients: User[];
}>();

const selectedPatient = ref<User | null>(null);
const selectedMode = ref<string>("tests");
const selectedTest = ref<any>(null);
const selectedPrescription = ref<any>(null);

watch(
  () => selectedPatient.value,
  () => {
    selectedTest.value = null;
    selectedPrescription.value = null;
  }
);
</script>
