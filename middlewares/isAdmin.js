module.exports = (req, res, next) => {
  if (!res.locals.isAuth)
    return res.redirect("/login?returnUrl=" + req.originalUrl);
  next();
};
