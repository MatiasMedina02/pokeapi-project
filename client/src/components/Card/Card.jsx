import "./Card.css";
import { Link } from "react-router-dom";

const Card = ({ pokemon }) => {
	return (
		<Link to={`/detail/${pokemon.id}`} className="Card">
			<div className="Card-img">
				<img src={pokemon.image} alt={pokemon.name} />
			</div>
			<div className="Card-info">
				<h3 className="Card-info-id">#{pokemon.id}</h3>
				<h3 className="Card-info-name">{pokemon.name}</h3>
				<div className="Card-types">
					{pokemon.types.map((type, index) => (
						<div key={index} className={`Card-type ${type}`}>
								<span>{type}</span>
						</div>
					))}
				</div>
			</div>
		</Link>
	)
}

export default Card