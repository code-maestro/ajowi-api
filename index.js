const express = require("express");

const loginRouter = require("./v1/routes/auth");
const usersRouter = require("./v1/routes/users");
const activityRouter = require("./v1/routes/activity");
const guidesRouter = require("./v1/routes/guide");
const postsRouter = require("./v1/routes/posts");
const commentsRouter = require("./v1/routes/comment");


const app = express();

app.use(express.json())

// AUTHENTICATION
app.use("/api/v1/auth", loginRouter);

// HOME
app.use("/api/v1/user", usersRouter);
app.use("/api/v1/activity", activityRouter);
app.use("/api/v1/posts", postsRouter);
app.use("/api/v1/guides", guidesRouter);
app.use("/api/v1/comments", commentsRouter);

const PORT = process.env.PORT || 3000;

app.server = app.listen(PORT, () => {
  console.log(`API IS RUNNING ON ${PORT}...`);
});
