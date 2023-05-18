const { conn, Pokemon } = require("../../src/db.js");

describe("Test de Modelo Pokemon", () => {
	// Antes de cada prueba, crea la tabla de pokemons en la base de datos de prueba
	beforeEach(async () => {
		await conn.sync();
	});

	// Después de cada prueba, elimina la tabla de pokemons de la base de datos de prueba
	afterEach(async () => {
		await Pokemon.destroy({ where: {} });
	});

	// Debe ejecutarse el test una segunda vez para que funcione este
	it("Deberia crear un nuevo pokemon", async () => {
		const newPokemon = await Pokemon.create({
			name: "raul",
			image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/8.png",
			hp: 78,
			attack: 84,
			defense: 78,
			speed: 10,
			height: 5,
			weight: 90,
		});

		expect(newPokemon.name).toBe("raul");
		expect(newPokemon.hp).toBe(78);
		expect(newPokemon.speed).toBe(10);
	});

	it("Deberia obtener todos los pokemons", async () => {
		await Pokemon.bulkCreate([
			{
				name: "alex",
				image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
				hp: 20,
				attack: 84,
				defense: 10,
				speed: 10,
				height: 40,
				weight: 90,
			},
			{
				name: "sergio",
				image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/4.png",
				hp: 60,
				attack: 74,
				defense: 9,
				speed: 10,
				height: 48,
				weight: 97,
			}
		]);

		const pokemons = await Pokemon.findAll();
		expect(pokemons).toHaveLength(2);
		expect(pokemons[0].name).toBe("alex");
		expect(pokemons[0].speed).toBe(10);
		expect(pokemons[1].name).toBe("sergio");
		expect(pokemons[1].hp).toBe(60);
	});

	it('Deberia requerir el campo "name"', async () => {
		try {
			await Pokemon.create({
				image: "https://img.pokemondb.net/artwork/large/charizard.jpg",
				hp: 78,
				attack: 84,
				defense: 30,
			})
		} catch (error) {
			expect(error.name).toBe("SequelizeValidationError");
			expect(error.message).toBe("notNull Violation: pokemon.name cannot be null");
		}
	});
});