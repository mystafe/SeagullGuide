const express = require("express");
const app = express();
const router = express.Router();
const seagullController = require("../controllers/seagullController");
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

//GetFavoriteSeagulls
router.get("/favorites", seagullController.GetSeagulls);
//GetSeagull
router.get("/seagull/:seagullId", seagullController.GetSeagull);
//GetSeagulls
router.get("/seagulls", seagullController.GetSeagulls);
//GetMainPage
router.get("/", seagullController.GetMainPage);

router.use(app);

module.exports = router;
