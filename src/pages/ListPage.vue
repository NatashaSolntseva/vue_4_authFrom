<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { usePokemon } from '@/shared/store/usePokemon'
import { URL_LIST_ITEM } from '@/shared/config/routes'
import MainLayout from '@/widgets/MainLayout.vue'
import CustomButton from '@/shared/ui/CustomButton.vue'

const store = usePokemon()
const showScrollUp = ref(false)

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleScroll = () => {
  showScrollUp.value = window.scrollY > 300
}

onMounted(() => {
  if (!store.isLoaded) {
    store.loadPokemon()
  }
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <MainLayout>
    <div class="min-h-[calc(100vh-100px)] flex flex-col items-center py-10">
      <h1 class="text-3xl font-bold text-white mb-6">Pokémon List</h1>

      <div class="flex flex-col sm:flex-row items-center gap-4 mb-6 w-full max-w-md">
        <input
          v-model="store.searchQuery"
          type="text"
          placeholder="Search Pokémon..."
          class="w-full p-3 rounded-md border border-[#029664] bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#029664]"
          @keyup.enter="store.searchPokemon"
        />
        <div class="w-full sm:w-auto flex justify-center">
          <CustomButton
            type="filled"
            class="w-full sm:w-auto min-w-[120px]"
            @click="store.searchPokemon"
            :disabled="store.isLoadingSearch"
          >
            {{ store.isLoadingSearch ? 'Searching...' : 'Search' }}
          </CustomButton>
        </div>
      </div>

      <div v-if="store.isLoading" class="text-white text-xl">Loading...</div>

      <div v-else-if="store.errorMessage" class="text-red-500 text-xl text-center">
        {{ store.errorMessage }}
        <CustomButton type="filled" class="mt-4" @click="store.loadPokemon">Retry</CustomButton>
      </div>

      <div v-else-if="store.pokemonList.length === 0" class="text-white text-xl text-center">
        Pokémon "<span class="font-bold">{{ store.notFoundQuery }}</span
        >" not found
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        <router-link
          v-for="pokemon in store.pokemonList"
          :key="pokemon.id"
          :to="`${URL_LIST_ITEM.replace(':id', pokemon.name)}`"
          class="group block"
        >
          <div
            class="p-4 bg-white rounded-lg shadow-lg transition-all cursor-pointer flex flex-col items-center group-hover:bg-gray-200 group-hover:shadow-xl"
          >
            <img :src="pokemon.image" :alt="pokemon.name" class="w-40 h-40 object-contain" />
            <h2 class="text-lg font-semibold mt-2 text-gray-800 capitalize">{{ pokemon.name }}</h2>
          </div>
        </router-link>
      </div>

      <div v-if="store.isSearchMode" class="mt-10 flex justify-center w-full">
        <CustomButton type="filled" @click="store.resetSearch">Back to full list</CustomButton>
      </div>

      <div v-else-if="store.nextPage" class="mt-10 flex justify-center w-full">
        <CustomButton :disabled="store.isLoadingMore" type="filled" @click="store.loadMorePokemon">
          {{ store.isLoadingMore ? 'Loading...' : 'Load More' }}
        </CustomButton>
      </div>

      <button
        v-if="showScrollUp"
        @click="scrollToTop"
        class="fixed bottom-6 right-6 w-12 h-12 bg-[#029664] text-white rounded-full shadow-lg flex items-center justify-center text-xl font-bold hover:bg-[#027d52] transition"
      >
        ↑
      </button>
    </div>
  </MainLayout>
</template>
