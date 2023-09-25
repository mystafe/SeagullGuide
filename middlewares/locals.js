module.exports = (req, res, next) => {
  res.locals.isAuth = req.session?.isAuth||true;
  res.locals.isAdmin = req.session?.isAdmin||true;
  res.locals.fullname = req.session?.fullname||"full name";
  // res.locals.csrfToken = req?.csrfToken()||"csrf token";
  res.locals.csrfToken = "csrf token";
  next();
};
