<script setup lang="ts">
import { ref } from 'vue'
import { registerUser } from '@/shared/api/auth'
import { useRouter } from 'vue-router'
import { URL_SIGN_IN } from '@/shared/config/routes'
import AuthLayout from '@/widgets/AuthLayout.vue'
import CustomInput from '@/shared/ui/CustomInput.vue'
import CustomButton from '@/shared/ui/CustomButton.vue'

const router = useRouter()
const email = ref('')
const password = ref('')
const errorMessage = ref('')

const handleSignUp = async () => {
  try {
    await registerUser(email.value, password.value)
    router.push('/list')
  } catch (error) {
    errorMessage.value = 'Registration error'
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

      <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
      <div class="flex gap-6 mt-16">
        <CustomButton type="outlined" :to="URL_SIGN_IN">Login</CustomButton>
        <CustomButton type="filled" @click="handleSignUp">Sign Up</CustomButton>
      </div>
    </form>
  </AuthLayout>
</template>
