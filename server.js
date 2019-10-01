const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const createFile = require('./utils');

const app = express();

app.use(morgan('tiny'));

app.use(bodyParser.urlencoded());
app.use('/', express.static('client'));

app.post('/report', (req, res,next) => {
    let jsonData = req.body.json_data;
    createFile(JSON.parse(jsonData))
        .then(fileName => res.download(`./${fileName}`))
        .catch(err => next(err));
});

const port = 3000;

app.listen(port, () => console.log(`now listenng on port ${port}`))