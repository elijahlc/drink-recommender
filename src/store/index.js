import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const ingredients = (state = [], action) => {
	if (action.type === 'ingredients/set') {
		return action.ingredients;
	}

	return state;
};

const stockedIngredients = (state = [], action) => {
	if (action.type === 'ingredients/stock') {
		return action.ingredients;
	}

	return state;
};

const drinks = (state = [], action) => {
	if (action.type === 'drinks/set') {
		return action.drinks;
	}

	return state;
};

export const fetchIngredients = () => {
	return async (dispatch) => {
		const response = await axios.get(
			'https://www.thecocktaildb.com/api/json/v1/1/list.php',
			{
				params: {
					i: 'list',
				},
			}
		);

		const ingredients = response.data.drinks.reduce((accum, elem) => {
			accum.push(elem.strIngredient1);
			return accum;
		}, []);

		dispatch({
			type: 'ingredients/set',
			ingredients: ingredients,
		});
	};
};

export const fetchDrinks = () => {
	return async (dispatch) => {
		const response = await axios.get(
			'https://www.thecocktaildb.com/api/json/v1/1/filter.php',
			{
				params: {
					c: 'Cocktail',
				},
			}
		);

		dispatch({ type: 'drinks/set', drinks: response.data.drinks });
	};
};

export const stockIngredients = (ingredients) => {
	return async (dispatch) => {
		dispatch({ type: 'ingredients/stock', ingredients });
	};
};

const reducer = combineReducers({
	ingredients,
	stockedIngredients,
	drinks,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
