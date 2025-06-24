<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { URL_LIST_ITEM } from '@/shared/config/routes'
import {
  fetchEvolutionChainByPokemonId,
  fetchPokemonByName,
  type IPokemon,
} from '@/shared/api/pokemon'
import MainLayout from '@/widgets/MainLayout.vue'
import CustomButton from '@/shared/ui/CustomButton.vue'

const route = useRoute()
const router = useRouter()

const pokemon = ref<IPokemon | null>(null)
const isLoading = ref(true)
const showEvolutionModal = ref(false)

const loadPokemon = async () => {
  const pokemonName = route.params.id as string
  if (!pokemonName) return

  isLoading.value = true
  pokemon.value = await fetchPokemonByName(pokemonName)
  isLoading.value = false
}

const evolutionChain = ref<{ name: string; image: string }[]>([])

watch(showEvolutionModal, async (isOpen) => {
  if (isOpen && pokemon.value) {
    evolutionChain.value = await fetchEvolutionChainByPokemonId(pokemon.value.id)
  }
})

watch(
  () => route.params.id,
  async () => {
    await loadPokemon()
  },
)

watch(showEvolutionModal, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onMounted(loadPokemon)
</script>

<template>
  <MainLayout>
    <div class="min-h-[calc(100vh-135px)] flex flex-col items-center justify-center mt-[40px]">
      <div v-if="isLoading" class="text-white text-xl">Loading...</div>
      <div
        v-else-if="pokemon"
        class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg text-center flex flex-col items-center"
      >
        <div class="flex items-center justify-center h-64">
          <img
            :src="pokemon.image"
            :alt="pokemon.name"
            class="max-w-xs max-h-full object-contain"
          />
        </div>
        <h1 class="text-2xl font-bold text-gray-800 mb-4 capitalize">{{ pokemon.name }}</h1>
        <p class="text-gray-700"><strong>Type:</strong> {{ pokemon.types.join(', ') }}</p>
        <p class="text-gray-700"><strong>Abilities:</strong> {{ pokemon.abilities.join(', ') }}</p>
        <p class="text-gray-700"><strong>Weight:</strong> {{ pokemon.weight }} kg</p>
        <p class="text-gray-700"><strong>Height:</strong> {{ pokemon.height }} m</p>
        <div class="w-full flex justify-center mt-4 gap-2">
          <CustomButton type="outlined" @click="showEvolutionModal = true"
            >Show Evolution</CustomButton
          >
          <CustomButton type="filled" @click="router.back()">Back</CustomButton>
        </div>
      </div>
      <div v-else>
        <div class="text-white text-xl">Pokémon not found</div>
        <div class="w-full flex justify-center mt-4">
          <CustomButton type="filled" @click="router.back()">Back</CustomButton>
        </div>
      </div>
    </div>

    <!-- Evolution Modal -->
    <div
      v-if="showEvolutionModal"
      class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
      @click.self="showEvolutionModal = false"
    >
      <div
        class="bg-white rounded-lg max-w-md w-full text-center relative overflow-hidden"
        style="max-height: 90vh"
      >
        <div class="p-6 overflow-y-auto" style="max-height: 80vh; scrollbar-width: thin">
          <button
            class="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl"
            @click="showEvolutionModal = false"
          >
            &times;
          </button>

          <h2 class="text-xl font-bold text-[#355b3e] mb-4">Evolution Chain</h2>

          <div v-if="evolutionChain.length" class="flex flex-col items-center gap-4">
            <router-link
              v-for="evo in evolutionChain"
              :key="evo.name"
              :to="`${URL_LIST_ITEM.replace(':id', evo.name)}`"
              class="flex flex-col items-center text-center"
              @click="showEvolutionModal = false"
            >
              <img :src="evo.image" :alt="evo.name" class="w-24 h-24 object-contain" />
              <p class="text-[#355b3e] font-semibold capitalize mt-2">{{ evo.name }}</p>
            </router-link>
          </div>

          <div v-else class="text-gray-500">Loading evolution chain...</div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>
