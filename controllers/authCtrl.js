const User = require("../models/user");

const signup = async (req, res) => {
  try {
    const { userId, password, role } = req.body;
    const user = await User.create({ userId, password, role });
    const token = user.createJWT();

    res.status(201).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(400).send("An error occured");
  }
};

const login = async (req, res) => {
  const { userId, password } = req.body;
  const user = await User.findOne({ userId });
  if (!user) {
    return res.status(400).send("User not found");
  }
  const isMatch = await user.comparePassword(password);

  const token = user.createJWT();

  if (!isMatch) {
    return res.status(400).send("Wrong credentials");
  }
  res.status(201).json({ user, token });
};

module.exports = {
  signup,
  login,
};
