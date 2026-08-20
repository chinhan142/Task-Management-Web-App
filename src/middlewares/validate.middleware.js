export const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!name || !email || !password) {
    const error = new Error("Missing required fields!");
    error.status = 400;
    return next(error);
  }

  if (!EMAIL_REGEX.test(email)) {
    const error = new Error("Invalid email!");
    error.status = 400;
    return next(error);
  }

  if (password.length < 6) {
    const error = new Error("Password length is not long enough!");
    error.status = 400;
    return next(error);
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new Error("Missing required fields!");
    error.status = 400;
    return next(error);
  }

  next();
};
