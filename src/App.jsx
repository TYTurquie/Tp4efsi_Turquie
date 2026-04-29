import { useEffect, useState } from 'react'
import './App.css'
import { fetchPokemonByNameOrId, fetchPokemonList, fetchTypeInfo } from './api/poke'

// Componente principal de la Mini Pokédex

function PokemonCard({ p }) {
	if (!p) return null
	return (
		<div className="pokemon-card">
			{/* tarjeta que muestra el nombre y id del pokemon */}
			<h3>{p.name} #{p.id}</h3>
			<img src={p.image} alt={p.name} />
			<div className="meta">
				{/* tipos del pokemon */}
				<div><strong>Tipos:</strong> {p.types.join(', ')}</div>
				{p.height !== undefined && <div><strong>Altura:</strong> {p.height}</div>}
				{p.weight !== undefined && <div><strong>Peso:</strong> {p.weight}</div>}
			</div>
		</div>
	)
}

function App() {
	// estado: texto que escribe el usuario para buscar (nombre o id)
	const [query, setQuery] = useState('')
	// pokemon seleccionado para mostrar en la tarjeta
	const [pokemon, setPokemon] = useState(null)
	// flags de carga y errores
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	const [list, setList] = useState([])
	const [listLoading, setListLoading] = useState(false)
	// filtros para la lista de pokemons
	const [filterName, setFilterName] = useState('')
	const [filterType, setFilterType] = useState('')

	useEffect(() => {
		let mounted = true
		async function loadList() {
			// carga la lista inicial de pokemons (limite configurable)
			setListLoading(true)
			try {
				const items = await fetchPokemonList(50)
				if (mounted) setList(items)
			} catch (e) {
				console.error(e)
			} finally {
				if (mounted) setListLoading(false)
			}
		}
		loadList()
		return () => { mounted = false }
	}, [])

	async function handleSearch(e) {
		if (e) e.preventDefault()
		setError('')
		const q = query.trim()
		// si no hay query, muestro error simple
		if (!q) { setError('Ingresa un nombre o id válido'); setPokemon(null); return }
		setLoading(true)
		try {
			const data = await fetchPokemonByNameOrId(q)
			const p = {
				id: data.id,
				name: data.name,
				image: data.sprites && data.sprites.front_default ? data.sprites.front_default : '',
				types: data.types.map((t) => t.type.name),
				height: data.height,
				weight: data.weight,
			}
			setPokemon(p)
		} catch (err) {
			setPokemon(null)
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	function filteredList() {
		return list.filter((p) => {
			if (filterName && !p.name.includes(filterName.toLowerCase())) return false
			if (filterType && !p.types.includes(filterType.toLowerCase())) return false
			return true
		})
	}


	return (
		<div className="app">
			<header>
				<h1>Mini Pokédex</h1>
			</header>

			<section className="search">
				<form onSubmit={handleSearch}>
					{/* aca el usuario ingresa el nombre del pokemon */}
					<input
						aria-label="buscar"
						placeholder="Buscar por nombre o id"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
					<button type="submit">Buscar</button>
				</form>
				{loading && <div className="loading">Cargando...</div>}
				{error && <div className="error">{error}</div>}
				{pokemon && <PokemonCard p={pokemon} />}
			</section>

			<section className="list">
				<h2>Lista de Pokémon</h2>
				<div className="filters">
					{/* filtro: nombre */}
					<input placeholder="Filtrar por nombre" value={filterName} onChange={(e) => setFilterName(e.target.value)} />
					{/* filtro: tipo */}
					<input placeholder="Filtrar por tipo" value={filterType} onChange={(e) => setFilterType(e.target.value)} />
				</div>
				{listLoading ? <div className="loading">Cargando lista...</div> : (
					<div className="grid">
						{filteredList().map((p) => (
							<div key={p.id} className="list-item">
								<img src={p.image} alt={p.name} />
								<div className="small-meta">
									<strong>{p.name}</strong>
									<div className="types">{p.types.join(', ')}</div>
								</div>
							</div>
						))}
					</div>
				)}
			</section>
		</div>
	)
}

export default App
