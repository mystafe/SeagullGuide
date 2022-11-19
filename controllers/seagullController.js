const Seagull = require("../models/seagullModel");
const Expertise = require("../models/expertiseModel");
exports.CreateSeagull = async (req, res) => {
  const seagullName = req.body.seagullName;
  const isAlive = req.body.isAlive == "" ? 1 : 0;
  const isFavorite = req.body.isFavorite == "" ? 1 : 0;
  let image = "";
  try {
    if (req.file.filename) {
      image = req.file.filename;
    }
  } catch (er) {
    console.log(er);
  }
  await Seagull.create({
    seagullName: seagullName,
    imageUrl: image,
    isAlive: isAlive,
    isFavorite: isFavorite,
  });
  return res.redirect(
    `/admin/seagulls?action=create&seagullName=${seagullName}`
  );
};
exports.UpdateSeagull = async (req, res) => {
  const seagullId = req.params.seagullId;
  const seagullName = req.body.seagullName;
  const isAlive = req.body.isAlive == "" ? true : false;
  const expertiseId = req.body.expertiseId;
  const isFavorite = req.body.isFavorite == "" ? true : false;
  const seagull = Seagull.findByPk(seagullId);
  let image = seagull.imageUrl;
  try {
    image = req.file.filename;
  } catch (er) {
    console.log(er);
  }
  await Seagull.update(
    {
      seagullName,
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
  const seagulls = await Seagull.findAll();
  // const expertises = await seagulls.getExpertises();
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
  const seagulls = await expertise.getSeagulls({ where: { expertiseId } });

  //const seagulls = await Seagull.findAll({
  //where: { expertiseId },
  //});

  res.render("seagullViews/seagulls", {
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
  const seagull = await Seagull.findByPk(seagullId);
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
  const seagullId = req.params.seagullId;
  const seagull = await Seagull.findByPk(seagullId);
  const expertises = await Expertise.findAll();
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
