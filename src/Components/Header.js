import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import './Header.css';

const Header = () => {
	const navigate = useNavigate();

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<header>
			<Link className="header-home" to="/">
				<HomeRoundedIcon />
			</Link>
			<div id="header-menu" className="header-menu" onClick={handleClick}>
				Find me a cocktail
			</div>

			<Menu
				id="nav-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'header-menu',
				}}
			>
				<Link to="/ingredients" onClick={handleClose} name="ingredients">
					Enter my ingredients
				</Link>
				<Link to="/matches/random" onClick={handleClose} name="random">
					Recommend a random cocktail
				</Link>
			</Menu>
		</header>
	);
};

export default Header;
