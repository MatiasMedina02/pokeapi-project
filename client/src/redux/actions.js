import { FILTER_TYPES, FILTER_ORIGIN, GET_POKEMONS, ORDER } from "./action-types";

export const getAllPokemonStore = data => {
	return {
		type: GET_POKEMONS,
		payload: data,
	}
}

export const filterPokemonsTypes = types => {
	return {
		type: FILTER_TYPES,
		payload: types,
	}
}

export const filterPokemonsOrigin = origin => {
	return {
		type: FILTER_ORIGIN,
		payload: origin,
	}
}

export const orderPokemons = order => {
	return {
		type: ORDER,
		payload: order,
	}
}