import "./Footer.css";

const Footer = () => {
	const year = new Date().getFullYear();
	return (
		<div className="Footer">
			<div className="createdBy">
				<a target="_blank" href="https://github.com/MatiasMedina02">
					<span>Created By: MatiasMedina02</span>
				</a>
			</div>
		</div>
	)
}

export default Footer