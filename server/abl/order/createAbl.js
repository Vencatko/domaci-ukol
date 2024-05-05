const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const orderDao = require("../../dao/order-dao.js");
const itemDao = require("../../dao/item-dao.js");
const companyDao = require("../../dao/company-dao.js");

const schema = {
  type: "object",
  properties: {
    itemId: { type: "string", minLength: 32, maxLength: 32 },
    companyId: { type: "string", minLength: 32, maxLength: 32 },
    quantity: { type: "string" }
  },
  required: ["itemId", "companyId", "quantity"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let order = req.body;
    
    // validate input
    const orderValid = ajv.validate(schema, order);
    if (!orderValid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }
    // check if company exists
    if (!companyDao.get(order.companyId)) {
        res.status(400).json({
            code: "dtoInIsNotValid",
            message: "companyId is not valid",
          });
          return;
    }
    // check if item exists
    if (!itemDao.get(order.itemId)){
        res.status(400).json({
            code: "dtoInIsNotValid",
            message: "itemId is not valid",
          });
          return;
    }
    // check if ordered quantity is bigger than 0
    if (order.quantity <= 0) {
      res.status(400).json({
        code: "cantOrderThisQuantity",
        message: "You need to order more than 0 items"
    });
    return;
    }
    // check stocked items
    let item = itemDao.get(order.itemId);
    if (item.quantity < order.quantity){
        res.status(400).json({
            code: "notEnoughItemsInStock",
            message: "not enough items in stock"
        });
        return;
    }
    // remove items from stock
    item.quantity = item.quantity - order.quantity;
    item.quantity = item.quantity.toString();
    itemDao.update(item);
    // create order
    order = orderDao.create(order);
    res.json(order);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
