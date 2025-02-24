import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchPokemonList, fetchPokemonByName, type IPokemon } from '@/shared/api/pokemon'

export const usePokemon = defineStore('pokemon', () => {
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

  const loadPokemon = async () => {
    if (pokemonList.value.length > 0) return

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

  return {
    pokemonList,
    searchQuery,
    notFoundQuery,
    isLoadingSearch,
    isSearchMode,
    isLoading,
    isLoadingMore,
    hasMore,
    loadPokemon,
    searchPokemon,
    resetSearch,
    loadMorePokemon,
  }
})
