const itemDao = require("../../dao/item-dao.js");

async function ListAbl(req, res) {
  try {
    const itemList = itemDao.list();

    itemList.forEach((item) => {
      item.userMap || {};
    });

    res.json(itemList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;
