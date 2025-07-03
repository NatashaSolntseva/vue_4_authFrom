<script setup lang="ts">
import { ref } from 'vue'
import { FirebaseError } from 'firebase/app'
import { registerUser } from '@/shared/api/auth'
import { useRouter } from 'vue-router'
import { ROUTE_NAMES } from '@/shared/config/routes'
import AuthLayout from '@/widgets/AuthLayout.vue'
import CustomInput from '@/shared/ui/CustomInput.vue'
import CustomButton from '@/shared/ui/CustomButton.vue'

const router = useRouter()
const email = ref('')
const password = ref('')
const errorMessage = ref('')

const isLoading = ref(false)

const handleSignUp = async () => {
  if (isLoading.value) return
  isLoading.value = true
  errorMessage.value = ''

  try {
    await registerUser(email.value, password.value)
    router.push({ name: ROUTE_NAMES.LIST })
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage.value = 'This email is already registered.'
          break
        case 'auth/invalid-email':
          errorMessage.value = 'Invalid email address.'
          break
        case 'auth/weak-password':
          errorMessage.value = 'Password should be at least 6 characters.'
          break
        default:
          errorMessage.value = 'Registration failed. Please try again.'
      }
    } else {
      errorMessage.value = 'Unexpected error. Please try again.'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <AuthLayout subtitle="Create an account">
    <form @submit.prevent="handleSignUp" class="space-y-4">
      <div class="space-y-6">
        <CustomInput v-model="email" label="Email" placeholder="Enter your email" type="email" />
        <CustomInput
          v-model="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
        />
      </div>

      <div class="flex gap-6 mt-16">
        <CustomButton type="outlined" :to="{ name: ROUTE_NAMES.SIGN_IN }">Login</CustomButton>
        <CustomButton type="filled" @click="handleSignUp" :disabled="isLoading">
          <template v-if="isLoading">Signing up...</template>
          <template v-else>Sign Up</template>
        </CustomButton>
      </div>

      <p
        class="text-red-500 text-sm mt-4 min-h-[20px] transition-opacity duration-200"
        :class="{ 'opacity-0': !errorMessage, 'opacity-100': errorMessage }"
      >
        {{ errorMessage || '' }}
      </p>
    </form>
  </AuthLayout>
</template>
