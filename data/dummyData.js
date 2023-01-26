const Seagull = require("../models/seagullModel");
const Expertise = require("../models/expertiseModel");
const SlugField = require("../helpers/slugfield");
const User = require("../models/userModel");
const Story = require("../models/seagullStoryModel");
const bcrypt = require("bcrypt");
const Role = require("../models/roleModel");

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
        seagullName: "Capcap",
        urlSlug: SlugField("Capcap"),
        imageUrl: "Capcap.jpg",
      },
      {
        seagullName: "Mr Seagull",
        urlSlug: SlugField("Mr Seagull"),
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Larus_pacificus_Bruny_Island.jpg/640px-Larus_pacificus_Bruny_Island.jpg?1668616711760",
        isFavorite: true,
        isAlive: true,
      },
      {
        seagullName: "Mrs Seagull",
        urlSlug: SlugField("Mrs Seagull"),
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/a/a1/Swallow-tailed-gull.jpg",
      },
      {
        seagullName: "Nazli",
        urlSlug: SlugField("Nazli"),
        imageUrl: "Nazli.jpg",
        isFavorite: true,
      },
      {
        seagullName: "Cemil",
        urlSlug: SlugField("Cemil"),
        imageUrl: "Cemil.jpg",
        isFavorite: true,
      },
      {
        seagullName: "Melek",
        urlSlug: SlugField("Melek"),
        imageUrl: "Melek.jpg",
        isFavorite: true,
      },
    ]);

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
      {
        content: "“Wherever there are birds, there is hope”",
        imageUrl: "Cemil.jpg",
        userId: 1,
      },
      {
        content:
          "“Birds chirping around you is a beautiful realization that life is incredibly good. Let this sound be a gentle break in your routine.”",
        imageUrl: "Nazli.jpg",
        userId: 2,
      },
      {
        content:
          "“Every bird, every tree, every flower reminds me what a blessing and privilege it is just to be alive.”",
        imageUrl: "Capcap.jpg",
        userId: 3,
      },
      {
        content: "“Every bird is a hope for humanity”",
        imageUrl: "Umut.jpg",
        userId: 1,
      },
    ]);

    const roles = await Role.bulkCreate([
      { rolename: "Admin" },
      { rolename: "Moderator" },
      { rolename: "Regular User" },
    ]);

    const popRel = () => {
      expertises[0].addSeagull(seagulls[0]);
      expertises[1].addSeagull(seagulls[1]);
      expertises[2].addSeagull(seagulls[2]);
      expertises[3].addSeagull(seagulls[1]);
      expertises[3].addSeagull(seagulls[3]);
      expertises[0].addSeagull(seagulls[3]);
      expertises[0].addSeagull(seagulls[4]);
      expertises[1].addSeagull(seagulls[4]);
      expertises[2].addSeagull(seagulls[3]);
      expertises[1].addSeagull(seagulls[2]);
      expertises[3].addSeagull(seagulls[0]);
      expertises[2].addSeagull(seagulls[4]);

      users[0].addRole(roles[0]);
      users[0].addRole(roles[1]);
      users[1].addRole(roles[1]);
      users[2].addRole(roles[2]);
      users[3].addRole(roles[2]);
    };
    popRel();
  }
}

module.exports = Populate;
