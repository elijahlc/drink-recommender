import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
	const navigate = useNavigate();

	return (
		<div className="Home">
			<h1>Sorry, I don't know what you're looking for.</h1>
			<button onClick={() => navigate('/')}>Go home</button>
		</div>
	);
};

export default NotFound;
