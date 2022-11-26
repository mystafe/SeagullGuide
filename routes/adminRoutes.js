const express = require("express");
const app = express();
const router = express.Router();
const imageupload = require("../helpers/imageUpload");
const fs = require("fs");
const isAdmin = require("../middlewares/isAdmin");

const adminController = require("../controllers/adminController");
const expertiseController = require("../controllers/expertiseController");
const userController = require("../controllers/userController");
const storyController = require("../controllers/storyController");

//DeleteSeagull
router.post(
  "/seagull/delete/:seagullId",
  isAdmin,
  adminController.DeleteSeagull
);
router.get(
  "/seagull/delete/:seagullId",
  isAdmin,
  adminController.GetDeletedSeagull
);

//EditSeagull;
router.get("/seagull/:seagullId", isAdmin, adminController.GetSeagullAdmin);

//UpdateSeagull
router.post(
  "/seagull/:seagullId",
  imageupload.upload.single("image"),
  adminController.UpdateSeagull
);
//GetSeagullsAdmin
router.get("/seagulls", isAdmin, adminController.GetSeagullsAdmin);
//createSeagull
router.post(
  "/seagulls",
  isAdmin,
  imageupload.upload.single("image"),
  adminController.CreateSeagull
);

//createExpertise
router.post(
  "/expertises",
  isAdmin,
  imageupload.upload.single("image"),
  expertiseController.createExpertise
);
//ExpertiseDelete
router.post(
  "/expertise/delete/:expertiseId",
  isAdmin,
  expertiseController.ExpertiseDelete
);
//GetDeletedExpertise
router.get(
  "/expertise/delete/:expertiseId",
  isAdmin,
  expertiseController.GetDeletedExpertise
);
//GetExpertiseAdmin
router.get(
  "/expertise/:expertiseId",
  isAdmin,
  expertiseController.GetExpertiseAdmin
);
//UpdateExpertise
router.post(
  "/expertise/:expertiseId",
  isAdmin,
  imageupload.upload.single("iconUrl"),
  expertiseController.UpdateExpertise
);
//GetExpertisesAdmin
router.get("/expertises", isAdmin, expertiseController.GetExpertisesAdmin);

//user Delete
router.post("/user/delete/:id", isAdmin, userController.DeleteUserPost);
router.get("/user/delete/:id", isAdmin, userController.DeleteUserGet);
//Create User
router.post("/users/create", isAdmin, userController.CreateUserPost);
router.get("/users/create", isAdmin, userController.CreateUserGet);
//Edit User
router.post("/user/edit/:id", isAdmin, userController.EditUserPost);
router.get("/user/edit/:id", isAdmin, userController.EditUserGet);
//Verify User
router.get("/user/validate/:id", isAdmin, userController.VerifyUser);

//usersAdminList
router.get("/users", isAdmin, userController.GetUsers);

//createStory
router.post("/stories/create", isAdmin, storyController.CreateStoryPost);
router.get("/stories/create", isAdmin, storyController.CreateStoryGet);
//deleteStory
router.post("/story/delete/:id", isAdmin, storyController.DeleteStoryPost);
router.get("/story/delete/:id", isAdmin, storyController.DeleteStoryGet);
//editStory
router.post("/story/edit/:id", isAdmin, storyController.EditStoryPost);

router.get("/story/edit/:id", isAdmin, storyController.EditStoryGet);
//storyAdminList
router.get("/stories", storyController.GetStoriesAdmin);

//GetAdminPage
router.get("/", isAdmin, adminController.GetAdminPage);

router.use(app);
module.exports = router;
