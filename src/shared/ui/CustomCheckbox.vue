<script setup lang="ts">
import { toRef } from 'vue'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])

const checked = toRef(props, 'modelValue')

const toggle = () => {
  emit('update:modelValue', !checked.value)
}
</script>

<template>
  <label class="flex items-center space-x-2 text-[#355b3e] cursor-pointer select-none">
    <input type="checkbox" class="hidden" :checked="checked" @change="toggle" />
    <div
      class="w-4 h-4 border-2 border-[#029664] rounded flex items-center justify-center"
      :class="{ 'bg-[#029664]': checked }"
    >
      <svg
        v-if="checked"
        xmlns="http://www.w3.org/2000/svg"
        class="h-3 w-3 text-white"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M16.707 5.293a1 1 0 0 1 0 1.414l-7 7a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414L9 11.586l6.293-6.293a1 1 0 0 1 1.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
    <span class="text-[16px] leading-[150%]"><slot /></span>
  </label>
</template>
