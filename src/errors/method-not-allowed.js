function methodNotAllowed(req, res, next) {
  next({
    status: 405,
    message: `${req.method} Method not allowed on ${req.originalUrl}`
  });
};

module.exports = methodNotAllowed;