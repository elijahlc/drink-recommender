import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';

const RandomCocktail = () => {
	const [cocktail, setCocktail] = useState({});

	useEffect(() => {
		const getCocktail = async () => {
			const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');

			return response.data.drinks[0];
		};

		const randomCocktail = getCocktail();
		setCocktail(randomCocktail);
	}, []);

	return (
		<div className="RandomCocktail">
			<Paper elevation={3} />
		</div>
	);
};

export default RandomCocktail;
