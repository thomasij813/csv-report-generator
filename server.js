const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(morgan('tiny'));

app.use(bodyParser.urlencoded());
app.use('/', express.static('client'));


app.post('/report', (req, res) => {
    let f = req.body.json_data;
    console.log(f);
    res.redirect('/');
})

const port = 3000;

app.listen(port, () => console.log(`now listenng on port ${port}`))