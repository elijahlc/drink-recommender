import React from 'react';
import { Link } from 'react-router-dom';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

import './Header.css';

const Header = () => {
	return (
		<header>
			<Link className="header-home" to="/">
				<HomeRoundedIcon />
			</Link>
			<div className="header-menu">Find me a cocktail</div>
		</header>
	);
};

export default Header;
