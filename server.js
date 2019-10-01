const express = require('express');
const morgan = require('morgan');
const utils = require('./utils');
const multer = require('multer');

const app = express();
const upload = multer({dest: 'uploads/'});

app.use(morgan('tiny'));

app.use('/', express.static('client'));

app.post('/report', upload.single('jsonData'), (req, res, next) => {
    utils.deleteAllFiles('./uploads')
        .readFile(req.file.path)
        .then(data => JSON.parse(data.toString()))
        .then(jsonData => utils.createFile(jsonData))
        .then(fileName => res.download(`./${fileName}`))
        .catch(err => next(err));

});

const port = 3000;

app.listen(port, () => console.log(`now listenng on port ${port}`))