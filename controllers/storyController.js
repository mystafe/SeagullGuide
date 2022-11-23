exports.GetStoriesAdmin = async (req, res) => {
  if (req.session.isAuth) {
    console.log("GetStoriesAdmin");
    try {
    } catch (error) {
      console.log(error);
    }
    return res.render("adminViews/adminStories", {
      isAuth: req.session.isAuth,
    });
  }
  res.redirect("/");
};

exports.CreateStoryGet = async (req, res) => {
  console.log("CreateStoryGet");
  try {
  } catch (error) {
    console.log(error);
  }
  render("adminViews/adminStoryCrete", { isAuth: req.session.isAuth });
};
exports.CreateStoryPost = async (req, res) => {
  console.log("CreateStoryPost");
  try {
  } catch (error) {
    console.log(error);
  }
  res.redirect("adminViews/adminStories");
};

exports.DeleteStoryGet = async (req, res) => {
  console.log("DeleteStoryGet");
  try {
  } catch (error) {
    console.log(error);
  }
  render("adminViews/adminStoryDelete"), { isAuth: req.session.isAuth };
};

exports.DeleteStoryPost = async (req, res) => {
  console.log("DeleteStoryPost");
  try {
  } catch (error) {
    console.log(error);
  }
  res.redirect("adminViews/adminStories");
};

exports.EditStoryGet = async (req, res) => {
  console.log("EditStoryGet");
  try {
  } catch (error) {
    console.log(error);
  }
  res.redirect("adminViews/adminStoryEdit", { isAuth: req.session.isAuth });
};

exports.EditStoryPost = async (req, res) => {
  console.log("EditStoryPost");

  try {
  } catch (error) {
    console.log(error);
  }
  res.redirect("adminViews/adminStories", { isAuth: req.session.isAuth });
};

exports.GetStoriesMainpage = async (req, res) => {
  console.log("GetStoriesMainpage");

  try {
  } catch (error) {
    console.log(error);
  }
  res.render("storyViews/featured", { isAuth: req.session.isAuth });
};

exports.GetStoriesAll = async (req, res) => {
  console.log("GetStoriesAll");

  try {
  } catch (error) {
    console.log(error);
  }
  res.render("storyViews/stories", {
    message: null,
    isAuth: req.session.isAuth,
  });
};

exports.GetStoryDetail = async (req, res) => {
  console.log("GetStoryDetail");
  try {
  } catch (error) {
    console.log(error);
  }
  res.render("storyViews/story", { isAuth: req.session.isAuth });
};
