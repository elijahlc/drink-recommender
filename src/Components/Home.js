import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
const Home = () => {
	const navigate = useNavigate();

	return (
		<div className="Home">
			<Typography variant="h1">Ready for a cocktail?</Typography>
			<div className="Home-section">
				<Typography variant="h5">
					Have ingredients at home but don't know what cocktail you can make with them? Let us help you decide!
				</Typography>

				<Button variant="outlined" onClick={() => navigate('/ingredients')}>
					Select your ingredients
				</Button>
			</div>
			{/* <div className="Home-section">
				<Typography variant="h5">
					Willing to go out and buy whatever you need for any drink?
				</Typography>

				<Button variant="outlined" onClick={() => navigate('/ingredients')}>
					Get a random cocktail
				</Button>
			</div> */}
		</div>
	);
};

export default Home;
