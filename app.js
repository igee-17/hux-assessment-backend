require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./routes/auth');
const cors = require('cors');
const user = require('./routes/user');


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/auth', auth);
app.use('/user', user);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));

module.exports = app
