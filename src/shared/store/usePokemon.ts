import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchPokemonList, fetchPokemonByName, type IPokemon } from '@/shared/api/pokemon'

export const usePokemon = defineStore('pokemon', () => {
  const pokemonList = ref<IPokemon[]>([])
  const nextPage = ref<string | null>(null)
  const previousPage = ref<string | null>(null)
  const isLoading = ref(false)
  const isLoadingMore = ref(false)
  const isLoaded = ref(false)
  const errorMessage = ref('')

  const searchQuery = ref('')
  const isLoadingSearch = ref(false)
  const isSearchMode = ref(false)
  const notFoundQuery = ref('')

  const loadPokemon = async () => {
    if (isLoaded.value) return

    isLoading.value = true
    errorMessage.value = ''

    try {
      const { pokemon, next, previous } = await fetchPokemonList()
      pokemonList.value = pokemon
      nextPage.value = next
      previousPage.value = previous
      isLoaded.value = true
    } catch (error) {
      errorMessage.value = 'Failed to load Pokémon. Please try again.'
    } finally {
      isLoading.value = false
    }
  }

  const searchPokemon = async () => {
    if (!searchQuery.value.trim()) {
      await loadPokemon()
      return
    }

    isLoadingSearch.value = true
    isSearchMode.value = true
    errorMessage.value = ''

    try {
      isLoading.value = true
      const pokemon = await fetchPokemonByName(searchQuery.value.toLowerCase())

      if (pokemon) {
        pokemonList.value = [pokemon]
        notFoundQuery.value = ''
      } else {
        pokemonList.value = []
        notFoundQuery.value = searchQuery.value
      }
    } catch (error) {
      errorMessage.value = 'Failed to find Pokémon. Please try again.'
    } finally {
      isLoading.value = false
      isLoadingSearch.value = false
    }
  }

  const resetSearch = async () => {
    searchQuery.value = ''
    isSearchMode.value = false
    isLoaded.value = false
    await loadPokemon()
  }

  const loadMorePokemon = async () => {
    if (!nextPage.value) return
    isLoadingMore.value = true
    errorMessage.value = ''

    try {
      const { pokemon, next } = await fetchPokemonList(nextPage.value)
      pokemonList.value = [...pokemonList.value, ...pokemon]
      nextPage.value = next
    } catch (error) {
      console.error('Error loading more Pokémon:', error)
      errorMessage.value = 'Failed to load more Pokémon. Please try again.'
    } finally {
      isLoadingMore.value = false
    }
  }

  return {
    pokemonList,
    nextPage,
    previousPage,
    searchQuery,
    notFoundQuery,
    isLoadingSearch,
    isSearchMode,
    isLoading,
    isLoadingMore,
    isLoaded,
    errorMessage,
    loadPokemon,
    searchPokemon,
    resetSearch,
    loadMorePokemon,
  }
})
