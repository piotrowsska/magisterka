<template>
  <div class="w-full h-full flex bg-white shadow-2xl rounded-lg p-10">
    <div class="w-1/5 h-[1040px] overflow-y-auto">
      <div v-for="(prescription, index) in prescriptions" :key="index">
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
          <span class="font-semibold">Pacejent:</span>
          {{ user.name }} {{ user.surname }}
        </p>
        <p>
          <span class="font-semibold">Pesel:</span>
          {{ user.pesel }}
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
              Lek {{ index + 1 }} z {{ selectedPrescription.medicines.length }}
            </p>
            <p class="text-3xl font-bold">{{ medicine.name }}</p>
            <p class="text-xl">{{ medicine.dose }}, {{ medicine.quantity }}</p>
            <p class="text-xl">{{ medicine.description }}</p>
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

const selectedPrescription: any = ref(null);

const prescriptions = [
  {
    id: 98237465983274658291,
    date: "2024-09-01",
    doctor: "Dr. Anna Kowalska",
    medicines: [
      {
        name: "Paracetamol",
        dose: "500 mg",
        description: "Przeciwbólowy, przeciwgorączkowy",
        quantity: "20 tabletek",
      },
      {
        name: "Ibuprofen",
        dose: "200 mg",
        description: "Przeciwbólowy, przeciwzapalny, przeciwgorączkowy",
        quantity: "30 tabletek",
      },
    ],
  },
  {
    id: 18472938475629104720,
    date: "2024-09-02",
    doctor: "Dr. Jan Nowak",
    medicines: [
      {
        name: "Amoksycylina",
        dose: "500 mg",
        description: "Antybiotyk (penicylina) - leczenie zakażeń bakteryjnych",
        quantity: "21 tabletek",
      },
      {
        name: "Klarytromycyna",
        dose: "250 mg",
        description: "Antybiotyk (makrolid) - leczenie zakażeń bakteryjnych",
        quantity: "14 tabletek",
      },
    ],
  },
  {
    id: 59628374592018475639,
    date: "2024-09-03",
    doctor: "Dr. Maria Wiśniewska",
    medicines: [
      {
        name: "Metronidazol",
        dose: "500 mg",
        description:
          "Antybiotyk - leczenie zakażeń bakteryjnych i pasożytniczych",
        quantity: "20 tabletek",
      },
      {
        name: "Furagina",
        dose: "50 mg",
        description: "Antybiotyk - leczenie zakażeń układu moczowego",
        quantity: "30 tabletek",
      },
    ],
  },
  {
    id: 27364598120475829376,
    date: "2024-09-04",
    doctor: "Dr. Tomasz Zieliński",
    medicines: [
      {
        name: "Simwastatyna",
        dose: "20 mg",
        description: "Obniżanie poziomu cholesterolu",
        quantity: "30 tabletek",
      },
      {
        name: "Atorwastatyna",
        dose: "10 mg",
        description: "Obniżanie poziomu cholesterolu",
        quantity: "30 tabletek",
      },
    ],
  },
  {
    id: 19482735602948374628,
    date: "2024-09-05",
    doctor: "Dr. Katarzyna Nowicka",
    medicines: [
      {
        name: "Enalapryl",
        dose: "5 mg",
        description: "Leczenie nadciśnienia tętniczego",
        quantity: "30 tabletek",
      },
      {
        name: "Ramipryl",
        dose: "5 mg",
        description: "Leczenie nadciśnienia tętniczego",
        quantity: "30 tabletek",
      },
    ],
  },
  {
    id: 49283746502938475619,
    date: "2024-09-06",
    doctor: "Dr. Adam Nowakowski",
    medicines: [
      {
        name: "Witamina D3",
        dose: "1000 j.m.",
        description: "Suplementacja witaminy D, wspomaganie zdrowia kości",
        quantity: "30 kapsułek",
      },
      {
        name: "Kwas foliowy",
        dose: "5 mg",
        description: "Suplementacja witaminy B9, leczenie niedokrwistości",
        quantity: "30 tabletek",
      },
    ],
  },
];
</script>
