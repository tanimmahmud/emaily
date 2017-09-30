const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

const keys = require('./config/keys');

// importing passport service
require('./models/User');
require('./services/passport');
// connecting with mlab database
mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    maxAge: 30*24*60*60*1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

// all routes

require('./routes/authRoutes')(app);
require('./routes/currentUser')(app);

const PORT = process.env.PORT || 5000

console.log("Starting port ....")
app.listen(PORT);
