import {  useState } from "react";
import "./FilterBar.css";
import { filterPokemonsOrigin, filterPokemonsTypes } from "../../redux/actions";
import { useDispatch } from "react-redux";

const FilterBar = ({ types, isActive }) => {
	const [selectedTypes, setSelectedTypes] = useState([]);
	const [selectedOrigin, setSelectedOrigin] = useState("");
	const dispatch = useDispatch();

	const handleFilter = event => {
		const { checked, name } = event.target;
		if (checked) {
			const updatedSelectedTypes = [...selectedTypes, name];
			setSelectedTypes(updatedSelectedTypes);
			dispatch(filterPokemonsTypes(updatedSelectedTypes));
		} else {
			const updatedSelectedTypes = selectedTypes.filter(selectedType => selectedType !== name);
			setSelectedTypes(updatedSelectedTypes);
			dispatch(filterPokemonsTypes(updatedSelectedTypes));
		}
	}

	const handleOrigin = event => {
		const { value } = event.target;
		setSelectedOrigin(value);
		dispatch(filterPokemonsOrigin(value));
	}

	return (
		<div className={`FilterBar ${isActive ? "active" : ""}`}>
			<h3 className="FilterBar-title">Types</h3>
			{types.map((type, index) => (
				<div key={index} className="filterGroup-type">
					<input className="filterGroup-input_type" onChange={handleFilter} type="checkbox" name={type.name} />
					<label htmlFor={type.name}>{type.name.charAt(0).toUpperCase() + type.name.slice(1)}</label>
				</div>
			))}
			<h3 className="FilterBar-title">Origin</h3>
			<div className="filterGroup-origin">
				<input className="filterGroup-input_origin" type="radio" name="radio-group" onChange={handleOrigin} checked={selectedOrigin === "pokeapi"} value="pokeapi" />
				<label htmlFor="pokeapi">PokeApi</label>
			</div>
			<div className="filterGroup-origin">
				<input className="filterGroup-input_origin" type="radio" name="radio-group" onChange={handleOrigin} checked={selectedOrigin === "database"} value="database" />
				<label htmlFor="database">Database</label>
			</div>
		</div>
	)
}

export default FilterBar