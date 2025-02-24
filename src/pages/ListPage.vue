<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { fetchPokemonList, fetchPokemonByName, type IPokemon } from '@/shared/api/pokemon'
import { URL_LIST_ITEM } from '@/shared/config/routes'
import MainLayout from '@/widgets/MainLayout.vue'
import CustomButton from '@/shared/ui/CustomButton.vue'

const pokemonList = ref<IPokemon[]>([])
const searchQuery = ref('')
const notFoundQuery = ref('')
const isLoadingSearch = ref(false)
const isSearchMode = ref(false)
const isLoading = ref(true)
const isLoadingMore = ref(false)
const limit = 12
const offset = ref(0)
const hasMore = ref(true)
const showScrollUp = ref(false)

const loadPokemon = async () => {
  isLoading.value = true
  pokemonList.value = await fetchPokemonList(limit, offset.value)
  isLoading.value = false
  notFoundQuery.value = ''
}

const searchPokemon = async () => {
  if (!searchQuery.value.trim()) {
    await loadPokemon()
    return
  }

  isLoadingSearch.value = true
  isSearchMode.value = true

  isLoading.value = true
  const pokemon = await fetchPokemonByName(searchQuery.value.toLowerCase())

  if (pokemon) {
    pokemonList.value = [pokemon]
    notFoundQuery.value = ''
  } else {
    pokemonList.value = []
    notFoundQuery.value = searchQuery.value
  }

  isLoading.value = false
  isLoadingSearch.value = false
}

const resetSearch = async () => {
  searchQuery.value = ''
  isSearchMode.value = false
  await loadPokemon()
}
const loadMorePokemon = async () => {
  if (!hasMore.value) return
  isLoadingMore.value = true
  offset.value += limit
  const newPokemon = await fetchPokemonList(limit, offset.value)

  if (newPokemon.length === 0) {
    hasMore.value = false
  }

  pokemonList.value = [...pokemonList.value, ...newPokemon]
  isLoadingMore.value = false
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleScroll = () => {
  showScrollUp.value = window.scrollY > 300
}

onMounted(() => {
  loadPokemon()
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
          v-model="searchQuery"
          type="text"
          placeholder="Search Pokémon..."
          class="w-full p-3 rounded-md border border-[#029664] bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#029664]"
          @keyup.enter="searchPokemon"
        />
        <div class="w-full sm:w-auto flex justify-center">
          <CustomButton
            type="filled"
            class="w-full sm:w-auto min-w-[120px]"
            @click="searchPokemon"
            :disabled="isLoadingSearch"
          >
            Search
          </CustomButton>
        </div>
      </div>

      <div v-if="isLoading" class="text-white text-xl">Loading...</div>

      <div v-else-if="pokemonList.length === 0" class="text-white text-xl text-center">
        Pokémon "<span class="font-bold">{{ notFoundQuery }}</span
        >" not found
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        <router-link
          v-for="pokemon in pokemonList"
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

      <div v-if="isSearchMode" class="mt-10 flex justify-center w-full">
        <CustomButton type="filled" @click="resetSearch">Back to full list</CustomButton>
      </div>

      <div v-else-if="hasMore" class="mt-10 flex justify-center w-full">
        <CustomButton :disabled="isLoadingMore" type="filled" @click="loadMorePokemon">
          {{ isLoadingMore ? 'Loading...' : 'Load More' }}
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
