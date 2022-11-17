import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import store from '../store';

const Matches = () => {
	const [matchedDrinks, setMatchedDrinks] = useState([]);

	const { stockedIngredients, drinks } = useSelector((state) => state);

	const { mode } = useParams();

	const ingredientIsInStock = (ingredient) => {
		return stockedIngredients.includes(ingredient);
	};

	useEffect(() => {
		if (stockedIngredients.length && drinks.length) {
			if (mode === 'strict') {
				setMatchedDrinks(
					drinks.filter((drink) => {
						return drink.ingredients.every(ingredientIsInStock);
					})
				);
			} else {
				setMatchedDrinks(
					drinks.filter((drink) => {
						return drink.ingredients.some(ingredientIsInStock);
					})
				);
			}
		}
	}, [stockedIngredients, drinks]);

	if (!stockedIngredients.length || !drinks.length) {
		return <div>Finding matches...</div>;
	} else if (!matchedDrinks.length) {
		return <div>No matches found</div>;
	} else {
		return (
			<div>
				Matches:
				<ul>
					{matchedDrinks.map((drink) => (
						<li>{drink.strDrink}</li>
					))}
				</ul>
			</div>
		);
	}
};

export default Matches;
