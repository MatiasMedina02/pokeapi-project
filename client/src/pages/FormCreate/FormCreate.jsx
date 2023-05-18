import { useState } from "react";
import axios from "axios";
import "./FormCreate.css";
import { validateTypes, validation } from "../../helpers/validateForm";
import BtnBack from "../../components/BtnBack/BtnBack";
import Pokeball from "../../assets/pokeball.png"
import { useNavigate } from "react-router-dom";

const URL_POKEMONS = "http://localhost:3001/pokemons";

const FormCreate = ({ types, allPokemons }) => {
	const navigate = useNavigate();
	const [pokemonForm, setPokemonForm] = useState({ 
		name: "", 
		image: "",
		hp: 50, 
		attack: 50, 
		defense: 50, 
		speed: 50, 
		height: 500, 
		weight: 500,
		types: [],
	});
	const [errors, setErrors] = useState({
		name: "",
		image: "",
		types: "",
	});

	const imagesPokemon = allPokemons.reduce((acc, pokemon) => {
    if (!acc.includes(pokemon.image)) {
      acc.push(pokemon.image);
    }
    return acc;
  }, []);

	const handleValue = event => {
		const { value, name } = event.target;
		setPokemonForm({
			...pokemonForm,
			[name]: value,
		});
		const newErrors = validation({
			...pokemonForm,
			[name]: value,
		});
		setErrors(newErrors);
	};

	const handleSelectType = event => {
		const { value } = event.target;
		const updatedTypes = [...pokemonForm.types];
		if(updatedTypes.includes(value)){
			const filteredTypes = updatedTypes.filter(type => type !== value);
			const updatedPokemonForm = { ...pokemonForm, types: filteredTypes };
			setPokemonForm(updatedPokemonForm);
			return;
		}
		updatedTypes.push(value);
		const updatedPokemonForm = { ...pokemonForm, types: updatedTypes };
		setPokemonForm(updatedPokemonForm);

		const typesError = validateTypes(updatedTypes);
		setErrors({
			...errors,
			types: typesError,
		});
	}

	const handleSelectImage = event => {
		const { value } = event.target;
		if(value){
			setErrors({
				...errors,
				image: "",
			})
		}
		const updatedImage = { ...pokemonForm, image: value };
		setPokemonForm(updatedImage);
	}

	const handleSubmit = async event => {
		event.preventDefault();
		const existingErrors = Object.values(errors).some(value => value.trim().length !== 0);
		if (existingErrors) {
			alert("Aun faltan campos obligatorios por rellenar.");
			return;
		}
		try {
			await axios.post(URL_POKEMONS, pokemonForm, {
				headers: {
					"Content-Type": "application/json",
				}
			})
			setPokemonForm({ 
				name: "", 
				image: "",
				hp: 50, 
				attack: 50, 
				defense: 50, 
				speed: 50, 
				height: 500, 
				weight: 500,
				types: [],
			});
			navigate("/home");
			location.reload();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="FormCreate">
			<BtnBack />
			<form className="formCard" onSubmit={handleSubmit}>
				<div className="formCard-title">
					<img className="formCard-title_img" src={Pokeball} alt="Pokeball" />
					<h1>Create Your Pokemon</h1>
				</div>
				<div className="formGroup">
					<label htmlFor="name">Pokemon Name</label>
					<input className="formGroup-input_name" name="name" type="text" placeholder="Enter pokemon's name" onChange={handleValue} value={pokemonForm.name} />
					{errors.name && <span className="danger">{errors.name}</span>}
				</div>
				<div className="formGroup">
					<label htmlFor="image">Choose an image</label>
					{errors.image && <span className="danger">{errors.image}</span>}
					<div className="slider">
						{imagesPokemon.map((image, index) => (
							<button key={index} className={`item ${pokemonForm.image === image ? "isSelectedImg" : ""}`} type="button" value={image} onClick={handleSelectImage}>
								<img src={image} alt={`Slide ${index}`} />
							</button>
						))}
					</div>
				</div>
				<div className="formGroup">
					<label htmlFor="hp">Hp</label>
					<input name="hp" type="range" min="1" max="99" onChange={handleValue} value={pokemonForm.hp} />
					<output>{pokemonForm.hp}</output>
				</div>
				<div className="formGroup">
					<label htmlFor="attack">Attack</label>
					<input name="attack" type="range" min="1" max="99" onChange={handleValue} value={pokemonForm.attack} />
					<output>{pokemonForm.attack}</output>
				</div>
				<div className="formGroup">
					<label htmlFor="defense">Defense</label>
					<input name="defense" type="range" min="1" max="99" onChange={handleValue} value={pokemonForm.defense} />
					<output>{pokemonForm.defense}</output>
				</div>
				<div className="formGroup">
					<label htmlFor="speed">Speed</label>
					<input name="speed" type="range" min="1" max="99" onChange={handleValue} value={pokemonForm.speed} />
					<output>{pokemonForm.speed}</output>
				</div>
				<div className="formGroup">
					<label htmlFor="height">Height</label>
					<input name="height" type="range" min="1" max="999" onChange={handleValue} value={pokemonForm.height} />
					<output>{pokemonForm.height}</output>
				</div>
				<div className="formGroup">
					<label htmlFor="weight">Weight</label>
					<input name="weight" type="range" min="1" max="999" onChange={handleValue} value={pokemonForm.weight} />
					<output>{pokemonForm.weight}</output>
				</div>
				<div className="formGroup">
					<div className="types">
						<label htmlFor="types">Types</label>
						{errors.types && <span className="danger">{errors.types}</span>}
					</div>
					{types.map((type, index) => (
						<input className={`typesBtn ${pokemonForm.types.includes(type.name) ? "isSelectedType" : ""}`} onClick={handleSelectType} key={index} type="button" value={type.name} name={type.name} />
					))}
				</div>
				<button className="btnCreate" type="submit" onClick={handleSubmit}>
					<span>Create Pokemon</span>
				</button>
				{}
			</form>
		</div>
	)
}

export default FormCreate