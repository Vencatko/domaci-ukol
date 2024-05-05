const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const itemFolderPath = path.join(__dirname, "storage", "itemList");

// Method to read an item from a file
function get(itemId) {
  try {
    const filePath = path.join(itemFolderPath, `${itemId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadItem", message: error.message };
  }
}

// Method to write an item to a file
function create(item) {
  try {
    item.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(itemFolderPath, `${item.id}.json`);
    const fileData = JSON.stringify(item);
    fs.writeFileSync(filePath, fileData, "utf8");
    return item;
  } catch (error) {
    throw { code: "failedToCreateItem", message: error.message };
  }
}

// Method to update item in a file
function update(item) {
  try {
    const currentItem = get(item.id);
    if (!currentItem) return null;
    const newItem = { ...currentItem, ...item };
    const filePath = path.join(itemFolderPath, `${item.id}.json`);
    const fileData = JSON.stringify(newItem);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newItem;
  } catch (error) {
    throw { code: "failedToUpdateItem", message: error.message };
  }
}

// Method to remove an item from a file
function remove(itemId) {
  try {
    const filePath = path.join(itemFolderPath, `${itemId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") return {};
    throw { code: "failedToRemoveItem", message: error.message };
  }
}

// Method to list items in a folder
function list() {
  try {
    const files = fs.readdirSync(itemFolderPath);
    const itemList = files.map((file) => {
      const fileData = fs.readFileSync(
        path.join(itemFolderPath, file),
        "utf8"
      );
      return JSON.parse(fileData);
    });
    itemList.sort((a, b) => new Date(a.date) - new Date(b.date));
    return itemList;
  } catch (error) {
    throw { code: "failedToListItems", message: error.message };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
};
