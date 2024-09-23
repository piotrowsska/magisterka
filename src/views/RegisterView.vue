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
        <div class="w-full relative">
          <input
            type="text"
            v-model="state.name"
            placeholder="Podaj imie..."
            class="w-full relative h-16 px-4 bg-grey100 rounded-2xl text-black text-xl mb-14 focus:outline-none"
          />
          <p v-if="errors.name" class="absolute bottom-6 left-2 text-error">
            {{ errors.name }}
          </p>
        </div>
        <div class="w-full relative">
          <input
            type="text"
            v-model="state.surname"
            placeholder="Podaj nazwisko..."
            class="w-full h-16 px-4 bg-grey100 rounded-2xl text-black text-xl mb-14 focus:outline-none"
          />
          <p v-if="errors.surname" class="absolute bottom-6 left-2 text-error">
            {{ errors.surname }}
          </p>
        </div>
        <div class="w-full relative">
          <input
            type="number"
            v-model="state.pesel"
            placeholder="Podaj pesel..."
            class="w-full h-16 px-4 bg-grey100 rounded-2xl text-black text-xl mb-14 focus:outline-none"
          />
          <p v-if="errors.pesel" class="absolute bottom-6 left-2 text-error">
            {{ errors.pesel }}
          </p>
        </div>
        <div class="w-full relative">
          <input
            type="email"
            v-model="state.email"
            placeholder="Podaj email..."
            class="w-full h-16 px-4 bg-grey100 rounded-2xl text-black text-xl mb-14 focus:outline-none"
          />
          <p v-if="errors.email" class="absolute bottom-6 left-2 text-error">
            {{ errors.email }}
          </p>
        </div>
        <div class="w-full relative">
          <input
            type="password"
            v-model="state.password"
            placeholder="Podaj hasło..."
            class="w-full h-16 px-4 bg-grey100 rounded-2xl text-black text-xl mb-14 focus:outline-none"
          />
          <p v-if="errors.password" class="absolute bottom-6 left-2 text-error">
            {{ errors.password }}
          </p>
        </div>
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
  pesel: null,
});

const errors = reactive({
  name: "",
  surname: "",
  email: "",
  password: "",
  pesel: "",
});

const validate = () => {
  let isValid = true;

  if (state.name.length < 3) {
    errors.name = "Imię musi mieć conajmniej 3 znaki.";
    isValid = false;
  } else {
    errors.name = "";
  }

  if (state.surname.length < 3) {
    errors.surname = "Nazwisko musi mieć conajmniej 3 znaki.";
    isValid = false;
  } else {
    errors.surname = "";
  }

  if (!state.pesel) {
    errors.pesel = "PESEL jest wymagany.";
    isValid = false;
  } else if (String(state.pesel).length !== 11) {
    errors.pesel = "PESEL musi składać się z 11 cyfr.";
    isValid = false;
  } else {
    errors.pesel = "";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!state.email) {
    errors.email = "Email jest wymagany.";
    isValid = false;
  } else if (!emailRegex.test(state.email)) {
    errors.email = "Podaj poprawny adres e-mail.";
    isValid = false;
  } else {
    errors.email = "";
  }

  if (!state.password) {
    errors.password = "Hasło jest wymagane.";
    isValid = false;
  } else if (state.password.length < 6) {
    errors.password = "Hasło musi mieć co najmniej 6 znaków.";
    isValid = false;
  } else {
    errors.password = "";
  }

  return isValid;
};

const register = async () => {
  if (!validate()) {
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      getAuth(),
      state.email,
      state.password
    );
    const user = userCredential.user;

    await setDoc(doc(getFirestore(), "users", user.uid), {
      id: user.uid,
      email: state.email,
      name: state.name,
      surname: state.surname,
      role: "User",
      pesel: state.pesel,
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
