const Story = require("../models/seagullStoryModel");

exports.GetStoriesAdmin = async (req, res) => {
  try {
    const stories = await Story.findAll();
    return res.render("adminViews/adminStories", { stories });
  } catch (error) {
    console.log(error);
  }
  return res.render("adminViews/adminStories");
};

exports.CreateStoryGet = async (req, res) => {
  console.log("CreateStoryGet");
  try {
  } catch (error) {
    console.log(error);
  }
  render("adminViews/adminStoryCrete", { csrfToken: req.csrfToken() });
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
  render("adminViews/adminStoryDelete", { csrfToken: req.csrfToken() });
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
  res.redirect("adminViews/adminStoryEdit", { csrfToken: req.csrfToken() });
};

exports.EditStoryPost = async (req, res) => {
  console.log("EditStoryPost");
  try {
  } catch (error) {
    console.log(error);
  }
  res.redirect("adminViews/adminStories");
};

exports.GetStoriesMainpage = async (req, res) => {
  console.log("GetStoriesMainpage");

  try {
  } catch (error) {
    console.log(error);
  }
  res.render("storyViews/featured", { csrfToken: req.csrfToken() });
};

exports.GetStoriesAll = async (req, res) => {
  console.log("GetStoriesAll");

  try {
  } catch (error) {
    console.log(error);
  }
  res.render("storyViews/stories", {
    message: null,
    csrfToken: req.csrfToken(),
  });
};

exports.GetStoryDetail = async (req, res) => {
  console.log("GetStoryDetail");
  try {
  } catch (error) {
    console.log(error);
  }
  res.render("storyViews/story", { csrfToken: req.csrfToken() });
};
