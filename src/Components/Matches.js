import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';

import './Matches.css';

const Matches = () => {
	const navigate = useNavigate();

	const [matchedDrinks, setMatchedDrinks] = useState([]);
	const [open, setOpen] = useState(false);
	const [details, setDetails] = useState({
		name: '',
		ingredients: [],
		measurements: [],
		instructions: '',
	});

	const { stockedIngredients, drinks } = useSelector((state) => state);

	const { mode } = useParams();

	const ingredientIsInStock = (ingredient) => {
		return stockedIngredients.includes(ingredient);
	};

	const toggleDialog = (drink) => {
		setOpen(!open);

		if (details.name.length) {
			setDetails({
				...details,
				name: '',
				ingredients: [],
				measurements: [],
				instructions: '',
			});
		} else {
			setDetails({
				...details,
				name: drink.strDrink,
				ingredients: drink.ingredients,
				measurements: drink.measurements,
				instructions: drink.strInstructions,
			});
		}
	};

	const getRandomCocktail = () => {
		let randomIndex = Math.floor(Math.random() * 100);
		setMatchedDrinks(drinks.filter((drink, idx) => idx === randomIndex));
	};

	useEffect(() => {
		if (stockedIngredients.length && drinks.length) {
			if (mode === 'strict') {
				setMatchedDrinks(
					drinks.filter((drink) => {
						return drink.ingredients.every(ingredientIsInStock);
					})
				);
			} else if (mode === 'loose') {
				setMatchedDrinks(
					drinks.filter((drink) => {
						return drink.ingredients.some(ingredientIsInStock);
					})
				);
			}
		}

		if (drinks.length && mode === 'random') {
			getRandomCocktail();
		}
	}, [stockedIngredients, drinks]);

	if ((!stockedIngredients.length && mode !== 'random') || !drinks.length) {
		return (
			<div className="Matches">
				<div className="Matches-loading">
					<CircularProgress size="3rem" sx={{ color: 'var(--white)' }} />
					<span>{mode === 'random' ? 'Mixing your drink' : 'Finding matching cocktails'}</span>
				</div>
			</div>
		);
	} else if (stockedIngredients.length && drinks.length && !matchedDrinks.length) {
		return (
			<div className="Matches Home">
				<h1>Sorry, no matching drinks found.</h1>
				<button onClick={() => navigate('/')}>Try again?</button>
			</div>
		);
	} else
		return (
			<div
				className="Matches"
				style={{ flexDirection: mode === 'random' ? 'column' : 'row', flexWrap: mode === 'random' ? 'noWrap' : 'wrap' }}
			>
				{matchedDrinks.map((drink) => {
					return (
						<Paper className="Matches-card" key={drink.name}>
							<img src={drink.strDrinkThumb} />
							<h2>{drink.strDrink}</h2>
							<button onClick={() => toggleDialog(drink)}>View recipe</button>
						</Paper>
					);
				})}

				{mode === 'random' ? <button onClick={getRandomCocktail}>Get a new random cocktail</button> : null}

				<Dialog open={open} maxWidth="lg" fullWidth={true} PaperProps={{ style: { backgroundColor: 'var(--black)' } }}>
					<DialogTitle
						sx={{
							textTransform: 'uppercase',
							letterSpacing: '2px',
							fontSize: '2rem',
							fontWeight: 400,
							color: 'var(--white)',
							textAlign: 'center',
						}}
					>
						{details.name}
					</DialogTitle>

					<DialogContent>
						<h3>Ingredients</h3>
						<ul>
							{details.ingredients.map((ingredient, index) => {
								return (
									<li key={`${ingredient}${index}`}>
										{ingredient}: {details.measurements[index]}
									</li>
								);
							})}
						</ul>
						<h3>Instructions</h3>
						<p>{details.instructions}</p>
					</DialogContent>
					<DialogActions>
						<button onClick={toggleDialog}>Close</button>
					</DialogActions>
				</Dialog>
			</div>
		);
};

export default Matches;
