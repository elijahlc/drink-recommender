import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { stockIngredients } from '../store';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';

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
	};

	const onChange = (e) => {
		if (stockedIngredients.includes(e.target.name)) {
			setStockedIngredients(
				stockedIngredients.filter((i) => i !== e.target.name)
			);
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
			setMode('strict');
		} else {
			setMode('loose');
		}
	};

	return (
		<div className="Picker">
			<Button variant="outlined" onClick={handleClickOpen}>
				Select your ingredients
			</Button>
			<Dialog open={open} maxWidth="lg" fullWidth={true}>
				<DialogTitle>
					Select which of the following ingredients you have on hand:
				</DialogTitle>
				<DialogContent>
					<Grid container spacing={2}>
						{ingredients.map((ingredient) => {
							return (
								<Grid item xs={4} key={ingredient}>
									<FormGroup>
										<FormControlLabel
											control={
												<Checkbox onChange={onChange} name={ingredient} />
											}
											label={ingredient}
										/>
									</FormGroup>
								</Grid>
							);
						})}
					</Grid>
					<FormGroup>
						<Tooltip title="Strict mode only matches recipes you have all the ingredients for (not recommended).">
							<FormControlLabel
								control={<Switch />}
								onChange={handleModeChange}
								label="Use strict mode"
							/>
						</Tooltip>
					</FormGroup>
				</DialogContent>
				<DialogActions>
					<Button name="cancel" onClick={handleClose}>
						Cancel
					</Button>
					<Button name="cancel" onClick={onSubmit}>
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default Ingredients;
