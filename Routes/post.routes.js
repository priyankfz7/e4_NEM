const express = require("express");
const { PostModel } = require("../Models/post.model");

const postRouter = express.Router();

postRouter.post("/create", async (req, res) => {
  try {
    const post = new PostModel(req.body);
    await post.save();
    res.send({ msg: "post has been created" });
  } catch (e) {
    console.log(e);
    res.send({ msg: "Something went Wrong" });
  }
});

module.exports = { postRouter };
