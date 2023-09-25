const Seagull = require("../models/seagullModel");
const Expertise = require("../models/expertiseModel");
const mongoose = require("mongoose");
const slugify = require("slugify");

exports.createSeagull = async (req, res) => {
  console.log("CreateSeagull");
  const seagullName = String(req.body.seagullName).trim();
  let urlSlug = req.body.urlSlug
    ? String(req.body.urlSlug).trim()
    : slugify(seagullName);
  const isAlive = req.body.isAlive === "" ? true : false;
  let isFavorite;
  if (req.body.likeStatus) {
    isFavorite = req.body.isFavorite;
    id = req.body.seagullId;
    const likeAction = isFavorite == 1 ? "like" : "unlike";

    await Seagull.updateOne(
      { _id: mongoose.Types.ObjectId(id) },
      { isFavorite: isFavorite }
    );
    return res.redirect(
      `/admin/seagulls?action=${likeAction}&seagullName=${seagullName}`
    );
  }
  if (req.body.isFavorite) {
    isFavorite = req.body.isFavorite === "" ? true : false;
  } else {
    isFavorite = false;
  }
  let imageUrl = "";
  try {
    if (req.file.filename) {
      imageUrl = req.file.filename;
    }
  } catch (er) {
    console.error(er.message);
  }
  const expertiseIds = req.body.expertiseIds;
  const seagull = new Seagull({
    seagullName,
    urlSlug,
    imageUrl,
    isAlive,
    isFavorite,
  });

  if (expertiseIds) {
    try {
      seagull.expertises = expertiseIds; // Assuming 'expertises' is an array field in the Seagull model
      await seagull.save();
    } catch (er) {
      console.log(er);
    }
  }

  return res.redirect(
    `/admin/seagulls?action=create&seagullName=${seagullName}`
  );
};

exports.updateSeagull = async (req, res) => {
  console.log("UpdateSeagull");
  const expertiseIds = req.body.expertiseIds;
  const seagullId = req.body.seagullId;
  const seagullName = req.body.seagullName;
  const urlSlug = req.body.urlSlug
    ? String(req.body.urlSlug).trim()
    : slugify(seagullName);
  const isAlive = req.body.isAlive === "" ? true : false;
  const expertiseId = req.body.expertiseId;
  const isFavorite = req.body.isFavorite === "" ? true : false;

  try {
    let seagull = await Seagull.findById(seagullId).populate("expertises");
    
    if (expertiseIds === undefined) {
      seagull.expertises = [];
    } else {
      const selectedExpertises = await Expertise.find({
        _id: { $in: expertiseIds.map(id => mongoose.Types.ObjectId(id)) }
      });
      seagull.expertises = selectedExpertises;
    }

    let image = seagull.imageUrl;

    try {
      image = req.file.filename;
    } catch (er) {
      console.log(er.message);
    }

    seagull.seagullName = seagullName;
    seagull.urlSlug = urlSlug;
    seagull.isAlive = isAlive;
    seagull.isFavorite = isFavorite;
    seagull.expertiseId = expertiseId;
    seagull.imageUrl = image;

    await seagull.save();

  } catch (er) {
    console.log(er);
  }

  return res.redirect(
    `/admin/seagulls?action=update&seagullName=${seagullName}`
  );
};

exports.getSeagullsAdmin = async (req, res) => {
  console.log("GetSeagullsAdmin");
  try {
    const seagulls = await Seagull.find().populate("expertises");
    const expertises = await Expertise.find();
    res.render("adminViews/adminSeagulls", {
      seagulls,
      expertises,
      seagullName: req.query.seagullName,
      action: req.query.action,
      // csrfToken: req.csrfToken(),
    });
  } catch (error) {
    console.error(error);
  }
};

exports.getDeletedSeagull = async (req, res) => {
  console.log("GetDeletedSeagull");
  const seagullId = req.params.seagullId;
  try {
    const seagull = await Seagull.findById(seagullId);
    res.render("adminViews/adminSeagullDelete", {
      seagull,
      // csrfToken: req.csrfToken(),
    });
  } catch (error) {
    console.error(error);
  }
};

exports.deleteSeagull = async (req, res) => {
  console.log("DeleteSeagull");
  const seagullId = req.params.seagullId;
  try {
    await Seagull.findByIdAndRemove(seagullId);
    res.redirect(`/admin/seagulls?action=delete&seagullName=${seagull.seagullName}`);
  } catch (error) {
    console.error(error);
  }
};

exports.getSeagullAdmin = async (req, res) => {
  console.log("GetSeagullAdmin");
  const seagullId = req.params.seagullId;
  try {
    const seagull = await Seagull.findById(seagullId).populate("expertises");
    const seagulls = await Seagull.find();
    const expertises = await Expertise.find();
    res.render("adminViews/adminSeagullEdit", {
      seagulls: seagulls,
      seagull: seagull,
      expertises: expertises,
      seagullName: req.query.seagullName,
      action: req.query.action,
      // csrfToken: req.csrfToken(),
    });
  } catch (error) {
    console.error(error);
  }
};

exports.getAdminPage = async (req, res) => {
  console.log("GetAdminPage");
  // res.render("main", { csrfToken: req.csrfToken() });
  res.render("main", { csrfToken: "csrf token" });
};
