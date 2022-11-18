const express = require("express");
const app = express();
const router = express.Router();

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
  {
    seagullId: 3,
    seagullName: "test03",
    expertiseId: 3,
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

router.get("/expertise/:expertiseId", async (req, res) => {
  const expertiseId = req.params.expertiseId;
  const expertise = expertises[expertiseId - 1];
  console.log(expertiseId);
  const filteredSeagull = seagulls.filter(
    (s) => s.expertiseId == expertise.expertiseId
  );

  console.log(filteredSeagull);
  res.render("seagullViews/seagulls", {
    seagulls: filteredSeagull,
    expertiseId,
    expertise,
    expertises,
  });
});

router.use(app);

module.exports = router;
