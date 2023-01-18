const express = require('express');
const axios = require('axios');

const app = express.Router();

app.get('/', async (req, res, next) => {
	try {
		const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/list.php', {
			params: {
				i: 'list',
			},
		});

		const ingredients = response.data.drinks.reduce((accum, elem) => {
			accum.push(elem.strIngredient1);
			return accum;
		}, []);

		res.send(ingredients);
	} catch (ex) {
		next(ex);
	}
});

module.exports = app;
