const express = require("express");
const { connection } = require("./Config/db");
const { postRouter } = require("./Routes/post.routes");

const { userRouter } = require("./Routes/users.routes");

const app = express();
app.use(express.json());
app.use("/users", userRouter);
app.use("/posts", postRouter);

app.get("/", (req, res) => {
  res.send("Social Media API");
});

app.listen(8080, async () => {
  try {
    connection;
    console.log("connected to db");
  } catch (e) {
    console.log(e);
  }
  console.log("Server is running at http://localhost:8080");
});
