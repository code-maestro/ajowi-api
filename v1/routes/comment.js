
const express = require("express");
const router = express.Router();

const auth = require("../../services/authorize");

const commentController = require("../../controllers/comment.controller");


router.get("/:postID", commentController.getComments);

router.get("/", commentController.getComment);

router.post("/:postID", auth, commentController.createComment);

router.post("/:commentID", auth, commentController.createCommentReply);

router.patch("/", auth, commentController.updateComment);

router.delete("/", auth, commentController.deleteComment);


module.exports = router;
