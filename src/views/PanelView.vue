<template>
  <div v-if="user" class="w-full h-full flex">
    <SideBar
      :user-role="user.role"
      :active-panel="activePanel"
      @select-panel="selectPanel"
    />
    <div v-if="user.role === 'User'" class="bg-grey w-full h-full p-12">
      <UserProfile
        v-if="activePanel === 'user'"
        :user="user"
        :success-message="successMessage"
        :error-message="errorMessage"
        @update-data="updateUser"
        @save-data="saveUserData"
      />
      <UserTests v-else-if="activePanel == 'tests'" :user="user" />
      <UserPrescriptions v-else :user="user" />
    </div>
    <div v-else class="w-full">
      <div v-if="filteredUsers" class="bg-grey w-full h-full p-12">
        <AdminPatients
          v-if="activePanel === 'user'"
          :patients="filteredUsers"
        />
        <AdminTests
          v-else-if="activePanel == 'tests'"
          :patients="filteredUsers"
        />
        <AdminPrescriptions v-else :patients="filteredUsers" :user="user" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getFirestore,
  getDocs,
} from "firebase/firestore";
import SideBar from "@/components/Sidebar.vue";
import UserProfile from "@/components/User/Profile.vue";
import UserTests from "@/components/User/Tests.vue";
import UserPrescriptions from "@/components/User/Prescriptions.vue";
import AdminPatients from "@/components/Admin/Patients.vue";
import AdminTests from "@/components/Admin/Tests.vue";
import AdminPrescriptions from "@/components/Admin/Prescriptions.vue";
import type { User } from "@/types/types";

const auth = getAuth();

const user = ref<any>(undefined);
const uid = ref<null | string>(null);
const activePanel = ref<string>("user");
const successMessage = ref<string>("");
const errorMessage = ref<string>("");
const allUsers = ref<any>();

onMounted(() => {
  onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      uid.value = firebaseUser.uid;
      const userDoc = await getDoc(doc(getFirestore(), "users", uid.value));
      if (userDoc.exists()) {
        user.value = userDoc.data();
      }
    }

    if (user.value.role === "Admin") {
      const querySnapshot = await getDocs(collection(getFirestore(), "users"));
      allUsers.value = querySnapshot.docs.map((doc) => doc.data());
    }
  });
});

const filteredUsers = computed(() => {
  let users;

  if (allUsers.value) {
    users = allUsers.value;

    return users.filter((el: User) => el.role === "User");
  }
});

const updateUser = (data: User) => {
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
