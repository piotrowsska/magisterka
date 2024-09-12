<template>
  <div class="w-full h-full flex justify-center items-center">
    <div
      class="w-[500px] py-10 px-16 rounded-md bg-white bg-opacity-40 shadow-2xl"
    >
      <div v-if="!state.resetPassword" class="flex flex-col items-center">
        <p
          class="flex justify-center pb-14 text-blue text-5xl font-bold uppercase"
        >
          Logowanie
        </p>
        <input
          type="email"
          v-model="state.email"
          placeholder="Podaj email..."
          class="w-full h-16 px-4 bg-grey100 rounded-2xl text-black text-xl mb-14 focus:outline-none"
        />
        <input
          type="password"
          v-model="state.password"
          placeholder="Podaj hasło..."
          class="w-full h-16 px-4 bg-grey100 rounded-2xl text-black text-xl mb-14 focus:outline-none"
        />
        <button
          @click="singIn"
          class="h-16 justify-center bg-blue text-white text-2xl px-10 rounded-2xl mb-5"
        >
          Zaloguj
        </button>
        <p
          @click="state.resetPassword = true"
          class="text-violet font-semibold cursor-pointer"
        >
          Nie pamiętasz hasła?
        </p>
      </div>
      <div v-else class="flex flex-col items-center">
        <p class="flex justify-center pb-14 text-blue text-5xl uppercase">
          Resetuj
        </p>
        <input
          type="password"
          placeholder="Podaj hasło..."
          class="w-full h-16 px-4 bg-grey100 rounded-2xl text-black text-xl mb-14 focus:outline-none"
        />
        <button
          class="h-16 justify-center bg-blue text-white text-2xl px-10 rounded-2xl"
        >
          Zmień hasło
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();

const state = reactive({
  resetPassword: false,
  email: "",
  password: "",
  errorMessage: "",
});

const singIn = async () => {
  try {
    await signInWithEmailAndPassword(getAuth(), state.email, state.password);
    router.push("/panel");
  } catch (error: any) {
    alert(error.code);
  }
};
</script>
