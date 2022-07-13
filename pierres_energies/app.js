require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose")
const config = require('config');
const { captureRejections } = require('events');

// Connexion à mongoDB et running le serveur sur le port 4000

const DATABASE_URI = config.get('DATABASE_URI');
const port = process.env.PORT || 4000;
mongoose.connect(DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(port), console.log('You are connected on : ' + DATABASE_URI))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 4000;

// Définition des routes 

const app = express();

const authRouter = require('./routes/auth');
const cartRouter = require('./routes/cart');
const itemRouter = require('./routes/item');
const orderRouter = require('./routes/order')

// Initialisation des routes path/controlers

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);
app.use('/items', itemRouter);
app.use('cart', cartRouter);
app.use('order', orderRouter);

// catch 404 and forward to error handler

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


