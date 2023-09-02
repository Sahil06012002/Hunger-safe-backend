const handleSignin = async (req, res, db) => {
  const { email, password } = req.body;
  console.log(email, password);
  db.select("id")
    .from("users")
    .where({
      email: email,
      password: password,
    })
    .then((id) => {
      console.log("sahil");
      console.log(id);
      res.json(id); //is this the response to the fetch api called in the frontend
    })
    .catch((_err) => res.status(400).json("try signing in again"));
};

module.exports = {
  handleSignin: handleSignin,
};
