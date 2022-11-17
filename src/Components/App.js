import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchIngredients, fetchDrinks } from '../store';
import { Link, useNavigate, Routes, Route } from 'react-router-dom';
import Picker from './Picker';
import Matches from './Matches';

const App = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchIngredients());
		dispatch(fetchDrinks());
	}, []);

	return (
		<div className="App">
			<h1>What should I drink?</h1>
			<Link to="/picker">Use the picker</Link>
			<Routes>
				<Route path="/" />
				<Route path="/picker" element={<Picker />} />
				<Route path="/matches/:mode" element={<Matches />} />
			</Routes>
		</div>
	);
};

export default App;
