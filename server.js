const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const db = require('./config/keys').mongoURI;
const port = process.env.PORT || 5000;

const users = require('./routes/user');
const posts = require('./routes/post');

const app = express();

/* Body Parser built-in to Express as of version 4.16 */
app.use(express.json());

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/users', users);
app.use('/posts', posts);

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    app.listen(port);
    console.log('DB connected')
  })
  .catch(err => {
    console.log(err);
  });