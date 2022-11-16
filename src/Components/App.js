import React from 'react';
import { Link, useNavigate, Routes, Route } from 'react-router-dom';

const App = () => {
	const navigate = useNavigate();

	return (
		<div className="App">
			<h1>What should I drink?</h1>

			<Routes></Routes>
		</div>
	);
};

export default App;
