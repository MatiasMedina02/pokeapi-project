const { Router } = require('express');

// Controllers
const { getPokemons, getPokemonById, getPokemonByName, postPokemon, getTypes } = require("../controllers/pokemonController");

const router = Router();

// Rutas
router.get("/pokemons", getPokemons);

router.get("/pokemon/:idPokemon", getPokemonById);

router.get("/pokemons/name", getPokemonByName);

router.post("/pokemons", postPokemon);

router.get("/types", getTypes);

module.exports = router;
