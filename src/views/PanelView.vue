<template>
  <div class="w-full h-full flex">
    <SideBar :active-panel="activePanel" @select-panel="selectPanel" />
    <div v-if="user" class="bg-grey w-full h-full p-12">
      <Profile
        v-if="activePanel === 'user'"
        :user="user"
        :success-message="successMessage"
        :error-message="errorMessage"
        @update-data="updateUser"
        @save-data="saveUserData"
      />
      <Tests v-else-if="activePanel == 'tests'" :user="user" />
      <Prescriptions v-else :user="user" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc, getFirestore } from "firebase/firestore";
import SideBar from "@/components/Sidebar.vue";
import Profile from "@/components/Profile/Profile.vue";
import Tests from "@/components/Tests/Tests.vue";
import Prescriptions from "@/components/Prescriptions/Prescriptions.vue";

const auth = getAuth();

const user = ref<any>(undefined);
const uid = ref<null | string>(null);
const activePanel = ref<string>("user");
const successMessage = ref<string>("");
const errorMessage = ref<string>("");

onMounted(() => {
  onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      uid.value = firebaseUser.uid;
      const userDoc = await getDoc(doc(getFirestore(), "users", uid.value));
      if (userDoc.exists()) {
        user.value = userDoc.data();
      }
    }
  });
});

const updateUser = (data: any) => {
  user.value = data;
};

const saveUserData = async () => {
  if (user.value && uid.value) {
    try {
      const userRef = await doc(getFirestore(), "users", uid.value);
      await updateDoc(userRef, user.value);
      successMessage.value = "Dane zostały pomyślnie wysłane!";
      errorMessage.value = "";
      setTimeout(() => {
        successMessage.value = "";
      }, 5000);
    } catch (error) {
      errorMessage.value = "Wystąpił błąd podczas wysyłania danych.";
      successMessage.value = "";
      setTimeout(() => {
        errorMessage.value = "";
      }, 5000);
    }
  }
};

const selectPanel = (value: string) => {
  activePanel.value = value;
};
</script>
