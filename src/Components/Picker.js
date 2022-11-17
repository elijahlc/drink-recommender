import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { stockIngredients } from '../store';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const Picker = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { ingredients } = useSelector((state) => state);

	const [stockedIngredients, setStockedIngredients] = useState([]);
	const [mode, setMode] = useState('loose');

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
		e.preventDefault();
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
			<h2>Select which of the following ingredients you have on hand:</h2>
			<form onSubmit={onSubmit}>
				{ingredients.map((ingredient) => {
					return (
						<span key={ingredient}>
							<input
								type="checkbox"
								id={ingredient}
								name={ingredient}
								onChange={onChange}
							/>
							<label htmlFor={ingredient}>{ingredient}</label>
						</span>
					);
				})}
				<FormGroup>
					<FormControlLabel
						control={<Switch />}
						onChange={handleModeChange}
						label="Use strict mode (only match recipes you have all ingredients for, not recommended)"
					/>
				</FormGroup>
				<button>Submit</button>
			</form>
		</div>
	);
};

export default Picker;
