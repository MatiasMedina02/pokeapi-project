import { Link } from "react-router-dom";
import "./SearchBar.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllPokemonStore } from "../../redux/actions";

const SearchBar = ({ allPokemons, onSearch }) => {
	const dispatch = useDispatch();
	const [search, setSearch] = useState("");

	const handleClick = event => {
		event.preventDefault();
		onSearch(search);
		setSearch("");
	}

	const handleChangeSearch = event => {
		setSearch(event.target.value);
		dispatch(getAllPokemonStore([...allPokemons]))
	};
	
	return (
		<div className="SearchBar">
			<input type="search" onChange={handleChangeSearch} value={search} placeholder="Search a pokemon..." />
			<Link to="/home">
					<button onClick={handleClick} type="search">
						<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
							<circle cx="10" cy="10" r="7" />
							<line x1="21" y1="21" x2="15" y2="15" />
						</svg>
					</button>
				</Link>
		</div>
	)
}

export default SearchBar