const express = require("express");
const app = express();
const router = express.Router();
const seagullController = require("../controllers/seagullController");

//GetFavoriteSeagulls
router.get("/favorites", seagullController.GetSeagulls);
//GetSeagull
router.get("/seagull/:seagullId", seagullController.GetSeagull);
//GetSeagulls
router.get("/seagulls", seagullController.GetSeagulls);
//GetSeagullsByExpertise
router.get("/expertise/:expertiseId", seagullController.GetSeagullsByExpertise);
//GetMainPage
router.get("/", seagullController.GetMainPage);

router.use(app);

module.exports = router;
