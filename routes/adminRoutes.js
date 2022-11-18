const express = require("express");
const app = express();
const router = express.Router();
const imageupload = require("../helpers/imageUpload");
const fs = require("fs");

const Seagull = require("../models/seagullModel");
const Expertise = require("../models/expertiseModel");
const seagullController = require("../controllers/seagullController");
const expertiseController = require("../controllers/expertiseController");

const seagulls = [
  {
    seagullId: 1,
    seagullName: "test01",
    expertiseId: 1,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Larus_pacificus_Bruny_Island.jpg/640px-Larus_pacificus_Bruny_Island.jpg?1668616711760",
    isAlive: 1,
    isFavorite: 0,
  },
  {
    seagullId: 2,
    seagullName: "test02",
    expertiseId: 2,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/a1/Swallow-tailed-gull.jpg",
    isAlive: 1,
    isFavorite: 1,
  },
];

const expertises = [
  { expertiseId: 1, expertiseName: "test01" },
  { expertiseId: 2, expertiseName: "test02" },
  { expertiseId: 3, expertiseName: "test03" },
];
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
