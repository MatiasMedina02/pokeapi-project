import "./Home.css";
import Cards from "../../components/Cards/Cards";
import FilterBar from "../../components/FilterBar/FilterBar";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { orderPokemons } from "../../redux/actions";

const Home = ({ types, isLoading }) => {
	const [isActive, setIsActive] = useState(false);
	const [currentPage, setCurrentPage] = useState(0);
	const [countPage, setCountPage] = useState(1);
	const dispatch = useDispatch();

	const handleOrder = event => {
		dispatch(orderPokemons(event.target.value));
		setCurrentPage(0);
		setCountPage(1);
	}

	const handleFilter = () => {
		setIsActive(!isActive);
		setCurrentPage(0);
		setCountPage(1);
	}

	return (
		<div className="Home">
			<div className="Home-filter">
				<FilterBar types={types} isActive={isActive} />
			</div>
			<div className="Home-info">
				<div className="Home-btn">
					<button type="button" className="btnFilter" onClick={handleFilter}>
						<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-adjustments-horizontal" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
							<circle cx="14" cy="6" r="2" />
							<line x1="4" y1="6" x2="12" y2="6" />
							<line x1="16" y1="6" x2="20" y2="6" />
							<circle cx="8" cy="12" r="2" />
							<line x1="4" y1="12" x2="6" y2="12" />
							<line x1="10" y1="12" x2="20" y2="12" />
							<circle cx="17" cy="18" r="2" />
							<line x1="4" y1="18" x2="15" y2="18" />
							<line x1="19" y1="18" x2="20" y2="18" />
						</svg>
						Filtrar
					</button>
					<div className="HomeSelect">
						<select className="selectOrder" onChange={handleOrder} name="order" defaultValue="Order">
							<option value="Order" disabled>Order</option>
							<option value="Ascendente">A to Z</option>
							<option value="Descendente">Z to A</option>
							<option value="Id-Ascendente">ID Ascending</option>
							<option value="Id-Descendente">ID Descending</option>
							<option value="Attack">++Attack</option>
						</select>
					</div>
				</div>
				<Cards countPage={countPage} setCountPage={setCountPage} currentPage={currentPage} setCurrentPage={setCurrentPage} isLoading={isLoading} />
			</div>
		</div>
	)
}

export default Home