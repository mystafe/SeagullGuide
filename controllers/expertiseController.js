const Expertise = require("../models/expertiseModel");

exports.ExpertiseDelete = async function (req, res) {
  console.log("ExpertiseDelete");
  const expertiseId = req.params.expertiseId;

  try {
    const expertise = await Expertise.findById(expertiseId);

    if (!expertise) {
      return res.redirect(`/admin/expertises?action=is not able to delete`);
    }

    await expertise.remove();
    return res.redirect(
      `/admin/expertises?action=delete&expertiseName=${expertise.expertiseName}`
    );
  } catch (err) {
    console.error("Error deleting expertise:", err);
    return res.redirect(`/admin/expertises?action=is not able to delete`);
  }
};

exports.GetDeletedExpertise = async function (req, res) {
  console.log("GetDeletedExpertise");
  const expertiseId = req.params.expertiseId;

  try {
    const expertise = await Expertise.findById(expertiseId);
    
    if (!expertise) {
      return res.status(404).send("Expertise not found");
    }

    return res.render("adminViews/adminExpertiseDelete", {
      expertise,
      // csrfToken: req.csrfToken(),
      csrfToken: "csrf token",
    });
  } catch (err) {
    console.error("Error fetching expertise:", err);
    return res.status(500).send("Internal Server Error");
  }
};

exports.GetExpertiseAdmin = async function (req, res) {
  console.log("GetExpertiseAdmin");
  const expertiseId = req.params.expertiseId;

  try {
    const expertise = await Expertise.findById(expertiseId);
    
    if (!expertise) {
      return res.status(404).send("Expertise not found");
    }

    res.render("adminViews/adminExpertiseEdit", {
      expertise,
      page: 0,
      index: 0,
      expertiseId: expertiseId,
      action: req.query.action,
      expertiseName: req.query.expertiseName,
      // csrfToken: req.csrfToken(),
      csrfToken: "csrf token",
    });
  } catch (err) {
    console.error("Error fetching expertise:", err);
    return res.status(500).send("Internal Server Error");
  }
};

exports.UpdateExpertise = async function (req, res) {
  console.log("UpdateExpertise");
  const expertiseId = req.body.id;
  const expertiseName = req.body.expertiseName;

  try {
    const expertise = await Expertise.findById(expertiseId);
    
    if (!expertise) {
      return res.status(404).send("Expertise not found");
    }

    let iconUrl = expertise.iconUrl;
    
    if (req.file && req.file.filename) {
      iconUrl = req.file.filename;
    }

    await Expertise.findByIdAndUpdate(expertiseId, { expertiseName, iconUrl });

    return res.redirect(
      `/admin/expertises?action=update&expertiseName=${expertiseName}`
    );
  } catch (err) {
    console.error("Error updating expertise:", err);
    return res.status(500).send("Internal Server Error");
  }
};

exports.GetExpertisesAdmin = async (req, res) => {
  console.log("GetExpertisesAdmin");

  try {
    const expertises = await Expertise.find();
    res.render("adminViews/adminExpertises", {
      expertises,
      expertiseName: req.query.expertiseName,
      action: req.query.action,
      // csrfToken: req.csrfToken(),
      csrfToken: "csrf token",
    });
  } catch (err) {
    console.error("Error fetching expertises:", err);
    return res.status(500).send("Internal Server Error");
  }
};

exports.createExpertise = async (req, res) => {
  console.log("createExpertise");
  const expertiseName = req.body.name;
  let iconUrl = "";

  try {
    if (req.file && req.file.filename) {
      iconUrl = req.file.filename;
    }

    const expertise = new Expertise({ expertiseName, iconUrl });
    await expertise.save();
  } catch (err) {
    console.error("Error creating expertise:", err);
  }

  return res.redirect(
    `/admin/expertises?action=create&expertiseName=${expertiseName}`
  );
};
