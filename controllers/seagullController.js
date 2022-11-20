const Seagull = require("../models/seagullModel");
const Expertise = require("../models/expertiseModel");
const { Op } = require("sequelize");
const SlugField = require("../helpers/slugfield");
exports.CreateSeagull = async (req, res) => {
  const seagullName = String(req.body.seagullName).trim();
  console.log(seagullName);
  let urlSlug = SlugField(
    req.body.urlSlug != undefined
      ? String(req.body.urlSlug).trim()
      : SlugField(seagullName)
  );

  const isAlive = req.body.isAlive == "" ? 1 : 0;
  let isFavorite;
  let imageUrl = "";
  if (req.body.likeStatus) {
    isFavorite = req.body.isFavorite;
    id = req.body.seagullId;
    const likeAction = isFavorite == 1 ? "like" : "unlike";

    await Seagull.update(
      {
        isFavorite: isFavorite,
      },
      {
        where: { id },
      }
    );
    return res.redirect(
      `/admin/seagulls?action=${likeAction}&seagullName=${seagullName}`
    );
  }

  if (req.body.isFavorite) {
    isFavorite = req.body.isFavorite == "" ? 1 : req.body.isFavorite;
  } else isFavorite = 0;

  try {
    if (req.file.filename) {
      imageUrl = req.file.filename;
    }
  } catch (er) {
    console.log(er);
  }
  const expertiseIds = req.body.expertiseIds;

  const seagull = await Seagull.create({
    seagullName,
    urlSlug,
    imageUrl,
    isAlive,
    isFavorite,
  });

  if (expertiseIds != undefined) {
    try {
      await seagull.addExpertises(expertiseIds);
    } catch (er) {
      console.log(er);
    }
  }

  return res.redirect(
    `/admin/seagulls?action=create&seagullName=${seagullName}`
  );
};
exports.UpdateSeagull = async (req, res) => {
  const expertiseIds = req.body.expertiseIds;
  const seagullId = req.body.seagullId;
  const seagullName = req.body.seagullName;
  const urlSlug = SlugField(
    req.body.urlSlug != undefined
      ? String(req.body.urlSlug).trim()
      : SlugField(seagullName)
  );
  const isAlive = req.body.isAlive == "" ? true : false;
  const expertiseId = req.body.expertiseId;
  const isFavorite = req.body.isFavorite == "" ? true : false;
  const seagull = await Seagull.findByPk(seagullId, {
    include: { model: Expertise },
  });

  try {
    if (expertiseIds == undefined) {
      await seagull.removeExpertises(seagull.expertises);
    } else {
      await seagull.removeExpertises(seagull.expertises);
      const selectedExpertises = await Expertise.findAll({
        where: {
          id: {
            [Op.in]: expertiseIds,
          },
        },
      });

      await seagull.addExpertises(selectedExpertises);
      await seagull.save();
    }
  } catch (er) {
    console.log(er);
  }

  let image = seagull.imageUrl;

  try {
    image = req.file.filename;
  } catch (er) {
    console.log(er);
  }

  await Seagull.update(
    {
      seagullName,
      urlSlug,
      isAlive,
      isFavorite,
      expertiseId,
      imageUrl: image,
    },
    {
      where: { id: seagullId },
    }
  );

  return res.redirect(
    `/admin/seagulls?action=update&seagullName=${seagullName}`
  );
};
exports.GetSeagullsAdmin = async (req, res) => {
  const seagulls = await Seagull.findAll({ include: { model: Expertise } });
  const expertises = await Expertise.findAll();
  res.render("adminViews/adminSeagulls", {
    seagulls,
    expertises,
    seagullName: req.query.seagullName,
    action: req.query.action,
  });
};
exports.GetSeagullsByExpertise = async (req, res) => {
  const expertiseId = req.params.expertiseId;
  const expertises = await Expertise.findAll();
  const expertise = await Expertise.findByPk(expertiseId);

  try {
    const seagulls = await Seagull.findAll({
      include: { model: Expertise, where: { id: expertiseId } },
    });
    return res.render("seagullViews/seagulls", {
      seagulls,
      expertises,
      expertiseId,
      seagullName: req.query.seagullName,
      action: req.query.action,
    });
  } catch (er) {
    console.log(er);
  }

  const seagulls = await Seagull.findAll();

  return res.render("seagullViews/seagulls", {
    seagulls,
    expertises,
    expertiseId,
    seagullName: req.query.seagullName,
    action: req.query.action,
  });
};
exports.GetDeletedSeagull = async (req, res) => {
  const seagullId = req.params.seagullId;
  const seagull = await Seagull.findByPk(seagullId);
  res.render("adminViews/adminSeagullDelete", {
    seagull: seagull,
  });
};
exports.DeleteSeagull = async function (req, res) {
  const seagullId = req.params.seagullId;
  const seagull = await Seagull.findByPk(seagullId);
  await Seagull.destroy({
    where: {
      id: seagullId,
    },
  });
  res.redirect(
    `/admin/seagulls?action=delete&seagullName=${seagull.seagullName}`
  );
};
exports.GetSeagullAdmin = async (req, res) => {
  const seagullId = req.params.seagullId;
  const seagull = await Seagull.findByPk(seagullId, {
    include: { model: Expertise },
  });
  const seagulls = await Seagull.findAll();
  const expertises = await Expertise.findAll();

  res.render("adminViews/adminSeagullEdit", {
    seagulls: seagulls,
    seagull: seagull,
    expertises: expertises,
    seagullName: req.query.seagullName,
    action: req.query.action,
  });
};
exports.GetAdminPage = async (req, res) => {
  res.render("main");
};
exports.GetSeagull = async (req, res) => {
  console.log("----------------------");

  const urlSlug = String(req.params.slug).toLowerCase().trim();

  console.log(urlSlug);

  const seagullId = req.params.seagullId;
  const seagull = await Seagull.findOne({
    where: { urlSlug },

    include: { model: Expertise },
  });

  console.log(seagull.expertises);

  console.log("-----_______________-----------------");

  const expertises = seagull.expertises;
  res.render("seagullViews/seagullDetail", { seagull, expertises });
};
exports.GetSeagulls = async (req, res) => {
  let seagulls;
  if (req.url == "/favorites") {
    seagulls = await Seagull.findAll({ where: { isFavorite: true } });
    const expertises = await Expertise.findAll();
    return res.render("seagullViews/favoriteSeagulls", {
      seagulls,
      expertises,
      expertiseId: 0,
    });
  } else {
    seagulls = await Seagull.findAll();
  }
  const expertises = await Expertise.findAll();
  res.render("seagullViews/seagulls", {
    seagulls,
    expertises,
    expertiseId: 0,
  });
};
exports.GetMainPage = async (req, res) => {
  res.render("main");
};
