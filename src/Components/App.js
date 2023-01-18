import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchIngredients, fetchDrinks } from '../store';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Matches from './Matches';
import Ingredients from './Ingredients';
import Home from './Home';

import './App.css';

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchIngredients());
		dispatch(fetchDrinks());
	}, []);

	return (
		<div className="App">
			<Header />

			<main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/ingredients" element={<Ingredients />} />
					<Route path="/matches/:mode" element={<Matches />} />
				</Routes>
			</main>
		</div>
	);
};

export default App;
