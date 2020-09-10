import { returnSuccessJson, tryCatchToNext, addCookie } from '../utils';
import * as userService from '../services/user';

// export const createUser = async (req, res, next) => {
//   try {
//     const user = await userService.createUser(req.body);
//     returnSuccessJson(res, 200, user);
//   } catch (err) {
//     next(err);
//   }
// };

export const createUser = tryCatchToNext(async (req, res) => {
  const user = await userService.createUser(req.body);
  user.token = user.generateToken();
  addCookie(res, user.token);
  returnSuccessJson(res, 200, user);
});

export const login = tryCatchToNext(async (req, res, next) => {
  const user = await userService.doPassportLogin(req, res, next);
  user(req, res, next); // this is necessary
});

export const logout = tryCatchToNext((req, res, next) => {
  req.logout();
  res.cookie('token', '');
  returnSuccessJson(res, 200, 'logout successfully');
});

export const checkAuth = (req, res, next) => {
  try {
    returnSuccessJson(res, 200, 'pass~');
  } catch (err) {
    next(err);
  }
};
