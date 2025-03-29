<script setup lang="ts">
import { ref, defineProps, defineModel } from 'vue'

const props = defineProps({
  label: String,
  placeholder: String,
  type: { type: String, default: 'text' },
})

const isPassword = props.type === 'password'
const showPassword = ref(false)
const modelValue = defineModel()

const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <div class="flex flex-col">
    <label v-if="label" class="text-[#2f3d4c] font-medium mb-1">{{ label }}</label>
    <div class="relative">
      <input
        :type="isPassword && !showPassword ? 'password' : 'text'"
        v-model="modelValue"
        :placeholder="placeholder"
        class="w-full px-4 py-2 border border-[#b8d6bf] rounded-md focus:ring-1 focus:ring-[#b8d6bf] focus:outline-none text-[#355b3e]"
      />

      <button
        v-if="isPassword"
        type="button"
        @click="togglePassword"
        class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
      >
        <svg v-if="showPassword" width="20" height="17" viewBox="0 0 20 17">
          <path
            d="M0,8.053C0,8.053 3.149,15 10,14.763C16.851,14.526 20,8.05 20,8.05C20,8.05 17.331,1.274 10,1.334C2.669,1.394 0,8.053 0,8.053ZM9.993,3.544C12.476,3.544 14.493,5.56 14.493,8.044C14.493,10.528 12.476,12.544 9.993,12.544C7.509,12.544 5.493,10.528 5.493,8.044C5.493,5.56 7.509,3.544 9.993,3.544Z"
            fill="#95B29B"
          />
          <g transform="matrix(1.24333,0,0,1.262,-3.58551,-2.67355)">
            <ellipse cx="10.884" cy="8.545" rx="2.249" ry="2.219" fill="#95B29B" />
          </g>
        </svg>
        <svg v-else width="20" height="17" viewBox="0 0 20 17" fill="none">
          <path
            d="M9.84546 5.36842L12.7273 8.19579V8.05263C12.7273 7.34073 12.4399 6.65799 11.9285 6.15461C11.417 5.65122 10.7233 5.36842 10 5.36842H9.84546ZM5.93636 6.08421L7.34545 7.47105C7.3 7.65895 7.27273 7.84684 7.27273 8.05263C7.27273 8.76453 7.56006 9.44727 8.07153 9.95065C8.58299 10.454 9.27668 10.7368 10 10.7368C10.2 10.7368 10.4 10.71 10.5909 10.6653L12 12.0521C11.3909 12.3474 10.7182 12.5263 10 12.5263C8.79447 12.5263 7.63832 12.055 6.78588 11.216C5.93344 10.377 5.45455 9.23913 5.45455 8.05263C5.45455 7.34579 5.63636 6.68368 5.93636 6.08421ZM0.909091 1.13632L2.98182 3.17632L3.39091 3.57895C1.89091 4.74211 0.709091 6.26316 0 8.05263C1.57273 11.9805 5.45455 14.7632 10 14.7632C11.4091 14.7632 12.7545 14.4947 13.9818 14.0116L14.3727 14.3874L17.0273 17L18.1818 15.8637L2.06364 0M10 3.57895C11.2055 3.57895 12.3617 4.05028 13.2141 4.88926C14.0666 5.72824 14.5455 6.86614 14.5455 8.05263C14.5455 8.62526 14.4273 9.18 14.2182 9.68105L16.8818 12.3026C18.2455 11.1842 19.3364 9.71684 20 8.05263C18.4273 4.12474 14.5455 1.34211 10 1.34211C8.72727 1.34211 7.50909 1.56579 6.36364 1.96842L8.33636 3.89211C8.85455 3.69526 9.40909 3.57895 10 3.57895Z"
            fill="#95B29B"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
