
// route middleware to make sure a user is logged in
module.exports.isLoggedIn = function(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/preguntas');
}

// route middleware to make sure a user is NOT logged in
module.exports.isNotLoggedIn = function (req, res, next) {

    // if user is NOT authenticated in the session, carry on
    if (!req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/preguntas');
}

module.exports.locals_variables = function(req, res, next) {
  //console.log('locals_variables');
  //console.log(req.user);
  res.locals.authed = req.isAuthenticated();
  res.locals.reqUser = req.user;
  return next();
}
