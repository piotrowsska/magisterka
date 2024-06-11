<template>
  <div class="w-full h-full flex justify-center items-center">
    <div
      class="w-[500px] py-10 px-16 rounded-md bg-white bg-opacity-40 shadow-2xl"
    >
      <div v-if="!state.resetPassword" class="flex flex-col items-center">
        <p class="flex justify-center pb-24 text-violet text-5xl uppercase">
          Logowanie
        </p>
        <input
          type="email"
          v-model="state.email"
          placeholder="Podaj email..."
          class="w-full h-16 px-4 bg-white rounded-2xl text-black text-xl focus:outline-none mb-10"
        />
        <input
          type="password"
          v-model="state.password"
          placeholder="Podaj hasło..."
          class="w-full h-16 px-4 bg-white rounded-2xl text-black text-xl focus:outline-none mb-14"
        />
        <button
          @click="singIn"
          class="h-16 justify-center bg-violet text-2xl px-10 rounded-2xl mb-5"
        >
          Zaloguj
        </button>
        <p
          @click="state.resetPassword = true"
          class="text-violet cursor-pointer"
        >
          Nie pamiętasz hasła?
        </p>
      </div>
      <div v-else class="flex flex-col items-center">
        <p class="flex justify-center pb-28 text-violet text-5xl uppercase">
          Resetuj hasło
        </p>
        <input
          type="password"
          placeholder="Podaj hasło..."
          class="w-full h-16 px-4 bg-white rounded-2xl text-black text-xl focus:outline-none mb-14"
        />
        <button
          class="h-16 justify-center bg-violet text-2xl px-10 rounded-2xl"
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
