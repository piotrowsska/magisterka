<template>
  <div class="bg-white w-72 h-full pt-8">
    <div>
      <div
        class="flex items-center bg-blue py-4 font-semibold cursor-pointer"
        :class="activePanel === 'user' ? 'bg-blue' : 'bg-white'"
        @click="selectActivePanel('user')"
      >
        <i
          class="ri-user-line text-xl pl-7 pr-4"
          :class="activePanel === 'user' ? 'text-black' : 'text-blue'"
        ></i>
        <p
          class="uppercase text-lg"
          :class="activePanel === 'user' ? 'text-white' : ' text-black'"
        >
          <span v-if="userRole === 'User'">Profil</span>
          <span v-else>Pacjenci</span>
        </p>
      </div>
      <div
        class="flex items-center py-4 font-semibold cursor-pointer"
        :class="activePanel === 'tests' ? 'bg-blue' : 'bg-white'"
        @click="selectActivePanel('tests')"
      >
        <i
          class="ri-syringe-line text-xl pl-7 pr-4"
          :class="activePanel === 'tests' ? 'text-black' : 'text-blue'"
        ></i>
        <p
          class="uppercase text-lg"
          :class="activePanel === 'tests' ? 'text-white' : ' text-black'"
        >
          Badania
        </p>
      </div>
      <div
        class="flex items-center bg-blue py-4 font-semibold cursor-pointer"
        :class="activePanel === 'prescriptions' ? 'bg-blue' : 'bg-white'"
        @click="selectActivePanel('prescriptions')"
      >
        <i
          class="ri-health-book-line text-xl pl-7 pr-4"
          :class="activePanel === 'prescriptions' ? 'text-black' : 'text-blue'"
        ></i>
        <p
          class="uppercase text-lg"
          :class="
            activePanel === 'prescriptions' ? 'text-white' : ' text-black'
          "
        >
          Recepty
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Props = {
  userRole: string;
  activePanel: string;
};

defineProps<Props>();

const emit = defineEmits(["select-panel"]);

const selectActivePanel = (value: string) => {
  emit("select-panel", value);
};
</script>
