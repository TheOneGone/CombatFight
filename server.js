const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3334;

app.use(express.static('static'));
app.use(express.static('tests'));
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes')(app);

app.listen(port, () => {
    console.log('We are live on ' + port);
});
