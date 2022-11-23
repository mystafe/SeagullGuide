const Seagull = require("../models/seagullModel");
const Expertise = require("../models/expertiseModel");
const SlugField = require("../helpers/slugfield");
const User = require("../models/userModel");
const Story = require("../models/seagullStoryModel");
const bcrypt = require("bcrypt");

async function Populate() {
  const count = await Expertise.count();
  if (count == 0) {
    const expertises = await Expertise.bulkCreate([
      {
        expertiseName: "Friendly",
        urlSlug: SlugField("Friendly"),
        iconUrl: "friendly.png",
      },
      {
        expertiseName: "Fighter",
        urlSlug: SlugField("Fighter"),
        iconUrl: "fighter.png",
      },
      {
        expertiseName: "Brave",
        urlSlug: SlugField("Brave"),
        iconUrl: "brave.png",
      },
      {
        expertiseName: "Lovely",
        urlSlug: SlugField("Lovely"),
        iconUrl: "lovely.png",
      },
    ]);

    const seagulls = await Seagull.bulkCreate([
      {
        seagullName: "Test 01",
        urlSlug: SlugField("test 01"),
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Larus_pacificus_Bruny_Island.jpg/640px-Larus_pacificus_Bruny_Island.jpg?1668616711760",
        isFavorite: true,
        isAlive: true,
      },
      {
        seagullName: "Test 02",
        urlSlug: SlugField("test 02"),
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/a/a1/Swallow-tailed-gull.jpg",
      },
      {
        seagullName: "Nazli",
        urlSlug: SlugField("Nazli"),
        imageUrl: "Nazli_1668805251088.jpg",
        isFavorite: true,
      },
      {
        seagullName: "Cemil",
        urlSlug: SlugField("Cemil"),
        imageUrl: "Cemil_1668804915804.jpg",
        isFavorite: true,
      },
      {
        seagullName: "Melek",
        urlSlug: SlugField("Melek"),
        imageUrl: "Melek_1668804961797.jpg",
        isFavorite: true,
      },
    ]);

    expertises[0].addSeagull(seagulls[0]);
    expertises[1].addSeagull(seagulls[1]);
    expertises[2].addSeagull(seagulls[2]);
    expertises[3].addSeagull(seagulls[1]);
    expertises[3].addSeagull(seagulls[3]);
    expertises[0].addSeagull(seagulls[3]);
    expertises[2].addSeagull(seagulls[3]);
    expertises[1].addSeagull(seagulls[2]);
    expertises[3].addSeagull(seagulls[0]);
    expertises[2].addSeagull(seagulls[4]);

    const users = await User.bulkCreate([
      {
        username: "admin",
        fullname: "mustafa adm",
        email: "dummy1@gmail.com",
        isverified: 1,
        passwordhash: await bcrypt.hash("123456", 10),
      },
      {
        username: "moderatedoo",
        fullname: "emin erim",
        email: "dummy2@gmail.com",
        isverified: 1,
        passwordhash: await bcrypt.hash("123456", 10),
      },
      {
        username: "moderatedosyone",
        fullname: "demin derdim",
        email: "dummy3@gmail.com",
        passwordhash: await bcrypt.hash("123456", 10),
      },
      {
        username: "dummy4",
        fullname: "dummy4 user",
        email: "dummy4@gmail.com",
        isverified: 1,
        passwordhash: await bcrypt.hash("123456", 10),
      },
    ]);

    const stories = await Story.bulkCreate([
      { title: "first story", content: "resim1.jpg" },
      { title: "second story", content: "resim2.jpg" },
    ]);
  }
}

module.exports = Populate;
