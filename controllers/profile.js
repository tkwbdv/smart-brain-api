const handleProfileGet = (db) => (req, res) => { // :id gets passed through the params
  const { id } = req.params;
  db("users").where("id", id)
    .then(user => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("user not found");
      }
    })
    .catch(err => res.status(400).json("error getting user"));
}

module.exports = {
  handleProfileGet: handleProfileGet
}