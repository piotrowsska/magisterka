<template>
  <div class="w-full h-full flex">
    <SideBar :active-panel="activePanel" @select-panel="selectPanel" />
    <div v-if="user" class="bg-grey w-full h-full p-12">
      <Profile
        :user="user"
        @update-data="updateUser"
        @save-data="saveUserData"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc, getFirestore } from "firebase/firestore";
import SideBar from "@/components/Sidebar.vue";
import Profile from "@/components/Profile/Profile.vue";

const user = ref<any>(undefined);
const uid = ref<null | string>(null);
const auth = getAuth();
const activePanel = ref("user");

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
      alert("Twoje dane zostały zapisane!");
    } catch (error) {
      console.error(error);
    }
  }
};

const selectPanel = (value: string) => {
  activePanel.value = value;
};
</script>
