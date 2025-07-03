<script setup lang="ts">
import { useRouter } from 'vue-router'
import { signInWithGoogle } from '@/shared/api/auth'
import { currentUser } from '@/shared/store/auth'
import { ROUTE_NAMES } from '@/shared/config/routes'

defineProps({
  subtitle: { type: String, required: true },
})

const router = useRouter()

const handleGoogleLogin = async () => {
  try {
    const user = await signInWithGoogle()
    currentUser.value = user
    router.push({ name: ROUTE_NAMES.LIST })
  } catch (error) {
    console.error('Google login failed:', error)
  }
}
</script>

<template>
  <div class="min-h-screen w-screen bg-[#355b3e] flex items-center justify-center p-4">
    <div
      class="bg-white flex flex-col md:flex-row overflow-hidden max-w-[1296px] w-full rounded-b-3xl md:rounded-3xl shadow-2xl isolate"
      style="min-height: 714px; box-shadow: 0 72px 80px -48px #223a28"
    >
      <div class="flex md:hidden items-center justify-center space-x-3 py-[32px] bg-[#355b3e]">
        <img src="@/assets/icons/logo_white.svg" alt="Pokémonizer Logo" class="h-10" />
        <span
          class="font-inter text-[32px] font-semibold text-[#FFFFFF] leading-[100%] flex items-center"
        >
          Pokémonizer
        </span>
      </div>
      <div class="flex flex-1 bg-[#f5dbc4] flex items-center justify-center order-1 md:order-2">
        <img
          src="@/assets/icons/pokemon.svg"
          alt="Pokemon Image"
          class="max-w-[500px] max-h-[337px] w-full h-auto"
        />
      </div>

      <div
        class="w-full md:w-[550px] p-[32px_24px] md:p-[48px_64px_64px_64px] flex flex-col shrink-0 order-2 sm:order-1"
      >
        <div class="flex flex-col space-y-3 mb-6">
          <div class="hidden md:flex items-center space-x-3 mb-14">
            <img src="@/assets/icons/logo.svg" alt="Pokémonizer Logo" class="h-10" />
            <span class="text-[32px] font-semibold text-[#355b3e] leading-[100%] flex items-center">
              Pokémonizer
            </span>
          </div>
          <h2 class="text-[20px] md:text-[24px] font-semibold text-[#355b3e] leading-[150%]">
            Gotta catch 'em all! Browse the Pokémon database.
          </h2>
        </div>

        <p class="text-gray-500 text-[16px] mb-8">{{ subtitle }}</p>

        <slot></slot>

        <div class="mt-14 text-gray-500 flex items-center space-x-2">
          <p class="text-[16px] leading-[100%] text-[#58745e]">Or, login with</p>
          <span
            class="cursor-pointer hover:text-gray-600 font-medium text-[16px] leading-[100%] text-[#355b3e]"
            @click="handleGoogleLogin"
          >
            Google
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
