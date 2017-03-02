const express = require('express'),
      session = require('express-session'),
      passport = require('passport'),
      GithubStrategy = require('passport-github2'),
      config = require('./config.js'),
      request = require('request');

const app = express();

app.use(session({secret: config.sessionSecret}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('./public'));

passport.use(new GithubStrategy({
  clientID: config.github.id,
  clientSecret: config.github.secret,
  callbackURL: 'http://localhost:3000/auth/github/callback'
}, function(accessToken, refreshToken, profile, done) {
  User.findOrCreate({githubId: profile.id}, function(err, user) {
      return done(err, user)
  })
}));

app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', passport.authenticate('github', {successRedirect: '/#/home', failureRedirect: '/auth/github'}))

var requireAuth = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(403).end();
  }
  return next();
}

request.get('https://api.github.com/user/followers').auth('username', 'password', false);
request.get('https://api.github.com/users/<username>/events');




app.listen(3000, function(){
    console.log('listening on port 3000')
})