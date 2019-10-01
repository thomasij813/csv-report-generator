const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('tiny'));

app.use('/', express.static('client'));

const port = 3000;

app.listen(port, () => console.log(`now listenng on port ${port}`))