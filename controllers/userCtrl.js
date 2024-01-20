const ImageModel = require("../models/image");

const handleView = async (req, res) => {
  try {
    const { userId } = req.body;
    const data = await ImageModel.find({ userId });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { handleView };
