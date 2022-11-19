const express = require("express");
const app = express();
const router = express.Router();
const imageupload = require("../helpers/imageUpload");
const fs = require("fs");

const seagullController = require("../controllers/seagullController");
const expertiseController = require("../controllers/expertiseController");

//GetDeletedSeagull
router.get(
  "/admin/seagull/delete/:seagullId",
  seagullController.GetDeletedSeagull
);
//DeleteSeagull
router.post(
  "/admin/seagull/delete/:seagullId",
  seagullController.DeleteSeagull
);
//GetSeagullAdmin
router.get("/admin/seagull/:seagullId", seagullController.GetSeagullAdmin);
//UpdateSeagull
router.post(
  "/admin/seagull/:seagullId",
  imageupload.upload.single("image"),
  seagullController.UpdateSeagull
);
//GetSeagullsAdmin
router.get("/admin/seagulls", seagullController.GetSeagullsAdmin);

//createSeagull
router.post(
  "/admin/seagulls",
  imageupload.upload.single("image"),
  seagullController.CreateSeagull
);

//ExpertiseDelete
router.post(
  "/admin/expertise/delete/:expertiseId",
  expertiseController.ExpertiseDelete
);
//GetDeletedExpertise
router.get(
  "/admin/expertise/delete/:expertiseId",
  expertiseController.GetDeletedExpertise
);
//GetExpertiseAdmin
router.get(
  "/admin/expertise/:expertiseId",
  expertiseController.GetExpertiseAdmin
);
//UpdateExpertise
router.post(
  "/admin/expertise/:expertiseId",
  expertiseController.UpdateExpertise
);
//createExpertise
router.post("/admin/expertises", expertiseController.createExpertise);

//GetExpertisesAdmin
router.get("/admin/expertises", expertiseController.GetExpertisesAdmin);

//GetAdminPage
router.get("/admin/", seagullController.GetAdminPage);

router.use(app);

module.exports = router;
