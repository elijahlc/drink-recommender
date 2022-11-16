const express = require('express');
const path = require('path');

const app = express();

app.use('/dist', express.static(path.join(__dirname, './dist')));

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, './public/index.html'));
});

const initialize = () => {
	const port = process.env.PORT || 3000;
	app.listen(port, () => console.log(`app listening on port ${port}`));
};

initialize();
