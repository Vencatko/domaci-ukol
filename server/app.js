const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const companyController = require("./controller/company");
const itemController = require("./controller/item");
const orderController = require("./controller/order");


app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/company", companyController);
app.use("/item", itemController);
app.use("/order", orderController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
