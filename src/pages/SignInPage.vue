<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { URL_LIST, URL_SIGN_UP, URL_FORGOT_PASSWORD } from '@/shared/config/routes'
import { loginUser } from '@/shared/api/auth'

import AuthLayout from '@/widgets/AuthLayout.vue'
import CustomButton from '@/shared/ui/CustomButton.vue'
import CustomInput from '@/shared/ui/CustomInput.vue'

const router = useRouter()
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  try {
    await loginUser(email.value, password.value, rememberMe.value)
    router.push(URL_LIST)
  } catch (error) {
    errorMessage.value = 'Login failed. Please check your email and password.'
  }
}
</script>

<template>
  <AuthLayout subtitle="Welcome Back, Please login to your account">
    <CustomInput v-model="email" label="Email" placeholder="Enter your email" type="email" />
    <CustomInput
      v-model="password"
      label="Password"
      placeholder="Enter your password"
      type="password"
    />

    <div class="flex justify-between items-center mt-4 mb-6">
      <label class="flex items-center space-x-2 text-gray-700">
        <input v-model="rememberMe" type="checkbox" class="w-4 h-4 border-gray-300 rounded" />
        <span>Remember me</span>
      </label>
      <router-link :to="URL_FORGOT_PASSWORD" class="text-green-600 hover:underline text-sm">
        Forgot password?
      </router-link>
    </div>

    <p v-if="errorMessage" class="text-red-500 text-sm mb-4">{{ errorMessage }}</p>

    <div class="flex gap-6">
      <CustomButton type="filled" @click="handleLogin">Login</CustomButton>
      <CustomButton type="outlined" :to="URL_SIGN_UP">Sign Up</CustomButton>
    </div>
  </AuthLayout>
</template>
