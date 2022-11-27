module.exports = (req, res, next) => {
  res.locals.isAuth = req.session.isAuth;
  res.locals.isAdmin = req.session.isAdmin;
  res.locals.fullname = req.session.fullname;
  res.locals.csrfToken = req.csrfToken();
  next();
};
