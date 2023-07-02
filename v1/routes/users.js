const express = require("express");
const router = express.Router();

const auth = require("../../services/authorize");

const userController = require("../../controllers/user.controller");


router.get("/", auth, userController.getUsers);

router.post("/", userController.createUser);

router.get("/:userID", userController.getUser);

router.patch("/:userID", userController.updateUser);

router.delete("/:userID", userController.deleteUser);

module.exports = router;

