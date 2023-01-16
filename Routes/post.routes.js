const e = require("express");
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

postRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { userID } = req.body;
  try {
    const post = await PostModel.findById(id);
    if (post.userID == userID) {
      await PostModel.findByIdAndDelete(id);
      res.send({ msg: "User has baan deleted" });
    } else {
      res.status(401);
      res.send({ msg: "User not matched" });
    }
  } catch (err) {
    console.log(e);
    res.send({ msg: "Something went Wrong" });
  }
});

postRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { userID } = req.body;
  const data = req.body;
  try {
    const post = await PostModel.findById(id);
    if (post.userID == userID) {
      await PostModel.findByIdAndUpdate(id, { ...data });
      res.send({ msg: "User has baan updated" });
    } else {
      res.status(401);
      res.send({ msg: "User not matched" });
    }
  } catch (err) {
    console.log(e);
    res.send({ msg: "Something went Wrong" });
  }
});

module.exports = { postRouter };
