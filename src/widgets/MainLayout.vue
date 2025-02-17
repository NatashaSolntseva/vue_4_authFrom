<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { logoutUser } from '@/shared/api/auth'
import { isAuth, currentUser } from '@/shared/store/auth'
import CustomButton from '@/shared/ui/CustomButton.vue'

const router = useRouter()
const userName = computed(() => currentUser.value?.email || 'Guest')

const handleLogout = async () => {
  await logoutUser()
  router.push('/signin')
}
</script>

<template>
  <div v-if="!isAuth" class="min-h-screen flex items-center justify-center bg-[#355b3e]">
    <p class="text-white text-2xl">Loading...</p>
  </div>

  <div v-else class="min-h-screen flex flex-col bg-[#355b3e]">
    <header
      class="fixed top-0 left-0 w-full bg-white shadow-md p-4 flex justify-between items-center z-10"
    >
      <h1 class="text-xl font-semibold text-[#355b3e]">Welcome, {{ userName }}</h1>
      <CustomButton type="outlined" @click="handleLogout">Logout</CustomButton>
    </header>

    <main class="flex-1 flex flex-col items-center py-10 px-6 mt-[64px]">
      <slot></slot>
    </main>
  </div>
</template>
