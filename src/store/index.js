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
		const response = await axios.get('/api/ingredients');

		dispatch({
			type: 'ingredients/set',
			ingredients: response.data,
		});
	};
};

export const fetchDrinks = () => {
	return async (dispatch) => {
		const response = await axios.get('/api/drinks');

		dispatch({ type: 'drinks/set', drinks: response.data });
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
