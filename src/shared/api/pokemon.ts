import axios from 'axios'

const API_URL = 'https://pokeapi.co/api/v2/'

export interface IPokemon {
  id: number
  name: string
  image: string
  types: string[]
  abilities: string[]
  weight: number
  height: number
}

export interface IPokemonListResponse {
  pokemon: IPokemon[]
  next: string | null
  previous: string | null
}

export const fetchPokemonList = async (
  url: string = `${API_URL}pokemon?limit=24&offset=0`,
): Promise<IPokemonListResponse> => {
  try {
    const response = await axios.get(url)
    const { results, next, previous } = response.data

    const pokemonData = await Promise.all(
      results.map(async (pokemon: { name: string }) => {
        const details = await axios.get(`${API_URL}pokemon/${pokemon.name}`)
        return {
          id: details.data.id,
          name: details.data.name,
          image: details.data.sprites.other['official-artwork'].front_default,
        }
      }),
    )

    return { pokemon: pokemonData, next, previous }
  } catch (error) {
    console.error('Error fetching Pokémon list:', error)
    return { pokemon: [], next: null, previous: null }
  }
}

export const fetchPokemonByName = async (name: string): Promise<IPokemon | null> => {
  try {
    const response = await axios.get(`${API_URL}pokemon/${name}`)
    return {
      id: response.data.id,
      name: response.data.name,
      image: response.data.sprites.other['official-artwork'].front_default,
      types: response.data.types.map((t: any) => t.type.name),
      abilities: response.data.abilities.map((a: any) => a.ability.name),
      weight: response.data.weight / 10,
      height: response.data.height / 10,
    }
  } catch (error) {
    console.error(`Error fetching Pokémon with name ${name}:`, error)
    return null
  }
}

export const fetchEvolutionChainByPokemonId = async (id: number) => {
  try {
    const speciesRes = await axios.get(`${API_URL}pokemon-species/${id}`)
    const evolutionUrl = speciesRes.data.evolution_chain.url
    const evolutionRes = await axios.get(evolutionUrl)

    const chain = evolutionRes.data.chain

    const extractChain = (node: any): string[] => {
      const names = [node.species.name]
      node.evolves_to.forEach((evo: any) => {
        names.push(...extractChain(evo))
      })
      return names
    }

    const evolutionNames = extractChain(chain)

    const fullData = await Promise.all(
      evolutionNames.map(async (name) => {
        const res = await axios.get(`${API_URL}pokemon/${name}`)
        return {
          name: res.data.name,
          image: res.data.sprites.other['official-artwork'].front_default,
        }
      }),
    )

    return fullData
  } catch (error) {
    console.error('Error fetching evolution chain:', error)
    return []
  }
}
