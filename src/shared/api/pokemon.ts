import axios from 'axios'

const API_URL = 'https://pokeapi.co/api/v2/pokemon'

export interface IPokemon {
  id: number
  name: string
  image: string
}

export const fetchPokemonList = async (limit = 12, offset = 0): Promise<IPokemon[]> => {
  try {
    const response = await axios.get(`${API_URL}?limit=${limit}&offset=${offset}`)
    const pokemonList = response.data.results

    const pokemonData = await Promise.all(
      pokemonList.map(async (pokemon: { name: string }) => {
        const details = await axios.get(`${API_URL}/${pokemon.name}`)
        return {
          id: details.data.id,
          name: details.data.name,
          image: details.data.sprites.other['official-artwork'].front_default,
        }
      }),
    )

    return pokemonData
  } catch (error) {
    console.error('Error fetching Pokémon list:', error)
    return []
  }
}

export const fetchPokemonByName = async (name: string): Promise<IPokemon | null> => {
  try {
    const response = await axios.get(`${API_URL}/${name}`)
    return {
      id: response.data.id,
      name: response.data.name,
      image: response.data.sprites.other['official-artwork'].front_default,
    }
  } catch (error) {
    console.error(`Error fetching Pokémon with name ${name}:`, error)
    return null
  }
}
