const API_BASE = 'https://pokeapi.co/api/v2'

export async function fetchPokemonByNameOrId(query) {
  const res = await fetch(`${API_BASE}/pokemon/${query.toLowerCase()}`)
  if (!res.ok) throw new Error(`Pokémon no encontrado: ${query}`)
  return res.json()
}

export async function fetchPokemonList(limit = 50, offset = 0) {
  const res = await fetch(`${API_BASE}/pokemon?limit=${limit}&offset=${offset}`)
  if (!res.ok) throw new Error('Error al obtener la lista')
  const data = await res.json()
  const details = await Promise.all(
    data.results.map(async (p) => {
      const r = await fetch(p.url)
      const j = await r.json()
      return {
        id: j.id,
        name: j.name,
        image: j.sprites && j.sprites.front_default ? j.sprites.front_default : '',
        types: j.types.map((t) => t.type.name),
      }
    })
  )
  return details
}

export async function fetchTypeInfo(typeName) {
  const res = await fetch(`${API_BASE}/type/${typeName}`)
  if (!res.ok) throw new Error('Tipo no encontrado')
  return res.json()
}
