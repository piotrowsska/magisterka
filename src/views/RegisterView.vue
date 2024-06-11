<template>
  <div class="w-full h-full flex justify-center items-center">
    <div
      class="w-[500px] py-10 px-16 rounded-md bg-white bg-opacity-40 shadow-2xl"
    >
      <div class="flex flex-col items-center">
        <p class="flex justify-center pb-24 text-violet text-5xl uppercase">
          Rejestracja
        </p>
        <input
          type="text"
          v-model="state.name"
          placeholder="Podaj imie..."
          class="w-full h-16 px-4 bg-white rounded-2xl text-black text-xl focus:outline-none mb-10"
        />
        <input
          type="text"
          v-model="state.surname"
          placeholder="Podaj nazwisko..."
          class="w-full h-16 px-4 bg-white rounded-2xl text-black text-xl focus:outline-none mb-10"
        />
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
          @click="register"
          class="h-16 justify-center bg-violet text-2xl px-10 rounded-2xl"
        >
          Zarejestruj
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const router = useRouter();

const state = reactive({
  name: "",
  surname: "",
  email: "",
  password: "",
});

const register = async () => {
  try {
    await createUserWithEmailAndPassword(
      getAuth(),
      state.email,
      state.password
    );
    router.push("/panel");
  } catch (error: any) {
    alert(error.code);
  }
};
</script>
