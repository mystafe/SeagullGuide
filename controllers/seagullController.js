const Seagull = require("../models/seagullModel");
const Expertise = require("../models/expertiseModel");
const { pageLimit } = require("../helpers/config");

exports.getSeagullsByExpertise = async (req, res) => {
  const expertiseId = req.params.expertiseId;
  const expertises = await Expertise.find();
  let { page = 1 } = req.query;
  console.log("page: " + page + " or " + req.query.page);

  const totalSeagulls = await Seagull.countDocuments({
    expertises: expertiseId,
  });

  const totalPages = Math.ceil(totalSeagulls / pageLimit);
  if (page > totalPages) {
    console.error("page overloaded");
    page = 1;
  }

  const seagulls = await Seagull.find({
    expertises: expertiseId,
  })
    .limit(pageLimit)
    .skip((page - 1) * pageLimit)
    .populate("expertises");

  return res.render("seagullViews/seagulls", {
    seagulls: seagulls,
    totalSeagulls,
    totalPages,
    currentPage: page,
    expertises,
    expertiseId,
    seagullName: req.query.seagullName,
    action: req.query.action,
    // csrfToken: req.csrfToken(),
    csrfToken: "req.csrfToken()",
  });
};

exports.getSeagull = async (req, res) => {
  const urlSlug = String(req.params.slug).toLowerCase().trim();
  const seagull = await Seagull.findOne({
    urlSlug: urlSlug,
  }).populate("expertises");

  const expertises = seagull.expertises;
  res.render("seagullViews/seagullDetail", {
    seagull,
    expertises,
    // csrfToken: req.csrfToken(),
    csrfToken: "req.csrfToken()",
  });
};

exports.getSeagulls = async (req, res) => {
  console.log("getSeagulls");
  let { page = 1 } = req.query;

  const totalSeagulls = await Seagull.countDocuments();

  const totalPages = Math.ceil(totalSeagulls / pageLimit);
  if (page > totalPages) {
    console.error("page overloaded");
    page = 1;
  }

  let seagulls;
  if (String(req.url).startsWith("/favorites")) {
    seagulls = await Seagull.find({
      isFavorite: true,
    })
      .limit(pageLimit)
      .skip((page - 1) * pageLimit)
      .populate("expertises");
  } else {
    seagulls = await Seagull.find()
      .limit(pageLimit)
      .skip((page - 1) * pageLimit)
      .populate("expertises");
  }

  const expertises = await Expertise.find();
  res.render("seagullViews/seagulls", {
    seagulls: seagulls,
    totalSeagulls,
    totalPages,
    currentPage: page,
    expertises,
    expertiseId: 0,
  });
};

exports.getMainPage = async (req, res) => {
  console.log("GetMainPage");
  const randomNames = [
    "Bora",
    "Cemil",
    "Cesur",
    "Cici",
    "Melek",
    "Nazli",
    "Nemo",
    "Tatlis",
    "Umut",
  ];
  const randomNumber = Math.floor(Math.random() * randomNames.length);

  // Handle any necessary logic here.

  return res.render("main", {
    randomSeagull: randomNames[randomNumber],
    // csrfToken: req.csrfToken(),
    csrfToken: "req.csrfToken()",
  });
};
