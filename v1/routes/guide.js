
const express = require("express");
const router = express.Router();

const auth = require("../../services/authorize");

const guideController = require("../../controllers/guide.controller");


router.get("/", guideController.getGuides);

router.get("/:guideID", guideController.getGuide);

router.post("/", guideController.createGuide);

router.patch("/:guideID", auth, guideController.updateGuide);

router.delete("/:guideID", auth, guideController.deleteGuide);


module.exports = router;
