const Story = require("../models/seagullStoryModel");

exports.GetStoriesAdmin = async (req, res) => {
  try {
    const stories = await Story.find();
    return res.render("adminViews/adminStories", { stories });
  } catch (error) {
    console.error("Error fetching stories:", error);
    return res.status(500).send("Internal Server Error");
  }
};

exports.CreateStoryGet = async (req, res) => {
  console.log("CreateStoryGet");
  // return res.render("adminViews/adminStoryCrete", { csrfToken: req.csrfToken() });
  return res.render("adminViews/adminStoryCrete", { csrfToken: "csrf" });
};

exports.CreateStoryPost = async (req, res) => {
  console.log("CreateStoryPost");
  try {
    const { title, content } = req.body;
    const newStory = new Story({ title, content });
    await newStory.save();
  } catch (error) {
    console.error("Error creating story:", error);
  }
  res.redirect("/admin/stories");
};

exports.DeleteStoryGet = async (req, res) => {
  console.log("DeleteStoryGet");
  // return res.render("adminViews/adminStoryDelete", { csrfToken: req.csrfToken() });
  return res.render("adminViews/adminStoryDelete", { csrfToken: "csrf" });
};

exports.DeleteStoryPost = async (req, res) => {
  console.log("DeleteStoryPost");
  try {
    const storyId = req.body.storyId;
    await Story.findByIdAndRemove(storyId);
  } catch (error) {
    console.error("Error deleting story:", error);
  }
  res.redirect("/admin/stories");
};

exports.EditStoryGet = async (req, res) => {
  console.log("EditStoryGet");
  // return res.render("adminViews/adminStoryEdit", { csrfToken: req.csrfToken() });
  return res.render("adminViews/adminStoryEdit", { csrfToken: "csrf" });
};

exports.EditStoryPost = async (req, res) => {
  console.log("EditStoryPost");
  try {
    const { storyId, title, content } = req.body;
    await Story.findByIdAndUpdate(storyId, { title, content });
  } catch (error) {
    console.error("Error updating story:", error);
  }
  res.redirect("/admin/stories");
};

exports.GetStoriesMainpage = async (req, res) => {
  console.log("GetStoriesMainpage");
  // res.render("storyViews/featured", { csrfToken: req.csrfToken() });
  res.render("storyViews/featured", { csrfToken:"csrf token" });
};

exports.GetStoriesAll = async (req, res) => {
  console.log("GetStoriesAll");
  res.render("storyViews/stories", {
    message: null,
    // csrfToken: req.csrfToken(),
    csrfToken: "csrf token",
  });
};

exports.GetStoryDetail = async (req, res) => {
  console.log("GetStoryDetail");
  res.render("storyViews/story", { csrfToken: "csrf token" });
  // res.render("storyViews/story", { csrfToken: req.csrfToken() });
};
