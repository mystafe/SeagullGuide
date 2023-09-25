const mongoose = require("mongoose");

const conString = 'mongodb+srv://seagulldbowner:Seagul123.@cluster0.c76l2jq.mongodb.net/your-database-name';
const conString2 = 'mongodb+srv://seagulldbowner:Seagul123.@cluster0.c76l2jq.mongodb.net/'

mongoose.connect(conString2, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

module.exports = db;