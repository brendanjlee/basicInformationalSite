const express = require('express');
const logger = require('morgan');

const app = express();
const PORT = 8080;

app.use(logger('dev')) 
app.use(express.static('public'));

app.listen(PORT, () => console.log(`Express Server running on PORT=${PORT}`))