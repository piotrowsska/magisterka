<template>
  <div class="w-full h-full flex justify-center items-center">
    <div
      class="w-[500px] py-10 px-16 rounded-md bg-white bg-opacity-40 shadow-2xl"
    >
      <div class="flex flex-col items-center">
        <p class="flex justify-center pb-14 text-blue text-5xl uppercase">
          Resetuj
        </p>
        <input
          v-model="state.email"
          type="text"
          placeholder="Podaj email..."
          class="w-full h-16 px-4 bg-grey100 rounded-2xl text-black text-xl mb-14 focus:outline-none"
        />
        <button
          class="h-16 justify-center bg-blue text-white text-2xl px-10 rounded-2xl"
          @click="handleResetPassword()"
        >
          Resetuj hasło
        </button>
        <p v-if="state.successMessage" class="text-success font-semibold pt-2">
          {{ state.successMessage }}
        </p>
        <p v-if="state.errorMessage" class="text-error font-semibold pt-2">
          {{ state.errorMessage }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const auth = getAuth();

const state = reactive({
  email: "",
  successMessage: "",
  errorMessage: "",
});

const handleResetPassword = async () => {
  try {
    await sendPasswordResetEmail(auth, state.email);
    state.successMessage = "Wysłano e-mail z instrukcją resetowania";
    state.errorMessage = "";
  } catch (error) {
    console.log(error);
    state.errorMessage = "Błąd podczas wysyłania e-maila";
    state.successMessage = "";
  }
};
</script>
