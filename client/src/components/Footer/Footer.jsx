import "./Footer.css";
import { socialMedia } from "../../helpers/data";

const Footer = () => {
	const year = new Date();
	return (
		<div className="Footer">
			<div className="Footer-info">
				<p>Copyright &copy; <span>{year.getFullYear()}</span> All Rights Reserved.</p>
			</div>
			<ul className="Footer-social_media">
				{socialMedia.map(social => (
					<li key={social.id}>
						<a target="_blank" href={social.url}>
						<img className="Footer-social_media__img" src={social.image} alt="Social Media" />
						</a>
					</li>
				))}
			</ul>
		</div>
	)
}

export default Footer