const express = require('express');
const morgan = require('morgan');
const utils = require('./utils');
const multer = require('multer');

const app = express();
const upload = multer({dest: 'uploads/'});

app.use(morgan('tiny'));

app.use('/', express.static('client'));

const clearUploadsFolder = (req, res, next) => {
    utils.deleteAllFiles('./uploads')
        .then(() => next())
        .catch(err => next(err));
};

app.post('/report', [clearUploadsFolder, upload.single('jsonData')], (req, res, next) => {
    utils.readFile(req.file.path)
        .then(data => JSON.parse(data.toString()))
        .then(jsonData => utils.createFile(jsonData, './reports'))
        .then(fileName => res.download(`./reports/${fileName}`))
        .catch(err => next(err));
});

const port = 3000;

app.listen(port, () => console.log(`now listenng on port ${port}`))