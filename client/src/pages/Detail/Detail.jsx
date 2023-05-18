import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import "./Detail.css";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import BtnBack from "../../components/BtnBack/BtnBack";

// Icons
import Normal from "../../assets/imgTypes/normal.png";
import Fighting from "../../assets/imgTypes/fighting.png";
import Flying from "../../assets/imgTypes/flying.png";
import Poison from "../../assets/imgTypes/poison.png";
import Ground from "../../assets/imgTypes/ground.png";
import Rock from "../../assets/imgTypes/rock.png";
import Bug from "../../assets/imgTypes/bug.png";
import Ghost from "../../assets/imgTypes/ghost.png";
import Steel from "../../assets/imgTypes/steel.png";
import Fire from "../../assets/imgTypes/fire.png";
import Water from "../../assets/imgTypes/water.png";
import Grass from "../../assets/imgTypes/grass.png";
import Electric from "../../assets/imgTypes/electric.png";
import Psychic from "../../assets/imgTypes/psychic.png";
import Ice from "../../assets/imgTypes/ice.png";
import Dragon from "../../assets/imgTypes/dragon.png";
import Dark from "../../assets/imgTypes/dark.png";
import Fairy from "../../assets/imgTypes/fairy.png";
import Unknown from "../../assets/imgTypes/unknown.png";

const URL_POKEMON = "http://localhost:3001/pokemon";

const Detail = () => {
	const { id } = useParams();
	const [pokemon, setPokemon] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		axios(`${URL_POKEMON}/${id}`)
			.then(({ data }) => {
				setPokemon(data);
				setIsLoading(false);
			})
			.catch(error => {
				console.error(error.message);
				setIsLoading(false);
			});
	}, [id]);

	const typeColors = {
    normal: "#a8a878",
    fighting: "#c03028",
    flying: "#a890f0",
    poison: "#a040a0",
		ground: "#e0c068",
		rock: "#b8a038",
		bug: "#a8b820",
		ghost: "#705898",
		steel: "#b8b8d0",
		fire: "#f08030",
		water: "#6890f0",
		grass: "#78c850",
		electric: "#f8d030",
		psychic: "#f85888",
		ice: "#98d8d8",
		dragon: "#7038f8",
		dark: "#705848",
		fairy: "#ee99ac",
		unknown: "#68a090",
		shadow: "#5b5b5b"
  };

  const firstType = pokemon.types && pokemon.types[0];

  const firstColorType = typeColors[firstType] || "#FFFFFF";

	return (
		<div className="Detail">
			<BtnBack />
			{isLoading ? <LoadingSpinner /> : (
				<div className="CardDetail">
					<div className="CardDetail-first">
						<div className="CardDetail-hp">
								<span>HP</span>
								<h3>{pokemon.hp}</h3>
						</div>
						<img className="CardDetail-img" src={pokemon.image} alt={pokemon.name} />
						<h2 className="CardDetail-name">{pokemon.name}</h2>
						<div className="CardDetail-types">
							{pokemon.types && pokemon.types.map((type, index) => (
								<div className="typeIcon" key={index}>
									{type === "normal" && <img src={Normal} alt={type} />}
									{type === "fighting" && <img src={Fighting} alt={type} />}
									{type === "flying" && <img src={Flying} alt={type} />}
									{type === "poison" && <img src={Poison} alt={type} />}
									{type === "groud" && <img src={Ground} alt={type} />}
									{type === "rock" && <img src={Rock} alt={type} />}
									{type === "bug" && <img src={Bug} alt={type} />}
									{type === "ghost" && <img src={Ghost} alt={type} />}
									{type === "steel" && <img src={Steel} alt={type} />}
									{type === "fire" && <img src={Fire} alt={type} />}
									{type === "water" && <img src={Water} alt={type} />}
									{type === "grass" && <img src={Grass} alt={type} />}
									{type === "electric" && <img src={Electric} alt={type} />}
									{type === "psychic" && <img src={Psychic} alt={type} />}
									{type === "ice" && <img src={Ice} alt={type} />}
									{type === "dragon" && <img src={Dragon} alt={type} />}
									{type === "dark" && <img src={Dark} alt={type} />}
									{type === "fairy" && <img src={Fairy} alt={type} />}
									{type === "unknown" && <img src={Unknown} alt={type} />}
									{type === "shadow" && <img src={Dark} alt={type} />}
								</div>
							))}
						</div>
					</div>
					<div className="CardDetail-second">
						<div className="CardDetail-stats-first">
						{pokemon.height && 
							<div className={`CardDetail-height ${pokemon.weight && "borderDetail"}`}>
								<h3>{pokemon.height}m</h3>
								<span>Height</span>
							</div>}

							{pokemon.weight && 
							<div className="CardDetail-weight">
								<h3>{pokemon.weight}kg</h3>
								<span>Weight</span>
							</div>}
						</div>
						<div className="CardDetail-stats-second">
							<div className="CardDetail-stats">
								<h3>Attack: </h3>
								<div className="CardDetail-progress">
									<progress className={`CardDetail-progress-bar ${firstType}`} value={pokemon.attack} max={100} />
								</div>
								<span>{pokemon.attack}%</span>
							</div>

							<div className="CardDetail-stats">
								<h3>Defense:</h3> 
								<div className="CardDetail-progress">
									<progress className={`CardDetail-progress-bar ${firstType}`} value={pokemon.defense} max={100} />
								</div>
								<span>{pokemon.defense}%</span>
							</div>

							{pokemon.speed && 
							<div className="CardDetail-stats">
								<h3>Speed: </h3>
								<div className="CardDetail-progress">
									<progress className={`CardDetail-progress-bar ${firstType}`} value={pokemon.speed} max={100} />
								</div>
								<span>{pokemon.speed}%</span>
							</div>}
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Detail