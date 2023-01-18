import React from 'react';
import { useNavigate } from 'react-router-dom';

import './Home.css';

const Home = () => {
	const navigate = useNavigate();

	return (
		<div className="Home">
			<h1>Ready for a cocktail?</h1>
			<div
				className="Home-image-container"
				style={{ backgroundImage: 'url("../../assets/bar-wall.jpg")', backgroundSize: 'cover' }}
			>
				<button onClick={() => navigate('/ingredients')}>Enter my ingredients</button>
				<button>Recommend a random cocktail</button>
			</div>
		</div>
	);
};

export default Home;
