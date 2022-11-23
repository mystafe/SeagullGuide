const Expertise = require("../models/expertiseModel");

exports.ExpertiseDelete = async function (req, res) {
  console.log("ExpertiseDelete");
  const expertiseId = req.params.expertiseId;
  const expertise = await Expertise.findByPk(expertiseId);
  try {
    await Expertise.destroy({ where: { id: expertiseId } });
    return res.redirect(
      `/admin/expertises?action=delete&expertiseName=${expertise.expertiseName}`
    );
  } catch (er) {
    console.log(er);
  }
  return res.redirect(
    `/admin/expertises?action=is not able to delete&expertiseName=${expertise.expertiseName}`
  );
};
exports.GetDeletedExpertise = async function (req, res) {
  console.log("GetDeletedExpertise");
  const expertiseId = req.params.expertiseId;
  const expertise = await Expertise.findByPk(expertiseId);
  return res.render("adminViews/adminExpertiseDelete", {
    expertise,
    isAuth: req.session.isAuth,
  });
};
exports.GetExpertiseAdmin = async function (req, res) {
  console.log("GetExpertiseAdmin");
  const expertiseId = req.params.expertiseId;
  try {
    const expertise = await Expertise.findByPk(expertiseId);
    res.render("adminViews/adminExpertiseEdit", {
      expertise: expertise,
      page: 0,
      index: 0,
      expertiseId: expertiseId,
      action: req.query.action,
      expertiseName: req.query.expertiseName,
      isAuth: req.session.isAuth,
    });
  } catch (er) {
    console.log(er);
  }
};
exports.UpdateExpertise = async function (req, res) {
  console.log("UpdateExpertise");
  const expertiseId = req.body.id;
  const expertiseName = req.body.expertiseName;
  const expertise = await Expertise.findByPk(expertiseId);
  let iconUrl = expertise.iconUrl;
  try {
    iconUrl = req.file.filename;
  } catch (er) {
    console.log(er);
  }
  await Expertise.update(
    { expertiseName, iconUrl },
    { where: { id: expertiseId } }
  );
  return res.redirect(
    `/admin/expertises?action=update&expertiseName=${expertiseName}`
  );
};
exports.GetExpertisesAdmin = async (req, res) => {
  console.log("GetExpertisesAdmin");
  const expertises = await Expertise.findAll();
  res.render("adminViews/adminExpertises", {
    expertises: expertises,
    expertiseName: req.query.expertiseName,
    action: req.query.action,
    isAuth: req.session.isAuth,
  });
};
exports.createExpertise = async (req, res) => {
  console.log("createExpertise");
  const expertiseName = req.body.name;
  let iconUrl = "";
  try {
    if (req.file.filename) {
      iconUrl = req.file.filename;
      console.log(iconUrl);
    }
  } catch (er) {
    console.log(er);
  }
  try {
    await Expertise.create({
      expertiseName,
      iconUrl,
    });
  } catch (er) {
    console.log(er);
  }
  return res.redirect(
    `/admin/expertises?action=create&expertiseName=${expertiseName}`
  );
};
