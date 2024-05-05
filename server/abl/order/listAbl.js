const orderDao = require("../../dao/order-dao.js");

async function ListAbl(req, res) {
  try {
    const orderList = orderDao.list();

    orderList.forEach((order) => {
      order.userMap 
    });

    res.json(orderList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;