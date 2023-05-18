import "./PageNotFound.css";
import BtnBack from "../../components/BtnBack/BtnBack";

const PageNotFound = () => {
	return (
		<div className="PageNotFound">
			<div className="PageNotFound-info">
				<h1>404</h1>
				<h3>Look like you're lost</h3>
				<p>The page you are looking for no avaible!</p>
			</div>
			<div className="PageNotFound-btn">
				<BtnBack />
			</div>
		</div>
	)
}

export default PageNotFound