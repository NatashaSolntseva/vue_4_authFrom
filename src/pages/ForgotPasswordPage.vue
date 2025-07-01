<script setup lang="ts">
import { ref } from 'vue'
import { resetPassword } from '@/shared/api/auth'
import AuthLayout from '@/widgets/AuthLayout.vue'
import CustomButton from '@/shared/ui/CustomButton.vue'
import CustomInput from '@/shared/ui/CustomInput.vue'
import { ROUTE_NAMES } from '@/shared/config/routes'

const email = ref('')
const message = ref('')
const errorMessage = ref('')

const handleResetPassword = async () => {
  try {
    await resetPassword(email.value)
    message.value = 'A password reset email has been sent.'
    errorMessage.value = ''
  } catch (error) {
    errorMessage.value = 'Failed to send reset email. Please check your email address.'
    message.value = ''
  }
}
</script>

<template>
  <AuthLayout subtitle="Reset your password">
    <CustomInput v-model="email" label="Email" placeholder="Enter your email" type="email" />

    <p v-if="message" class="text-green-500 text-sm mt-2">{{ message }}</p>
    <p v-if="errorMessage" class="text-red-500 text-sm mt-2">{{ errorMessage }}</p>

    <div class="flex gap-6 mt-14">
      <CustomButton type="outlined" :to="{ name: ROUTE_NAMES.SIGN_IN }">Login</CustomButton>
      <CustomButton type="filled" @click="handleResetPassword">Reset Password</CustomButton>
    </div>
  </AuthLayout>
</template>
