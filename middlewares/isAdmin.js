module.exports = (req, res, next) => {
  if (!res.locals.isAdmin) return res.render("authviews/notautharized");
  next();
};
