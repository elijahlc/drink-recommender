import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchIngredients, fetchDrinks } from '../store';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Matches from './Matches';
import Ingredients from './Ingredients';
import Home from './Home';
import NotFound from './NotFound';

import './App.css';

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchIngredients());
		dispatch(fetchDrinks());

		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	}, []);

	return (
		<div
			className="App"
			style={{
				backgroundImage: 'url("../../assets/bar-wall.jpg")',
				backgroundSize: 'cover',
				backgroundRepeat: 'repeat-y',
			}}
		>
			<Header />

			<main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/ingredients" element={<Ingredients />} />
					<Route path="/matches/:mode" element={<Matches />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</main>
		</div>
	);
};

export default App;
