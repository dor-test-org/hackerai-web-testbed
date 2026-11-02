const { DatabaseSync } = require("node:sqlite");

const db = new DatabaseSync(":memory:");

db.exec(`
  CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, category TEXT, price REAL);
  CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT, role TEXT);
`);

const addProduct = db.prepare("INSERT INTO products (name, category, price) VALUES (?, ?, ?)");
addProduct.run("Coffee mug", "kitchen", 9.5);
addProduct.run("Tea kettle", "kitchen", 24);
addProduct.run("Desk lamp", "office", 31);
addProduct.run("Notebook", "office", 4.25);

const addUser = db.prepare("INSERT INTO users (username, password, role) VALUES (?, ?, ?)");
addUser.run("admin", "S3cr3t-Adm1n!", "admin");
addUser.run("dana", "dana2024", "user");

module.exports = db;
