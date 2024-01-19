const User = require("../models/user");
const ImageModel = require("../models/image");

const getUsers = async (req, res) => {
  try {
    const user = await ImageModel.find({ role: "user" });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

const updateStatus = async (req, res) => {
  const { userId, status } = req.body;
  try {
    const user = await ImageModel.findOneAndUpdate(
      { userId },
      { confirmed: status },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getUsers ,updateStatus};
