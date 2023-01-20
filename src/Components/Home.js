import React from 'react';
import { useNavigate } from 'react-router-dom';

import './Home.css';

const Home = ({ ingredientButtonAction }) => {
	const navigate = useNavigate();

	const handleIngredientButtonClick = () => {
		if (ingredientButtonAction) {
			ingredientButtonAction();
		} else {
			navigate('/ingredients');
		}
	};

	return (
		<div className="Home">
			<h1>Ready for a cocktail?</h1>
			<div className="Home-action-buttons">
				<button onClick={handleIngredientButtonClick}>Enter my ingredients</button>
				<button>Recommend a random cocktail</button>
			</div>
		</div>
	);
};

export default Home;
