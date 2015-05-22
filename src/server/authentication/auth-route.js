

module.exports = function (app) {
app.post('/login', function (request, response, next) {
    var username = request.body.username;
    var password = request.body.password;

    console.log("Attempting login: %s %s", username, password);
    //next();

    if(username.length >0 && password === "password"){
      response.cookie('session', 1234, {maxAge: 900 * 1000, httpOnly: true});
      response.cookie('li', 1, {maxAge: 900 * 1000});
      response.status(203).send({ok:1});
    }else {
      response.cookie('session', '', {maxAge: 0, httpOnly: true});
      response.cookie('li', 0, {maxAge: 900 * 1000});
      response.status(401).send({notLoggedIn:0});
    }

  });

  app.post('/logout', function (req, res) {
    res.cookie('session', '', {maxAge: 0, httpOnly: true});
    res.cookie('li', 0, {maxAge: 900 * 1000});
    res.status(204).send();
  });
};
