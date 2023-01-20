import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';

import './Matches.css';

const Matches = () => {
	const navigate = useNavigate();

	const [matchedDrinks, setMatchedDrinks] = useState([]);
	const [open, setOpen] = useState(false);
	const [details, setDetails] = useState({
		name: '',
		ingredients: [],
		measurements: [],
		instructions: '',
	});

	const { stockedIngredients, drinks } = useSelector((state) => state);

	const { mode } = useParams();

	const ingredientIsInStock = (ingredient) => {
		return stockedIngredients.includes(ingredient);
	};

	const toggleDialog = (drink) => {
		setOpen(!open);

		if (details.name.length) {
			setDetails({
				...details,
				name: '',
				ingredients: [],
				measurements: [],
				instructions: '',
			});
		} else {
			setDetails({
				...details,
				name: drink.strDrink,
				ingredients: drink.ingredients,
				measurements: drink.measurements,
				instructions: drink.strInstructions,
			});
		}
	};

	useEffect(() => {
		if (stockedIngredients.length && drinks.length) {
			if (mode === 'strict') {
				setMatchedDrinks(
					drinks.filter((drink) => {
						return drink.ingredients.every(ingredientIsInStock);
					})
				);
			} else {
				setMatchedDrinks(
					drinks.filter((drink) => {
						return drink.ingredients.some(ingredientIsInStock);
					})
				);
			}
		}
	}, [stockedIngredients, drinks]);

	// if (!stockedIngredients.length || !drinks.length) {
	// 	return (
	// 		<ImageList cols={4} sx={{ width: '100vw', height: '100vh' }}>
	// 			<ImageListItem>
	// 				<Skeleton variant="rectangular" height={375} />
	// 			</ImageListItem>
	// 			<ImageListItem>
	// 				<Skeleton variant="rectangular" height={375} />
	// 			</ImageListItem>
	// 			<ImageListItem>
	// 				<Skeleton variant="rectangular" height={375} />
	// 			</ImageListItem>
	// 			<ImageListItem>
	// 				<Skeleton variant="rectangular" height={375} />
	// 			</ImageListItem>
	// 		</ImageList>
	// 	);
	// } else if (stockedIngredients.length && drinks.length && !matchedDrinks.length) {
	// 	return (
	// 		<Box>
	// 			<Typography>No matches found.</Typography>
	// 		</Box>
	// 	);
	// } else {
	// return (
	// 	<div className="Matches">
	// 		<ImageList cols={4}>
	// 			{matchedDrinks.map((drink) => {
	// 				return (
	// 					<ImageListItem key={drink.strDrink}>
	// 						<img src={`${drink.strDrinkThumb}?w=248&fit=crop&auto=format`} alt={drink.strDrink} loading="lazy" />
	// 						<ImageListItemBar
	// 							title={drink.strDrink}
	// 							actionIcon={
	// 								<IconButton
	// 									sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
	// 									aria-label={`info about ${drink.strDrink}`}
	// 									onClick={() => toggleDrawer(drink)}
	// 								>
	// 									<InfoIcon />
	// 									<Drawer anchor="right" open={drawerOpen}>
	// 										<Box sx={{ width: 400 }}>
	// 											<List>
	// 												<ListItem>
	// 													<Typography variant="h5" component="h2">
	// 														{details.name}
	// 													</Typography>
	// 												</ListItem>
	// 												<Divider />
	// 												<ListItem>
	// 													<Typography variant="h6" component="h3">
	// 														Ingredients
	// 													</Typography>
	// 												</ListItem>

	// 												{details.ingredients.map((ingredient, index) => {
	// 													return (
	// 														<ListItem key={ingredient}>
	// 															<Typography variant="body1">
	// 																{ingredient}: {details.measurements[index]}
	// 															</Typography>
	// 														</ListItem>
	// 													);
	// 												})}

	// 												<Divider />
	// 												<ListItem>
	// 													<Typography variant="h6" component="h3">
	// 														Instructions
	// 													</Typography>
	// 												</ListItem>
	// 												<ListItem>
	// 													<Typography variant="body1">{details.instructions}</Typography>
	// 												</ListItem>
	// 											</List>
	// 										</Box>
	// 									</Drawer>
	// 								</IconButton>
	// 							}
	// 						/>
	// 					</ImageListItem>
	// 				);
	// 			})}
	// 		</ImageList>
	// 	</div>
	// );
	// }
	if (!stockedIngredients.length || !drinks.length) {
		return (
			<div className="Matches">
				<Paper className="Matches-card">
					<Skeleton className="Matches-img-skeleton" sx={{ width: '100%', height: '75%' }} />
				</Paper>
				<Paper className="Matches-card">
					<Skeleton className="Matches-img-skeleton" sx={{ width: '100%', height: '75%' }} />
				</Paper>
				<Paper className="Matches-card">
					<Skeleton className="Matches-img-skeleton" sx={{ width: '100%', height: '75%' }} />
				</Paper>
				<Paper className="Matches-card">
					<Skeleton className="Matches-img-skeleton" sx={{ width: '100%', height: '75%' }} />
				</Paper>
			</div>
		);
	} else if (stockedIngredients.length && drinks.length && !matchedDrinks.length) {
		return (
			<div className="Matches Home">
				<h1>Sorry, no matching drinks found.</h1>
				<button onClick={() => navigate('/')}>Try again?</button>
			</div>
		);
	} else
		return (
			<div className="Matches">
				{matchedDrinks.map((drink) => {
					return (
						<Paper className="Matches-card" key={drink.name}>
							<img src={drink.strDrinkThumb} />
							<h2>{drink.strDrink}</h2>
							<button onClick={() => toggleDialog(drink)}>View recipe</button>
						</Paper>
					);
				})}

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
						{details.name}
					</DialogTitle>

					<DialogContent>
						<h3>Ingredients</h3>
						<ul>
							{details.ingredients.map((ingredient, index) => {
								return (
									<li key={`${ingredient}${index}`}>
										{ingredient}: {details.measurements[index]}
									</li>
								);
							})}
						</ul>
						<Divider light={true} />
						<h3>Instructions</h3>
						<p>{details.instructions}</p>
					</DialogContent>
					<DialogActions>
						<button onClick={toggleDialog}>Close</button>
					</DialogActions>
				</Dialog>
			</div>
		);
};

export default Matches;
