require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = process.env.PORT;
const app = express();

// Routes
const attestRoute = require('./middlewares/attest')

// DB
// mongoose.connect(
//     process.env.MONGO_URI, 
//     { useNewUrlParser: true }, 
//     () => console.log('DB Connected!')
// );

// Middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use('/attest', attestRoute);


app.listen(port, () => console.log('Listening to Port:', port));