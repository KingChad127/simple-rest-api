require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// connect to database
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
// console.log on error
db.on('error', (error) => console.log(error));
// console.log on open
db.once('open', () => console.log('connected to database...'));

// use middleware
// allows server to accept
// json as a request body 
app.use(express.json());

const subscribersRouter = require('./routes/subscribers');
app.use('/subscribers', subscribersRouter);


app.listen(3000, () => console.log("Server has started..."));