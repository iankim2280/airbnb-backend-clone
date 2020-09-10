export const isProduct = process.env.NODE_ENV === 'production';
export const returnSuccessJson = (res, statusCode, data) => {
  return res.status(statusCode).json({
    status: 'ok',
    data,
    error: null,
  });
};

export const returnErrorJson = (res, statusCode, error) => {
  console.log(statusCode, 'test data : ', error);
  return res.status(statusCode).json({
    status: 'error',
    data: null,
    error: {
      message: error.message,
      stack: error.stack,
    },
  });
};

export const tryCatchToNext = fn => {
  // fn should be a promise
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

export const addCookie = (res, token) => {
  const cookieOptions = {
    expires: new Date(Date.now() + 60 * 60 * 1000),
    httpOnly: true,
  };
  if (isProduct) cookieOptions.secure = true;
  res.cookie('token', token, cookieOptions);
};
