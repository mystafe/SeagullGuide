const express = require("express");
const router = express.Router();
const seagullController = require("../controllers/seagullController");

// GetFavoriteSeagulls
router.get("/favorites", seagullController.getSeagulls);
// GetSeagull
router.get("/seagull/:slug", seagullController.getSeagull);
// GetSeagulls
router.get("/seagulls", seagullController.getSeagulls);
// GetSeagullsByExpertise
router.get("/expertise/:expertiseId", seagullController.getSeagullsByExpertise);
// GetMainPage
router.get("/", seagullController.getMainPage);

module.exports = router;
