const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.send("Unauthorized, Please Login");
  }
};
module.exports = isAuthenticated;
