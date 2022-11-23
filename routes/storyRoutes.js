const express = require("express");
const app = express();
const router = express.Router();

const seagullController = require("../controllers/seagullController");
const expertiseController = require("../controllers/expertiseController");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const storyController = require("../controllers/storyController");

router.get("/stories", storyController.GetStoriesAll);
router.get("/featured", storyController.GetStoriesMainpage);
router.get("/story/:id", storyController.GetStoryDetail);

router.use(app);
module.exports = router;
