const mongoose = require("mongoose");
const dbPath = " mongodb://127.0.0.1:27017/youtube-interest-list";
mongoose.connect(dbPath, {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", () => {
  console.log("> error occurred from the database");
});
db.once("open", () => {
  console.log("> successfully opened the database");
});
module.exports = mongoose;
