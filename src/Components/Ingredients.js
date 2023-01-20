import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { stockIngredients } from '../store';
import Home from './Home';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import { alpha, styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import './Ingredients.css';

const StyledSwitch = styled(Switch)(({ theme }) => ({
	'& .MuiSwitch-switchBase.Mui-checked': {
		color: 'var(--bombay)',
		'&:hover': {
			backgroundColor: alpha('#6294bc', theme.palette.action.hoverOpacity),
		},
	},
	'& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
		backgroundColor: 'var(--bombay)',
	},
}));

const Ingredients = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { ingredients } = useSelector((state) => state);

	const [stockedIngredients, setStockedIngredients] = useState([]);
	const [mode, setMode] = useState('loose');
	const [open, setOpen] = React.useState(true);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		navigate('/');
	};

	const onChange = (e) => {
		if (stockedIngredients.includes(e.target.name)) {
			setStockedIngredients(stockedIngredients.filter((i) => i !== e.target.name));
		} else {
			setStockedIngredients([...stockedIngredients, e.target.name]);
		}
	};

	const onSubmit = (e) => {
		dispatch(stockIngredients(stockedIngredients));
		navigate(`/matches/${mode}`);
	};

	const handleModeChange = (e) => {
		if (e.target.checked) {
			setMode('loose');
		} else {
			setMode('strict');
		}
	};

	return (
		<div className="Ingredients">
			<Home ingredientButtonAction={handleClickOpen} />

			<Dialog open={open} maxWidth="lg" fullWidth={true} PaperProps={{ style: { backgroundColor: 'var(--black)' } }}>
				<DialogTitle
					sx={{
						textTransform: 'uppercase',
						letterSpacing: '2px',
						fontSize: '2rem',
						fontWeight: 400,
						color: 'var(--white)',
						textAlign: 'center',
					}}
				>
					Check which ingredients you have on hand:
				</DialogTitle>

				<DialogContent>
					<div className="Ingredients-list">
						{ingredients.map((ingredient) => {
							return (
								<FormControlLabel
									control={
										<Checkbox
											sx={{
												color: 'var(--bombay)',
												'&.Mui-checked': {
													color: 'var(--bombay)',
												},
											}}
											checkedIcon={<DoneOutlinedIcon />}
										/>
									}
									disableTypography={true}
									onChange={onChange}
									label={ingredient}
									name={ingredient}
									key={ingredient}
									sx={{
										margin: 0,
									}}
								/>
							);
						})}
					</div>
				</DialogContent>

				<DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<button onClick={handleClose}>Cancel</button>

					<div>
						<Tooltip title="Unselecting this option will use strict mode, limiting the cocktail results, and is not recommended.">
							<FormControlLabel
								control={<StyledSwitch defaultChecked />}
								onChange={handleModeChange}
								label="Include cocktails that may require other ingredients"
								disableTypography={true}
								sx={{
									textTransform: 'uppercase',
									letterSpacing: '2px',
									color: 'var(--white)',
								}}
							/>
						</Tooltip>
						<button onClick={onSubmit}>Submit</button>
					</div>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default Ingredients;
