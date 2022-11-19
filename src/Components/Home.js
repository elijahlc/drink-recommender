import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const Home = () => {
	const navigate = useNavigate();

	return (
		<div>
			<h1>What should I drink?</h1>
			<div>
				Have ingredients at home but don't know what cocktail you can make with
				them? Let us help you decide!
			</div>
			<Button variant="outlined" onClick={() => navigate('/ingredients')}>
				Select your ingredients
			</Button>
		</div>
	);
};

export default Home;
