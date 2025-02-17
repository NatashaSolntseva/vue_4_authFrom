<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchPokemonList, type IPokemon } from '@/shared/api/pokemon'
import { URL_LIST_ITEM } from '@/shared/config/routes'
import MainLayout from '@/widgets/MainLayout.vue'
import CustomButton from '@/shared/ui/CustomButton.vue'

const pokemonList = ref<IPokemon[]>([])
const isLoading = ref(true)
const isLoadingMore = ref(false)
const limit = 12
const offset = ref(0)
const hasMore = ref(true)

const loadPokemon = async () => {
  isLoading.value = true
  const newPokemon = await fetchPokemonList(limit, offset.value)
  pokemonList.value = newPokemon
  isLoading.value = false
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

onMounted(loadPokemon)
</script>

<template>
  <MainLayout>
    <div class="min-h-screen bg-[#355b3e] flex flex-col items-center py-10 px-6">
      <h1 class="text-3xl font-bold text-white mb-6">Pokémon List</h1>

      <div v-if="isLoading" class="text-white text-xl">Loading...</div>

      <div v-else class="grid grid-cols-3 gap-6 w-full max-w-6xl">
        <router-link
          v-for="pokemon in pokemonList"
          :key="pokemon.id"
          :to="`${URL_LIST_ITEM.replace(':id', pokemon.name)}`"
          class="p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer"
        >
          <img :src="pokemon.image" :alt="pokemon.name" class="w-full h-auto rounded-md" />
          <h2 class="text-lg font-semibold mt-2 text-gray-800 capitalize">{{ pokemon.name }}</h2>
        </router-link>
      </div>

      <div v-if="hasMore" class="mt-6">
        <CustomButton :disabled="isLoadingMore" type="filled" @click="loadMorePokemon">
          {{ isLoadingMore ? 'Loading...' : 'Load More' }}
        </CustomButton>
      </div>
    </div>
  </MainLayout>
</template>
