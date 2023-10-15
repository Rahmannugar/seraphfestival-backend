const express = require("express");
const cors = require("cors");
require("dotenv").config();
const appRoute = require("./routes/route.js");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

/*routes */
app.use("/", appRoute);

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
