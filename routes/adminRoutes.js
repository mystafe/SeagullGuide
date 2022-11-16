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
];

const expertises = [
  { expertiseId: 1, expertiseName: "test01" },
  { expertiseId: 2, expertiseName: "test02" },
  { expertiseId: 3, expertiseName: "test03" },
];

router.get("/admin/seagull/delete/:seagullId", async (req, res) => {
  const seagullId = req.params.seagullId;
  res.render("adminViews/adminSeagullDelete", {
    seagull: seagulls[seagullId],
  });
});

router.post("/admin/seagull/delete/:seagullId", async function (req, res) {
  const seagullId = req.params.seagullId;
  const index = 0;
  const page = 0;
  res.redirect(
    `/admin/seagulls?action=delete&seagullName=${seagulls[0].seagullName}`
  );
});

router.get("/admin/seagulls", async (req, res) => {
  res.render("adminViews/adminSeagulls", {
    seagulls: seagulls,
    seagullName: req.query.seagullName,
    action: req.query.action,
  });
});

//expertiseDelete
router.post("/admin/expertise/delete/:expertiseId", async function (req, res) {
  const expertiseId = req.params.expertiseId;
  const index = 0;
  const page = 0;
  return res.redirect(
    `/admin/expertises?action=delete&expertiseName=${expertises[0].expertiseName}`
  );
});
router.get("/admin/expertise/delete/:expertiseId", async function (req, res) {
  const expertiseId = req.params.expertiseId;
  return res.render("adminViews/adminExpertiseDelete", {
    expertise: expertises[0],
  });
});

//admin Expertise edit
router.get("/admin/expertise/:expertiseId", async function (req, res) {
  const expertiseId = req.params.expertiseId;
  try {
    const expertise = expertises[expertiseId];

    res.render("adminViews/adminExpertiseEdit", {
      expertise: expertises[expertiseId],
      page: 0,
      index: 0,
      expertiseId: expertiseId,
      action: req.query.action,
      action: req.query.expertiseName,
    });
  } catch (er) {
    console.log(er);
  }
});

router.post("/admin/expertise/:expertiseId", async function (req, res) {
  //const seagullId = req.params.seagullId;
  console.log("hiiii");
  const expertiseId = req.params.expertiseId;
  console.log(expertiseId);
  const name = req.body.name;

  return res.redirect(`/admin/expertises?action=update&expertiseName=${name}`);
});

//admin Expertise list
router.get("/admin/expertises", async (req, res) => {
  res.render("adminViews/adminExpertises", {
    expertises: expertises,
    expertiseName: req.query.expertiseName,
    action: req.query.action,
  });
});

router.use(app);

module.exports = router;
