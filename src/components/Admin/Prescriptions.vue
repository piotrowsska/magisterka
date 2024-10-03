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
    <div v-if="selectedPatient" class="flex items-center gap-x-5 pt-10">
      <p class="text-xl font-medium">Lek:</p>
      <Listbox v-model="selectedMedicine">
        <div class="relative">
          <ListboxButton
            class="relative w-60 rounded-lg bg-white py-2 pl-3 pr-10 text-left border"
          >
            <span v-if="selectedMedicine" class="block truncate font-medium">{{
              selectedMedicine.name
            }}</span>
            <span v-else class="block truncate">Wybierz lek...</span>
          </ListboxButton>
          <ListboxOptions
            class="absolute mt-1 max-h-60 w-60 overflow-auto rounded-md bg-white py-1 shadow-lg z-50"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="medicine in medicines"
              :key="medicine.name"
              :value="medicine"
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
                  >{{ medicine.name }}</span
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
      <i
        v-if="selectedMedicine"
        class="ri-check-line text-2xl text-success cursor-pointer"
        @click="addMedicine"
      ></i>
    </div>
    <div
      v-if="selectedMedicines && selectedMedicines.length > 0"
      class="w-full pt-10"
    >
      <p class="text-5xl text-center pb-5">Recepta</p>
      <div
        v-for="(medicine, index) in selectedMedicines"
        class="flex items-center gap-x-5 pb-2"
      >
        <p class="text-2xl">{{ index + 1 }}. {{ medicine.name }}</p>
        <i
          class="ri-close-line text-2xl text-error font-bold cursor-pointer"
          @click="removeMedicine(index)"
        ></i>
      </div>
      <div class="flex items-center justify-end pt-20">
        <button
          class="bg-orange text-white text-xl font-medium py-3 px-5 rounded-md uppercase"
          @click="saveData"
        >
          Wystaw recepte
        </button>
      </div>
      <p v-if="errorMessage" class="text-error font-semibold pt-2">
        {{ errorMessage }}
      </p>
    </div>
  </div>
  <TransitionRoot appear :show="isOpenModal" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/50" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <div class="mt-2">
                <p class="text-xl">Recepta wystawiona pomyślnie!</p>
              </div>
              <div class="flex items-center justify-center mt-6">
                <button
                  type="button"
                  class="rounded-md border bg-blue px-4 py-2 font-medium text-white"
                  @click="closeModal"
                >
                  Zamknij
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { doc, updateDoc, getFirestore } from "firebase/firestore";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
} from "@headlessui/vue";
import { medicines } from "@/components/Admin/medicines.json";
import type { User, Medicine } from "@/types/types";

const props = defineProps<{
  user: User;
  patients: User[];
}>();

const selectedPatient = ref<User | null>(null);
const selectedMedicine = ref<Medicine | null>(null);
const selectedMedicines = ref<any>([]);
const isOpenModal = ref<boolean>(false);
const errorMessage = ref<string>("");

watch(
  () => selectedPatient.value,
  () => {
    selectedMedicine.value = null;
    selectedMedicines.value = [];
  }
);

const saveData = async () => {
  if (selectedPatient.value)
    try {
      const data = {
        id: generatePrescriptionNumber(),
        date: getCurrentDate(),
        doctor: `${props.user.name} ${props.user.surname}`,
        medicines: selectedMedicines.value,
      };

      selectedPatient.value.prescriptions.push(data);

      const userRef = await doc(
        getFirestore(),
        "users",
        selectedPatient.value.id
      );

      await updateDoc(userRef, selectedPatient.value);
      isOpenModal.value = true;
    } catch (error) {
      errorMessage.value = "Wystąpił błąd podczas wystawiania recepty.";
      setTimeout(() => {
        errorMessage.value = "";
      }, 5000);
    }
};

const generatePrescriptionNumber = () => {
  let randomNumber = "1";
  for (let i = 1; i < 20; i++) {
    randomNumber += Math.floor(Math.random() * 10).toString();
  }
  return Number(randomNumber);
};

const getCurrentDate = () => {
  const today = new Date();
  let day: number | string = today.getDate();
  let month: number | string = today.getMonth() + 1;
  const year = today.getFullYear();

  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;

  return `${day}-${month}-${year}`;
};

const addMedicine = () => {
  if (selectedMedicine.value !== null) {
    selectedMedicines.value?.push(selectedMedicine.value);
    selectedMedicine.value = null;
  }
};

const removeMedicine = (index: number) => {
  selectedMedicines.value.splice(index, 1);
};

const closeModal = () => {
  isOpenModal.value = false;
  selectedPatient.value = null;
  selectedMedicine.value = null;
  selectedMedicines.value = [];
};
</script>
