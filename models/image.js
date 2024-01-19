const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  path: {
    type: String,
  },
  userId: {
    type: String,
    required: true,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  role:{
    type: String,
    enum: ["admin", "user"],
    required: true,
    default: "user",
  }
});

module.exports = mongoose.model("Image", ImageSchema);
