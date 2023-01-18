import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchIngredients, fetchDrinks } from '../store';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Matches from './Matches';
import Ingredients from './Ingredients';
import Home from './Home';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LocalBarIcon from '@mui/icons-material/LocalBar';

import './App.css';

const App = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	useEffect(() => {
		dispatch(fetchIngredients());
		dispatch(fetchDrinks());
	}, []);

	return (
		<div className="App">
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" sx={{ flexGrow: 1, textDecoration: 'none' }}>
						<LocalBarIcon onClick={() => navigate('/')} />
					</Typography>
					<Button
						id="basic-button"
						color="inherit"
						aria-controls={open ? 'basic-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={open ? 'true' : undefined}
						onClick={handleClick}
					>
						Find me a cocktail
					</Button>
					<Menu
						id="basic-menu"
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						MenuListProps={{
							'aria-labelledby': 'basic-button',
						}}
					>
						<MenuItem
							onClick={() => {
								handleClose();
								navigate('/ingredients');
							}}
						>
							Use my ingredients
						</MenuItem>
						{/* <MenuItem
							onClick={() => {
								handleClose();
								navigate('/random');
							}}
						>
							Get a random cocktail
						</MenuItem> */}
					</Menu>
				</Toolbar>
			</AppBar>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/ingredients" element={<Ingredients />} />
				<Route path="/matches/:mode" element={<Matches />} />
			</Routes>
		</div>
	);
};

export default App;
