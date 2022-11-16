const express = require("express");
const app = express();
const seagullRoutes = require("./routes/seagullRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use(express.static("public"));
app.use(express.static("node_modules"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use(seagullRoutes);
app.use(adminRoutes);

app.listen(3400, () => {
  console.log("server initalized...");
});
