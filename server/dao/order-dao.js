const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const orderFolderPath = path.join(__dirname, "storage", "orderList");

function create(order) {
  try {
    order.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(orderFolderPath, `${order.id}.json`);
    const fileData = JSON.stringify(order);
    fs.writeFileSync(filePath, fileData, "utf8");
    return order;
  } catch (error) {
    throw { code: "failedToCreateOrder", message: error.message };
  }
}
// Method to read an order from a file
function get(orderId) {
  try {
    const filePath = path.join(orderFolderPath, `${orderId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadOrder", message: error.message };
  }
}

// Method to remove an order from a file
function remove(orderId) {
  try {
    const filePath = path.join(orderFolderPath, `${orderId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") return {};
    throw { code: "failedToRemoveOrder", message: error.message };
  }
}

// Method to list orders in a folder
function list() {
  try {
    const files = fs.readdirSync(orderFolderPath);
    const orderList = files.map((file) => {
      const fileData = fs.readFileSync(
        path.join(orderFolderPath, file),
        "utf8"
      );
      return JSON.parse(fileData);
    });
    orderList.sort((a, b) => new Date(a.date) - new Date(b.date));
    return orderList;
  } catch (error) {
    throw { code: "failedToListOrders", message: error.message };
  }
}

module.exports = {
  get,
  create,
  remove,
  list
};
