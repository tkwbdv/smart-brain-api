const handleSignIn = (req, res, db, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("incorrect form submission");
  }
  db.select("hash") // load hash from db
    .from("login")
    .where("email", email)
    .then(hash => { // verify provided password against hash
      if (hash.length) {
        bcrypt.compare(password, hash[0].hash, function (err, response) {
          if (err) {
            throw err;
          }
          if (response) { // respond with userdata
            db.select("*")
              .from("users")
              .where("email", email)
              .then(user => {
                res.json(user[0]);
              })
          } else {
            res.status(400).json("unable to sign in");
          }
        });
      } else {
        res.status(400).json("unable to sign in");
      }
    })
    .catch(err => res.status(400).json(err));
}

module.exports = {
  handleSignIn: handleSignIn
};