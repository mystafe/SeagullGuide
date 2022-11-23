const express = require("express");
const app = express();
const router = express.Router();
const imageupload = require("../helpers/imageUpload");
const fs = require("fs");

const adminController = require("../controllers/adminController");
const expertiseController = require("../controllers/expertiseController");
const userController = require("../controllers/userController");
const storyController = require("../controllers/storyController");

//DeleteSeagull
router.post("/seagull/delete/:seagullId", adminController.DeleteSeagull);
router.get("/seagull/delete/:seagullId", adminController.GetDeletedSeagull);

//EditSeagull;
router.get("/seagull/:seagullId", adminController.GetSeagullAdmin);

//UpdateSeagull
router.post(
  "/seagull/:seagullId",
  imageupload.upload.single("image"),
  adminController.UpdateSeagull
);
//GetSeagullsAdmin
router.get("/seagulls", adminController.GetSeagullsAdmin);
//createSeagull
router.post(
  "/seagulls",
  imageupload.upload.single("image"),
  adminController.CreateSeagull
);

//_____________________________________________//

//createExpertise
router.post(
  "/expertises",
  imageupload.upload.single("image"),
  expertiseController.createExpertise
);
//ExpertiseDelete
router.post(
  "/expertise/delete/:expertiseId",
  expertiseController.ExpertiseDelete
);
//GetDeletedExpertise
router.get(
  "/expertise/delete/:expertiseId",
  expertiseController.GetDeletedExpertise
);
//GetExpertiseAdmin
router.get("/expertise/:expertiseId", expertiseController.GetExpertiseAdmin);
//UpdateExpertise
router.post(
  "/expertise/:expertiseId",
  imageupload.upload.single("iconUrl"),
  expertiseController.UpdateExpertise
);
//GetExpertisesAdmin
router.get("/expertises", expertiseController.GetExpertisesAdmin);

//_____________________________________________//

//user Delete
router.post("/user/delete/:id", userController.DeleteUserPost);
router.get("/user/delete/:id", userController.DeleteUserGet);
//Create User
router.post("/users/create", userController.CreateUserPost);
router.get("/users/create", userController.CreateUserGet);
//Edit User
router.post("/user/edit/:id", userController.EditUserPost);
router.get("/user/edit/:id", userController.EditUserGet);
//usersAdminList
router.get("/users", userController.GetUsers);
//_____________________________________________//

//createStory
router.post("/stories/create", storyController.CreateStoryPost);
router.get("/stories/create", storyController.CreateStoryGet);
//deleteStory
router.post("/story/delete/:id", storyController.DeleteStoryPost);
router.get("/story/delete/:id", storyController.DeleteStoryGet);
//editStory
router.post("/story/edit/:id", storyController.EditStoryPost);

router.get("/story/edit/:id", storyController.EditStoryGet);
//storyAdminList
router.get("/stories", storyController.GetStoriesAdmin);

//_____________________________________________//

//GetAdminPage
router.get("/", adminController.GetAdminPage);

router.use(app);
module.exports = router;
