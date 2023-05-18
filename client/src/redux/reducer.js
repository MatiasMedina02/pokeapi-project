import { FILTER_TYPES, FILTER_ORIGIN, GET_POKEMONS, ORDER } from "./action-types";

const initialState = {
	pokemons: [],
	allPokemons: [],
}

const reducer = (state = initialState, { type, payload }) => {
	switch(type){
		case GET_POKEMONS:
			return {
				...state,
				pokemons: payload,
				allPokemons: payload,
			}
		case ORDER:
			const copyPokemons = [...state.allPokemons];
			if(payload === "Ascendente"){
				copyPokemons.sort((a, b) => a.name.localeCompare(b.name))
			}
			if(payload === "Descendente"){
				copyPokemons.sort((a, b) => b.name.localeCompare(a.name))
			}
			if(payload === "Id-Ascendente"){
				copyPokemons.sort((a, b) => a.id - b.id);
			}
			if(payload === "Id-Descendente"){
				copyPokemons.sort((a, b) => b.id - a.id);
			}
			if(payload === "Attack"){
				copyPokemons.sort((a, b) => b.attack - a.attack)
			}
			return {
				...state,
				pokemons: copyPokemons,
			}
		case FILTER_TYPES:
			const filteredPokemonsTypes = state.allPokemons.filter(pokemon => {
				return pokemon.types.some(type => payload.includes(type));
			});
			return {
				...state,
				pokemons: payload.length ? filteredPokemonsTypes : state.allPokemons,
			}
		case FILTER_ORIGIN:
			let copyAllPokemons = [...state.allPokemons];
			if(payload === "pokeapi"){
				copyAllPokemons = copyAllPokemons.slice(0, 50);
			}
			if(payload === "database"){
				copyAllPokemons = copyAllPokemons.slice(50);
			}
			return {
				...state,
				pokemons: copyAllPokemons,
			}
		default:
			return {...state};
	}
};

export default reducer;