const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/assets', express.static(path.join(__dirname, '../assets')));
app.use('/api/drinks', require('./api/drinks'));
app.use('/api/ingredients', require('./api/ingredients'));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use((err, req, res, next) => {
	if (err.message && !err.errors) {
		res.status(err.status || 500).send({ error: err.message });
	} else {
		res.status(err.status || 500).send(err.errors);
	}
});

const initialize = () => {
	const port = process.env.PORT || 3000;
	app.listen(port, () => console.log(`app listening on port ${port}`));
};

initialize();
