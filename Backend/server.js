const app = require("./src/app.js");
const dotenv = require("dotenv");

dotenv.config();

app.listen(8000, () => {
  console.log("sever is listening on port:8000");
});
