<template>
  <div class="w-full h-full flex justify-center items-center">
    <div
      class="w-[500px] py-10 px-16 rounded-md bg-white bg-opacity-40 shadow-2xl"
    >
      <div class="flex flex-col items-center">
        <p
          class="flex justify-center pb-14 text-blue text-5xl font-bold uppercase"
        >
          Rejestracja
        </p>
        <input
          type="text"
          v-model="state.name"
          placeholder="Podaj imie..."
          class="w-full h-16 px-4 bg-grey100 rounded-2xl text-black text-xl mb-14 focus:outline-none"
        />
        <input
          type="text"
          v-model="state.surname"
          placeholder="Podaj nazwisko..."
          class="w-full h-16 px-4 bg-grey100 rounded-2xl text-black text-xl mb-14 focus:outline-none"
        />
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
          @click="register"
          class="h-16 justify-center bg-blue text-white text-2xl px-10 rounded-2xl"
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
import { getFirestore, doc, setDoc } from "firebase/firestore";
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
    const userCredential = await createUserWithEmailAndPassword(
      getAuth(),
      state.email,
      state.password
    );
    const user = userCredential.user;

    await setDoc(doc(getFirestore(), "users", user.uid), {
      email: state.email,
      name: state.name,
      surname: state.surname,
      role: "User",
      pesel: null,
      number: null,
      adress: "",
      gender: "",
      prescriptions: [],
      tests: [],
    });
    router.push("/panel");
  } catch (error: any) {
    alert(error.code);
  }
};
</script>
