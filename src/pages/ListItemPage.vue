<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchPokemonByName, type IPokemon } from '@/shared/api/pokemon'
import { URL_LIST } from '@/shared/config/routes'
import MainLayout from '@/widgets/MainLayout.vue'

const route = useRoute()
const router = useRouter()

const pokemon = ref<IPokemon | null>(null)
const isLoading = ref(true)

const loadPokemon = async () => {
  const pokemonName = route.params.id as string
  if (!pokemonName) return

  isLoading.value = true
  pokemon.value = await fetchPokemonByName(pokemonName)
  isLoading.value = false
}

onMounted(loadPokemon)
</script>

<template>
  <MainLayout>
    <div class="min-h-screen bg-[#355b3e] flex flex-col items-center justify-center py-10 px-6">
      <div v-if="isLoading" class="text-white text-xl">Loading...</div>

      <div
        v-else-if="pokemon"
        class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg text-center"
      >
        <div class="flex items-center justify-center h-64">
          <img
            :src="pokemon.image"
            :alt="pokemon.name"
            class="max-w-xs max-h-full object-contain"
          />
        </div>
        <h1 class="text-2xl font-bold text-gray-800 mb-4 capitalize">{{ pokemon.name }}</h1>

        <button
          @click="router.push(URL_LIST)"
          class="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Back
        </button>
      </div>

      <div v-else class="text-white text-xl">Pokémon not found</div>
    </div>
  </MainLayout>
</template>
