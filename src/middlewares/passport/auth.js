import jwt from 'express-jwt';
// import User from '../../models/user';

const getTokenRquest = req => {
  const { authorization } = req.headers;
  let token = '';
  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    // eslint-disable-next-line prefer-destructuring
    token = authorization.split(' ')[1];
  }
  if (!token && req.cookies) {
    token = req.cookies.token;
  }
  // console.log(token);
  // const user = await User.findByToken(token);
  // console.log('auth: ', user);
  // if (!user) {
  //   token = '';
  // }
  return token;
};

const auth = {
  authenticated: jwt({
    secret: 'secret',
    userProperty: 'payload',
    algorithms: ['HS256'],
    getToken: getTokenRquest,
  }),
};

export default auth;
