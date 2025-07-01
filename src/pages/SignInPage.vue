<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ROUTE_NAMES } from '@/shared/config/routes'
import { loginUser } from '@/shared/api/auth'

import AuthLayout from '@/widgets/AuthLayout.vue'
import CustomButton from '@/shared/ui/CustomButton.vue'
import CustomInput from '@/shared/ui/CustomInput.vue'
import CustomCheckbox from '@/shared/ui/CustomCheckbox.vue'

const router = useRouter()
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  try {
    await loginUser(email.value, password.value, rememberMe.value)
    router.push({ name: ROUTE_NAMES.LIST })
  } catch (error) {
    errorMessage.value = 'Login failed. Please check your email and password.'
  }
}
</script>

<template>
  <AuthLayout subtitle="Welcome Back, Please login to your account">
    <form @submit.prevent="handleLogin">
      <div class="space-y-6">
        <CustomInput v-model="email" label="Email" placeholder="Enter your email" type="email" />
        <CustomInput
          v-model="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
        />
      </div>

      <div class="flex justify-between items-center mt-4 mb-6">
        <CustomCheckbox v-model="rememberMe">Remember me</CustomCheckbox>
        <router-link
          :to="{ name: ROUTE_NAMES.FORGOT_PASSWORD }"
          class="text-green-600 hover:underline text-sm"
        >
          Forgot password?
        </router-link>
      </div>

      <p v-if="errorMessage" class="text-red-500 text-sm mb-4">{{ errorMessage }}</p>

      <div class="flex gap-6">
        <CustomButton type="filled" @click="handleLogin">Login</CustomButton>
        <CustomButton type="outlined" :to="{ name: ROUTE_NAMES.SIGN_UP }">Sign Up</CustomButton>
      </div>
    </form>
  </AuthLayout>
</template>
