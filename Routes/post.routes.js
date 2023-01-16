const express = require("express");
const { PostModel } = require("../Models/post.model");

const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
  const userID = req.body.userID;
  try {
    const posts = await PostModel.find({ userID, ...req.query });
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went Wrong" });
  }
});

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
