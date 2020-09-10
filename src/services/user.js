import passport from 'passport';
import User from '../models/user';
import { returnSuccessJson, addCookie } from '../utils';
import AppError from '../utils/AppError';

export const createUser = user => {
  const newUser = new User(user);
  newUser.setPassword(user.password);
  newUser.password = undefined;
  return newUser.save();
};

export const doPassportLogin = (req, res, next) => {
  return passport.authenticate('local', { session: false }, async (err, user, info) => {
    console.log(user);
    if (err) {
      console.log(info);
      return next(err);
    }
    if (user) {
      const newUser = user;
      newUser.token = newUser.generateToken();
      addCookie(res, newUser.token);
      return returnSuccessJson(res, 200, newUser);
    }
    return new AppError('Invalid request', 400);
  });
};
