const express = require("express");

const Seagull = require("../models/seagullModel");
const Expertise = require("../models/expertiseModel");

module.exports.CreateSeagull = async (req, res) => {
  //    console.log(req.body.imageUrl);
  const seagullName = req.body.seagullName;
  const imageUrl = req.file.filename;
  const isAlive = req.body.isAlive == "" ? 1 : 0;
  const isFavorite = req.body.isFavorite == "" ? 1 : 0;
  let image = "";
  console.log(image);
  console.log(req.file.filename);

  if (req.file.filename) {
    image = req.file.filename;
  }
  await Seagull.create({
    seagullName: seagullName,
    imageUrl: imageUrl,
    isAlive: isAlive,
    isFavorite: isFavorite,
  });
  return res.redirect(
    `/admin/seagulls?action=create&seagullName=${seagullName}`
  );
};

module.exports.UpdateSeagull = async (req, res) => {
  const seagullId = req.params.seagullId;
  const seagullName = req.body.seagullName;
  const isAlive = req.body.isAlive == "" ? 1 : 0;
  const isFavorite = req.body.isFavorite == "" ? 1 : 0;

  await Seagull.update(
    {
      seagullName: seagullName,
      isAlive: isAlive,
      isFavorite: isFavorite,
    },
    {
      where: { seagullId: seagullId },
    }
  );

  return res.redirect(
    `/admin/seagulls?action=update&seagullName=${seagullName}`
  );
};

module.exports.GetSeagullsAdmin = async (req, res) => {
  const seagulls = await Seagull.findAll();
  res.render("adminViews/adminSeagulls", {
    seagulls: seagulls,
    seagullName: req.query.seagullName,
    action: req.query.action,
  });
};

module.exports.GetDeletedSeagull = async (req, res) => {
  const seagullId = req.params.seagullId;
  const seagull = await Seagull.findByPk(seagullId);
  res.render("adminViews/adminSeagullDelete", {
    seagull: seagull,
  });
};

module.exports.DeleteSeagull = async function (req, res) {
  const seagullId = req.params.seagullId;
  const index = 0;
  const page = 0;
  await Seagull.destroy({
    where: {
      seagullId: seagullId,
    },
  });
  res.redirect(
    `/admin/seagulls?action=delete&seagullName=${seagulls[0].seagullName}`
  );
};

module.exports.GetSeagullAdmin = async (req, res) => {
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

module.exports.GetAdminPage = async (req, res) => {
  res.render("main");
};

module.exports.GetSeagull = async (req, res) => {
  const seagullId = req.params.seagullId;
  const seagull = await Seagull.findByPk(seagullId);
  const expertises = await Expertise.findAll();
  res.render("seagullViews/seagullDetail", { seagull, expertises });
};

module.exports.GetSeagulls = async (req, res) => {
  console.log("-------------------");
  console.log(req.url);
  let seagulls;
  if (req.url == "/favorites") {
    seagulls = await Seagull.findAll({ where: { isFavorite: true } });
  } else {
    seagulls = await Seagull.findAll();
  }
  const expertises = await Expertise.findAll();

  res.render("seagullViews/favoriteSeagulls", {
    seagulls,
    expertises,
    expertiseId: 0,
  });
};
module.exports.GetMainPage = async (req, res) => {
  res.render("main");
};
