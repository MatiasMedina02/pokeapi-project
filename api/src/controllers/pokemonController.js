const axios = require("axios");
const { Pokemon, Type } = require("../db.js");

const URL_POKEMON = "https://pokeapi.co/api/v2/pokemon";
const URL_TYPES = "https://pokeapi.co/api/v2/type";

// Trae los pokemons en un array de objetos para mostrar en las cartas
const getPokemons = async (req, res) => {
	try {
		const { data } = await axios(`${URL_POKEMON}?limit=50&offset=0`);
		const pokemonDataPromises = data.results.map(async (pokemon) => {
			const { data } = await axios(pokemon.url);
			return {
				id: data.id,
				name: data.name,
				image: data.sprites.other.home.front_default,
				attack: data.stats.find(({ stat }) => stat.name === "attack").base_stat,
				types: data.types.map(({ type }) => type.name),
			};
		});
		
		let numberPokemons = 51;
		const pokemonData = await Promise.all(pokemonDataPromises);
		const pokemonDb = await Pokemon.findAll({ include: [Type] });
		const combinedData = [
			...pokemonData,
			...pokemonDb.map(pokemon => ({
				id: numberPokemons++,
				name: pokemon.name,
				image: pokemon.image,
				attack: pokemon.attack,
				types: pokemon.types.map(type => type.name)
			})),
		];
    return res.status(200).json(combinedData);
	} catch (error) {
		return res.status(500).json({ error: error.message })
	}
};

// Trae el pokemon por id para mostrar sus datos en detail
const getPokemonById = async (req, res) => {
	const { idPokemon } = req.params;
	try {
		let pokemonData;

		// Busca si el pokemon existe en la base de datos
		const pokemonFromDb = await Pokemon.findOne({
			where: { id: idPokemon },
			include: { model: Type, attributes: ["name"] }
		});

		// Trae los datos del pokemon de la Api
		const { data } = await axios(`${URL_POKEMON}/${idPokemon}`)
		if(!data) return res.status(400).json({ error: "Bad Request" });
		
		// Se le asigna sus propiedades dependiendo de donde se lo encontro
		if(pokemonFromDb){
			const { id, name, image, hp, attack, defense, speed, height, weight, types } = pokemonFromDb;
			const typesNames = types.map((type) => type.name);
			pokemonData = {
				id,
				name,
				image,
				hp,
				attack,
				defense,
				speed,
				height,
				weight,
				types: typesNames,
			}
		} else {
			const { id, name, sprites, stats, types, height, weight } = data;
			const hp = stats.find(({ stat }) => stat.name === "hp").base_stat;
			const attack = stats.find(({ stat }) => stat.name === "attack").base_stat;
			const defense = stats.find(({ stat }) => stat.name === "defense").base_stat;
			const speed = stats.find(({ stat }) => stat.name === "speed").base_stat;
			pokemonData = {
				id,
				name,
				image: sprites.other.home.front_default,
				hp,
				attack,
				defense,
				speed,
				height,
				weight,
				types: types.map(({ type }) => type.name)
			};
		}

		if(!pokemonData) return res.status(400).json({ error: "Pokemon not found with this ID" });
		
		return res.status(200).json(pokemonData);
	} catch (error) {
		return res.status(500).json({ error: error.message })
	}
};

// Trae los pokemon que coincida con el nombre para el searchBar
const getPokemonByName = async (req, res) => {
	const { name } = req.query;
	try {
		let pokemonName = [];

		// Busca el pokemon en la base de datos
		const pokemonFoundName = await Pokemon.findOne({ where: { name } });
		console.log(pokemonFoundName);

		if(pokemonFoundName){
			pokemonName.push(pokemonFoundName);
		} else {
			const { data } = await axios(`${URL_POKEMON}/${name}`);
			if(!data) return res.status(400).json({ error: "Bad Request" });
			pokemonName.push(data.name.toLowerCase() === name.toLowerCase() ? data : null);
		}		

		console.log(pokemonName);
		if(!pokemonName.length) return res.status(404).json({ error: "Pokemon not found with this name" });

		return res.status(200).json(pokemonName);
	} catch (error) {
		return res.status(500).json({ error: error.message })
	}
};

// Crea un pokemon y lo relaciona con los tipos solicitados. Lo guarda en la base datos.
const postPokemon = async (req, res) => {
	const { name, image, hp, attack, defense, speed, height, weight, types} = req.body;
	try {
		if(!name || !image || !hp || !attack || !defense || types.length < 2) return res.status(400).json({ error: "Falta campos obligatorios" });
		
		// Verifica si ya existe un pokemon con el mismo nombre
		const pokemonExistsName = await Pokemon.findOne({ where: { name } });
		if(pokemonExistsName) return res.status(400).json({ error: "Ya existe un pokemon con ese nombre" });
		
		// Buscar los tipos de pokemon y asociarlos al nuevo pokemon
    const pokemonTypes = await Type.findAll({ where: { name: types  }});
		if(pokemonTypes.length < 2) return res.status(400).json({ error: "Se necesitan al menos dos tipos de pokemon" });
		
		// Crear un nuevo registro de pokemon con sus datos
		const lastPokemon = await Pokemon.findOne({ order: [["id", "DESC"]], limit: 1 });
		const newId = lastPokemon ? lastPokemon.id + 1 : 51;

		const pokemonExistsId = await Pokemon.findOne({ where: { id: newId } });
		if (pokemonExistsId) {
			return res.status(400).json({ error: "El ID de Pokemon ya está en uso" });
		}

		const newPokemon = await Pokemon.create({
			id: newId, 
			name, 
			image, 
			hp, 
			attack, 
			defense, 
			speed, 
			height, 
			weight
		});
		await newPokemon.addTypes(pokemonTypes);
		
		// Buscar el nuevo pokemon en la base de datos con sus tipos asociados
		const createdPokemon = await Pokemon.findOne({
			where: { id: newPokemon.id },
			include: [
				{ 
					model: Type, 
					attributes: ["id", "name"], 
					through: { attributes: [] } 
				},
			],
		})
		return res.status(201).json(createdPokemon);
	} catch (error) {
		return res.status(500).json({ error: error.message })
	}
};

// Obtiene un arreglo con todos los tipos de pokemons y lo guarda en la base de datos
const getTypes = async (req, res) => {
	try {
		const { data } = await axios(URL_TYPES);
		if(!data) return res.status(400).json({ error: "Bad Request" });

		// Si ya existen los tipos en la base de datos los devolvemos
		const typesInDb = await Type.findAll();
		if(typesInDb.length) return res.status(200).json(typesInDb);

		const types = data.results.map((type, i) => ({
			id: i + 1,
			name: type.name
		}));
		await Type.bulkCreate(types);
		return res.status(200).json(types);
	} catch (error) {
		return res.status(500).json({ error: error.message })
	}
};

module.exports = {
	getPokemons,
	getPokemonById,
	getPokemonByName,
	postPokemon,
	getTypes
}