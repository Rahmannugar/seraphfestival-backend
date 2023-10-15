const express = require("express");
require("dotenv").config();
const appRoute = require("./routes/route.js");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

/*routes */
app.use("/", appRoute);

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
