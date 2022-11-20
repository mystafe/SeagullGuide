const Seagull = require("../models/seagullModel");
const Expertise = require("../models/expertiseModel");
const SlugField = require("../helpers/slugfield");
async function Populate() {
  const count = await Expertise.count();
  console.log(count);
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
  }
}

module.exports = Populate;
