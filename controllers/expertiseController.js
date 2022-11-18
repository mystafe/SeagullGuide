const express = require("express");

const Seagull = require("../models/seagullModel");
const Expertise = require("../models/expertiseModel");

module.exports.ExpertiseDelete = async function (req, res) {
  const expertiseId = req.params.expertiseId;
  const index = 0;
  const page = 0;
  const expertise = await Expertise.findByPk(expertiseId);
  await Expertise.destroy({ where: { expertiseId: expertiseId } });
  return res.redirect(
    `/admin/expertises?action=delete&expertiseName=${expertise.expertiseName}`
  );
};
module.exports.GetDeletedExpertise = async function (req, res) {
  const expertiseId = req.params.expertiseId;
  const expertise = await Expertise.findByPk(expertiseId);
  return res.render("adminViews/adminExpertiseDelete", {
    expertise: expertise,
  });
};
module.exports.GetExpertiseAdmin = async function (req, res) {
  const expertiseId = req.params.expertiseId;
  try {
    const expertise = await Expertise.findByPk(expertiseId);

    res.render("adminViews/adminExpertiseEdit", {
      expertise: expertise,
      page: 0,
      index: 0,
      expertiseId: expertiseId,
      action: req.query.action,
      action: req.query.expertiseName,
    });
  } catch (er) {
    console.log(er);
  }
};
module.exports.UpdateExpertise = async function (req, res) {
  //const seagullId = req.params.seagullId;
  const expertiseId = req.params.expertiseId;
  const name = req.body.name;
  await Expertise.update(
    { expertiseName: name },
    { where: { expertiseId: expertiseId } }
  );

  return res.redirect(`/admin/expertises?action=update&expertiseName=${name}`);
};
module.exports.GetExpertisesAdmin = async (req, res) => {
  const expertises = await Expertise.findAll();
  res.render("adminViews/adminExpertises", {
    expertises: expertises,
    expertiseName: req.query.expertiseName,
    action: req.query.action,
  });
};

module.exports.createExpertise = async (req, res) => {
  const expertiseName = req.body.name;
  await Expertise.create({ expertiseName: expertiseName });
  return res.redirect(
    `/admin/expertises?action=create&expertiseName=${expertiseName}`
  );
};
