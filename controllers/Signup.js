const jwt = require("jsonwebtoken");

const handleSignup = async (req, res, db) => {
  const { name, address, email, password } = req.body;

  const generateToken = (id) => {
    const secret = "supers3cr3t";
    const payload = { id: id };
    // console.log(secret);
    // console.log("token created");
    return jwt.sign(payload, secret);
  };

  const userExists = await db("users").where({ email, password }).first();

  if (userExists) {
    console.log("email exists");
    res.json({ message: "user exists" });
  } else {
    db("users")
      .insert({
        name: name,
        address: address,
        email: email,
        password: password,
      })
      .then((id) => {
        const token = generateToken(id);
        console.log(token);
        res.json({ message: "signup successful", id: id, token });
      })
      .catch((_err) => res.status(400).json("try signing up again"));
    console.log("user added");
  }
};

module.exports = {
  handleSignup: handleSignup,
};
