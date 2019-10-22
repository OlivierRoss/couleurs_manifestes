const passport = require('passport');
const LocalStrategy = require('passport-local');

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, (email, password, done) => {
  if(email == process.env.MASTER_USER_EMAIL && password == process.env.MASTER_USER_PASSWORD) {
    return done(null, {name: 'reussi'});
  }
  else {
    return done(null, false, { errors: { 'email or password': 'is invalid'  }  });
  }
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
