import { Link } from "react-router-dom";
import "./BtnBack.css";

const BtnBack = () => {
	return (
		<div className="BtnBack">
			<Link to="/home">
				<button className="BtnBack-btn" type="button">
					<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-left" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						<path d="M5 12l14 0" />
						<path d="M5 12l6 6" />
						<path d="M5 12l6 -6" />
					</svg>
					Go Back
				</button>
			</Link>
		</div>
	)
}

export default BtnBack