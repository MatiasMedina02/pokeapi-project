import "./Navbar.css";
import SearchBar from "../SearchBar/SearchBar";
import LogoPokemon from "../../assets/pokemon_logo.png";
import { Link } from "react-router-dom";
import DarkMode from "../DarkMode/DarkMode";

const Navbar = ({ allPokemons, onSearch, theme, setTheme }) => {
	return (
		<div className="Navbar">
			<div className="Navbar-logo">
				<Link to="/home">
					<img src={LogoPokemon} alt="Logo Pokemon" />
				</Link>
			</div>
			<DarkMode theme={theme} setTheme={setTheme} />
			<SearchBar allPokemons={allPokemons} onSearch={onSearch} />
			<div className="Navbar-buttons">
				<button className="Navbar-btn" type="button">
					<Link to="/home">
						<h3 className="Navbar-text">Home</h3>
					</Link>
				</button>
				<button className="Navbar-btn" type="button">
					<Link to="/create">
						<h3 className="Navbar-text">Create</h3>
					</Link>
				</button>
			</div>
		</div>
	)
}

export default Navbar