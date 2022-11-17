import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { stockIngredients } from '../store';

const Picker = () => {
	const dispatch = useDispatch();
	const { ingredients } = useSelector((state) => state);

	const [stockedIngredients, setStockedIngredients] = useState([]);

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
				<button>Submit</button>
			</form>
		</div>
	);
};

export default Picker;
