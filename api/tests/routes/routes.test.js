const request = require("supertest");
const app = require("../../src/app");

describe("Test de RUTAS", () => {
	const pokemon = {
		id: 1,
		name: "bulbasaur",
		image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png",
		hp: 45,
		attack: 49,
		defense: 49,
		speed: 45,
		height: 7,
		types: ["grass, poison"],
	}

	describe("GET /pokemon/:idPokemon", () => {
		it("Si todo funciona responde con status: 200", async () => {
			const response = await request(app).get("/pokemon/1").send();
			expect(response.status).toBe(200);
		});

		it("Responde con un objeto", async () => {
			const response = await request(app).get("/pokemon/1").send();
			expect(response.body).toBeInstanceOf(Object);
		});

		it('Responde un objeto con las propiedades: "id", "name", "image", "hp", "attack", "defense", "speed", "height", "types"', async () => {
			const response = await request(app).get("/pokemon/1").send();
			for(let prop in pokemon){
				expect(response.body).toHaveProperty(prop);
			}
		});
	});

	describe("POST /pokemons", () => {
		it("Crea un nuevo pokemon correctamente", async () =>{
			const pokemonData = {
				name: "luchon",
				image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/12.png",
				hp: 78,
				attack: 84,
				defense: 78,
				speed: 99,
				height: 5,
				weight: 90,
				types: ["poison", "flying"],
			}

			const response = await request(app).post("/pokemons").send(pokemonData);
			expect(response.status).toBe(201);
		});

		it("Debe retornar un mensaje de error si falta algún campo obligatorio", async () => {
			const pokemonIncomplete = {
				name: "doggy",
				image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/10.png",
				hp: 78,
				speed: 100,
				height: 54,
			}

			const response = await request(app).post("/pokemons").send(pokemonIncomplete);
			expect(response.status).toBe(400);
			expect(response.body).toHaveProperty("error");
			expect(response.body.error).toBe("Falta campos obligatorios");
		});
	});
});