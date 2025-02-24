<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { logoutUser } from '@/shared/api/auth'
import { isAuth, currentUser } from '@/shared/store/auth'
import CustomButton from '@/shared/ui/CustomButton.vue'

const router = useRouter()
const userName = computed(() => {
  const email = currentUser.value?.email || 'Guest'
  return email.length > 30 ? email.slice(0, 27) + '...' : email
})

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
      class="fixed top-0 left-0 w-full bg-white shadow-md p-4 flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 space-y-2 md:space-y-0 md:space-x-4 z-10"
    >
      <h1 class="text-xl font-semibold text-[#355b3e] text-center md:text-left">
        Welcome, {{ userName }}
      </h1>
      <CustomButton type="outlined" @click="handleLogout">Log out</CustomButton>
    </header>

    <main class="flex-1 flex flex-col items-center py-2 px-6 mt-[80px] mx-4 md:mx-6 lg:mx-12">
      <slot></slot>
    </main>
  </div>
</template>
