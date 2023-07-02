
const express = require("express");
const router = express.Router();

const auth = require("../../services/authorize");

const postsController = require("../../controllers/posts.controller");


router.get("/", postsController.getPosts);

router.get("/:postID", postsController.getPost);

router.post("/", auth, postsController.createPost);

router.patch("/:postID", auth, postsController.updatePost);

router.delete("/:postID", auth, postsController.deletePost);


module.exports = router;
