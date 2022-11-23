const Seagull = require("../models/seagullModel");
const Expertise = require("../models/expertiseModel");
const { Op } = require("sequelize");
const SlugField = require("../helpers/slugfield");

exports.CreateSeagull = async (req, res) => {
  console.log("CreateSeagull");
  const seagullName = String(req.body.seagullName).trim();
  let urlSlug = SlugField(
    req.body.urlSlug != undefined
      ? String(req.body.urlSlug).trim()
      : SlugField(seagullName)
  );
  const isAlive = req.body.isAlive == "" ? 1 : 0;
  let isFavorite;
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
  let imageUrl = "";
  try {
    if (typeof req.file.filename != undefined) {
      imageUrl = req.file.filename;
    }
  } catch (er) {
    console.error(er.message);
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
  console.log("UpdateSeagull");
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
    console.log(er.message);
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
  console.log("GetSeagullsAdmin");
  const seagulls = await Seagull.findAll({ include: { model: Expertise } });
  const expertises = await Expertise.findAll();
  res.render("adminViews/adminSeagulls", {
    seagulls,
    expertises,
    seagullName: req.query.seagullName,
    action: req.query.action,
    isAuth: req.session.isAuth,
  });
};
exports.GetDeletedSeagull = async (req, res) => {
  console.log("GetDeletedSeagull");
  const seagullId = req.params.seagullId;
  const seagull = await Seagull.findByPk(seagullId);
  res.render("adminViews/adminSeagullDelete", {
    seagull,
    isAuth: req.session.isAuth,
  });
};
exports.DeleteSeagull = async function (req, res) {
  console.log("DeleteSeagull");
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
  console.log("GetSeagullAdmin");
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
    isAuth: req.session.isAuth,
  });
};
exports.GetAdminPage = async (req, res) => {
  console.log("GetAdminPage");
  res.render("main", { isAuth: req.session.isAuth });
};
