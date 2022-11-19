const Seagull = require("../models/seagullModel");
const Expertise = require("../models/expertiseModel");

async function Populate() {
  const count = await Expertise.count();
  console.log(count);
  if (count == 0) {
    await Expertise.bulkCreate([
      {
        expertiseName: "Friendly",
        iconUrl: "friendly.png",
      },
      {
        expertiseName: "Fighter",
        iconUrl: "fighter.png",
      },
      {
        expertiseName: "Brave",
        iconUrl: "brave.png",
      },
      {
        expertiseName: "Lovely",
        iconUrl: "lovely.png",
      },
    ]);

    await Seagull.bulkCreate([
      {
        seagullName: "test01",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Larus_pacificus_Bruny_Island.jpg/640px-Larus_pacificus_Bruny_Island.jpg?1668616711760",
        isFavorite: true,
      },
      {
        seagullName: "test02",
        expertiseId: 2,
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/a/a1/Swallow-tailed-gull.jpg",
      },
      {
        seagullName: "Nazli",
        imageUrl: "Nazli_1668805251088.jpg",
        expertiseId: 3,
        isFavorite: true,
      },
      {
        seagullName: "Cemil",
        imageUrl: "Cemil_1668804915804.jpg",
        isFavorite: true,
      },
      {
        seagullName: "Melek",
        imageUrl: "Melek_1668804961797.jpg",
        isFavorite: true,
      },
    ]);
  }
}

module.exports = Populate;
