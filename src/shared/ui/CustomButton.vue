<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

defineProps<{
  type?: string
  to?: string | RouteLocationRaw
  disabled?: boolean
}>()
</script>

<template>
  <component
    :is="to ? 'router-link' : 'button'"
    :to="to"
    :disabled="disabled"
    :class="[
      'w-full max-w-[199px] h-[48px] rounded-md font-semibold text-sm transition-all duration-200 flex items-center justify-center',
      disabled
        ? 'bg-[#029664] text-white hover:bg-[#027d52] opacity-50 cursor-not-allowed'
        : type === 'filled'
          ? 'bg-[#029664] text-white hover:bg-[#027d52] cursor-pointer'
          : 'border border-[#029664] text-[#029664] hover:bg-[#e6f4ef] cursor-pointer',
    ]"
  >
    <slot />
  </component>
</template>
