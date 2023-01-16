const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  gender: String,
  password: String,
});

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
