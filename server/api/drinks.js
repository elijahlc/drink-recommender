const express = require('express');
const axios = require('axios');

const app = express.Router();

app.get('/', async (req, res, next) => {
	try {
		const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php', {
			params: {
				c: 'Cocktail',
			},
		});

		let drinks = response.data.drinks;

		for (let drink of drinks) {
			const detailsResponse = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php', {
				params: {
					i: drink.idDrink,
				},
			});

			for (let property in detailsResponse.data.drinks[0]) {
				if (detailsResponse.data.drinks[0][property]) {
					drink[property] = detailsResponse.data.drinks[0][property];
				}
			}
		}

		for (let drink of drinks) {
			drink.ingredients = [];
			drink.measurements = [];

			for (let property in drink) {
				if (property.includes('Ingredient')) {
					drink.ingredients.push(drink[property]);
					drink.measurements.push(drink[`strMeasure${property[property.length - 1]}`]);

					delete drink[property];
					delete drink[`strMeasure${property[property.length - 1]}`];
				}
			}
		}

		res.send(drinks);
	} catch (ex) {
		next(ex);
	}
});

module.exports = app;
