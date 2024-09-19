<template>
  <div class="w-full h-full flex bg-white shadow-2xl rounded-lg p-10">
    <div class="w-1/5 h-[1040px] overflow-y-auto">
      <div v-for="(test, index) in tests" :key="index">
        <p
          class="text-2xl py-7 truncate cursor-pointer pl-3"
          :class="index % 2 === 0 ? 'bg-grey100' : 'bg-white'"
          @click="selectedTest = test"
        >
          {{ test.diagnosis }}
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
          <span class="font-semibold">Data badania:</span>
          {{ selectedTest.date }}
        </p>
      </div>
      <p class="text-4xl pb-5">
        <span class="font-semibold">Badanie:</span> {{ selectedTest.diagnosis }}
      </p>
      <div class="h-[772px] overflow-y-auto border-t-2">
        <div v-for="(result, index) in selectedTest.results" :key="index">
          <div v-for="(value, key) in result" :key="key">
            <div class="text-xl py-5 border-b-2 flex justify-between px-10">
              <p>{{ key }}</p>
              <p>{{ value }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  user: any;
}>();

const selectedTest: any = ref(null);

const tests = [
  {
    name: "John Smith",
    diagnosis: "Hypertension",
    date: "2023-03-20",
    results: [{ test: 135 }, { test: 140 }, { test: 132 }],
  },
  {
    name: "Jane Doe",
    diagnosis: "Diabetes Type 2",
    date: "2023-04-22",
    results: [{ test: 150 }, { test: 160 }],
  },
  {
    name: "Michael Johnson",
    diagnosis: "Chronic Kidney Disease",
    date: "2023-08-10",
    results: [{ test: 3.5 }, { test: 3.7 }, { test: 3.8 }, { test: 3.6 }],
  },
  {
    name: "Emily White",
    diagnosis: "Hyperlipidemia",
    date: "2023-06-25",
    results: [{ test: 220 }, { test: 210 }],
  },
  {
    name: "Robert Brown",
    diagnosis: "Asthma",
    date: "2023-09-01",
    results: [{ test: 98 }, { test: 95 }, { test: 100 }],
  },
  {
    name: "Linda Green",
    diagnosis: "Coronary Artery Disease",
    date: "2023-07-30",
    results: [{ test: 175 }, { test: 180 }, { test: 178 }],
  },
  {
    name: "David King",
    diagnosis: "Obesity",
    date: "2023-06-01",
    results: [{ test: 30.5 }, { test: 31.0 }],
  },
  {
    name: "Sophia Harris",
    diagnosis: "Hypothyroidism",
    date: "2023-05-22",
    results: [{ test: 4.8 }, { test: 4.9 }, { test: 5.1 }],
  },
  {
    name: "James Clark",
    diagnosis: "Osteoporosis",
    date: "2023-08-21",
    results: [{ test: -2.5 }, { test: -2.4 }],
  },
  {
    name: "Patricia Lewis",
    diagnosis: "Anemia",
    date: "2023-07-09",
    results: [{ test: 10.2 }, { test: 10.5 }, { test: 10.1 }],
  },
];
</script>
