const express = require ('express');
const routes = require('./routes/account'); // import the routes
const path = require('path');
//const bodyParser = require('body-parser');
//app.use(bodyParser.urlencoded({extended: false}));

const app = express();

app.use(express.json());

app.use('/', routes); //to use the routes

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})