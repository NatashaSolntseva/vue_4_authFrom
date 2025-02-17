<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{ type?: string; to?: string }>()
</script>

<template>
  <component
    :is="to ? 'router-link' : 'button'"
    :to="to"
    :class="[
      'w-full max-w-[199px] h-[48px] rounded-md font-semibold text-sm transition-all duration-200 flex items-center justify-center',
      type === 'filled'
        ? 'bg-[#029664] text-white hover:bg-[#027d52]'
        : 'border border-[#029664] text-[#029664] hover:bg-[#e6f4ef]',
    ]"
  >
    <slot />
  </component>
</template>
