const Seagull = require("../models/seagullModel");
const Expertise = require("../models/expertiseModel");
const { Op } = require("sequelize");
const { pageLimit } = require("../helpers/config");

exports.GetSeagullsByExpertise = async (req, res) => {
  const expertiseId = req.params.expertiseId;
  const expertises = await Expertise.findAll();
  let { page = 1 } = req.query;
  console.log("page: " + page + " or " + req.query.page);
  const totalSeagulls = await Seagull.count({
    include: {
      model: Expertise,
      where: { id: expertiseId },
    },
  });

  const totalPages = Math.ceil(totalSeagulls / pageLimit);
  if (page > totalPages) {
    console.error("page overloaded");
    page = 1;
  }
  const seagulls = await Seagull.findAll({
    limit: pageLimit,
    offset: (page - 1) * pageLimit,
    include: { model: Expertise, where: { id: expertiseId } },
  });

  return res.render("seagullViews/seagulls", {
    seagulls: seagulls,
    totalSeagulls,
    totalPages,
    currentPage: page,
    expertises,
    expertiseId,
    seagullName: req.query.seagullName,
    action: req.query.action,
    isAuth: req.session.isAuth,
  });
};

exports.GetSeagull = async (req, res) => {
  const urlSlug = String(req.params.slug).toLowerCase().trim();
  const seagull = await Seagull.findOne({
    where: { urlSlug },
    include: { model: Expertise },
  });

  const expertises = seagull.expertises;
  res.render("seagullViews/seagullDetail", {
    seagull,
    expertises,
    isAuth: req.session.isAuth,
  });
};
exports.GetSeagulls = async (req, res) => {
  console.log("getSeagulls");
  let { page = 1 } = req.query;
  let totalSeagulls = await Seagull.count();
  let totalPages = Math.ceil(totalSeagulls / pageLimit);
  if (page > totalPages) {
    console.error("page overloaded");
    page = 1;
  }
  let seagulls;
  if (String(req.url).startsWith("/favorites")) {
    let seagulls = await Seagull.findAndCountAll({
      where: { isFavorite: { [Op.eq]: true } },
      raw: true,
      limit: pageLimit,
      offset: (page - 1) * pageLimit,
    });
    totalSeagulls = seagulls.count;
    totalPages = Math.ceil(totalSeagulls / pageLimit);
    if (page > totalPages) {
      console.error("page overloaded");
      page = 1;
      seagulls = await Seagull.findAndCountAll({
        where: { isFavorite: { [Op.eq]: true } },
        raw: true,
        limit: pageLimit,
        offset: (page - 1) * pageLimit,
      });
    }

    const expertises = await Expertise.findAll();
    return res.render("seagullViews/favoriteSeagulls", {
      seagulls: seagulls.rows,
      totalSeagulls,
      totalPages,
      currentPage: page,
      expertises,
      expertiseId: 0,
      isAuth: req.session.isAuth,
    });
  } else {
    seagulls = await Seagull.findAndCountAll({
      raw: true,
      limit: pageLimit,
      offset: (page - 1) * pageLimit,
    });
  }
  const expertises = await Expertise.findAll();
  res.render("seagullViews/seagulls", {
    seagulls: seagulls.rows,
    totalSeagulls,
    totalPages,
    currentPage: page,
    expertises,
    expertiseId: 0,
    isAuth: req.session.isAuth,
  });
};
exports.GetMainPage = async (req, res) => {
  console.log("GetMainPage");
  console.log(req.session.isAuth);
  try {
  } catch (error) {
    console.log(error);
  }
  res.render("main", { isAuth: req.session.isAuth });
};
