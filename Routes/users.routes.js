const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../Models/user.model");
const userRouter = express.Router();

userRouter.post("/register", (req, res) => {
  const data = req.body;
  bcrypt.hash(data.password, 10, async (err, hash) => {
    if (err) {
      console.log(err);
      res.send({ msg: "Something went wrong" });
    } else {
      const user = new UserModel({ ...data, password: hash });
      try {
        await user.save();
        res.send({
          msg: "Registration successfull",
        });
      } catch (err) {
        console.log(err);
        res.send({ msg: "Something went wrong" });
      }
    }
  });
});

module.exports = { userRouter };
