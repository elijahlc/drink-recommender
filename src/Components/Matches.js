import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

const Matches = () => {
	const [matchedDrinks, setMatchedDrinks] = useState([]);
	const [drawerOpen, setDrawerOpen] = useState(false);
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

	const toggleDrawer = (drink) => {
		setDrawerOpen(!drawerOpen);

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

	if (!stockedIngredients.length || !drinks.length) {
		return (
			<ImageList cols={4} sx={{ width: '100vw', height: '100vh' }}>
				<ImageListItem>
					<Skeleton variant="rectangular" height={375} />
				</ImageListItem>
				<ImageListItem>
					<Skeleton variant="rectangular" height={375} />
				</ImageListItem>
				<ImageListItem>
					<Skeleton variant="rectangular" height={375} />
				</ImageListItem>
				<ImageListItem>
					<Skeleton variant="rectangular" height={375} />
				</ImageListItem>
			</ImageList>
		);
	} else if (
		stockedIngredients.length &&
		drinks.length &&
		!matchedDrinks.length
	) {
		return <div>No matches found</div>;
	} else {
		return (
			<ImageList cols={4} sx={{ width: '100vw', height: '100vh' }}>
				{matchedDrinks.map((drink) => {
					return (
						<ImageListItem key={drink.strDrink}>
							<img
								src={`${drink.strDrinkThumb}?w=248&fit=crop&auto=format`}
								alt={drink.strDrink}
								loading="lazy"
							/>
							<ImageListItemBar
								title={drink.strDrink}
								actionIcon={
									<IconButton
										sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
										aria-label={`info about ${drink.strDrink}`}
										onClick={() => toggleDrawer(drink)}
									>
										<InfoIcon />
										<Drawer anchor="right" open={drawerOpen}>
											<Box sx={{ width: 400 }}>
												<List>
													<ListItem>
														<Typography variant="h5" component="h2">
															{details.name}
														</Typography>
													</ListItem>
													<Divider />
													<ListItem>
														<Typography variant="h6" component="h3">
															Ingredients
														</Typography>
													</ListItem>

													{details.ingredients.map((ingredient, index) => {
														return (
															<ListItem key={ingredient}>
																<Typography variant="body1">
																	{ingredient}: {details.measurements[index]}
																</Typography>
															</ListItem>
														);
													})}

													<Divider />
													<ListItem>
														<Typography variant="h6" component="h3">
															Instructions
														</Typography>
													</ListItem>
													<ListItem>
														<Typography variant="body1">
															{details.instructions}
														</Typography>
													</ListItem>
												</List>
											</Box>
										</Drawer>
									</IconButton>
								}
							/>
						</ImageListItem>
					);
				})}
			</ImageList>
		);
	}
};

export default Matches;
