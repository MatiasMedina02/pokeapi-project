import "./Navbar.css";
import SearchBar from "../SearchBar/SearchBar";
import LogoPokemon from "../../assets/pokemon_logo.png";
import { Link } from "react-router-dom";

const Navbar = ({ allPokemons, onSearch }) => {
	return (
		<div className="Navbar">
			<div className="Navbar-logo">
				<Link to="/home">
					<img src={LogoPokemon} alt="Logo Pokemon" />
				</Link>
			</div>
			<SearchBar allPokemons={allPokemons} onSearch={onSearch} />
			<div className="Navbar-buttons">
				<button className="Navbar-btn" type="button">
					<Link to="/home">
						<p className="Navbar-text">Home</p>
					</Link>
				</button>
				<button className="Navbar-btn" type="button">
					<Link to="/create">
						<p className="Navbar-text">Create</p>
					</Link>
				</button>
			</div>
		</div>
	)
}

export default Navbar