const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3333;

app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes')(app);

app.listen(port, () => {
    console.log('We are live on ' + port);
});
