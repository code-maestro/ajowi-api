
const express = require("express");
const router = express.Router();

const auth = require("../../services/authorize");

const activityController = require("../../controllers/activity.controller");


router.get("/", activityController.getActivities);

router.post("/", auth, activityController.createActivity);

router.get("/:activityID", activityController.getActivity);

router.patch("/:activityID", auth, activityController.updateActivity);

router.delete("/:activityID", auth, activityController.deleteActivity);


module.exports = router;
