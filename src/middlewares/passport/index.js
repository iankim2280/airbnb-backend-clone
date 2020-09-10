import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../../models/user';

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      // req.body.email, req.body.password
      const user = await User.findOne({ email }).select('+salt').select('+hash');
      if (user && user.validatePassword(password)) {
        return done(null, user);
      }
      // for error message
      return done(null, false, { errors: { message: 'password is not matched' } });
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});
