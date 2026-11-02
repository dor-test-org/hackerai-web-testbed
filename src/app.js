const express = require("express");
const db = require("./db");

const app = express();

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function page(title, body) {
  return `<!doctype html>
<html>
<head><meta charset="utf-8"><title>${escapeHtml(title)} - shop-demo</title></head>
<body>
<nav><a href="/">Home</a> | <a href="/products?category=kitchen">Products</a> | <a href="/search?q=mug">Search</a></nav>
${body}
</body>
</html>`;
}

app.get("/", (req, res) => {
  res.send(
    page(
      "Home",
      `<h1>shop-demo</h1>
<ul>
  <li><a href="/products?category=kitchen">Kitchen</a></li>
  <li><a href="/products?category=office">Office</a></li>
</ul>
<form action="/search" method="get">
  <input name="q" placeholder="Search products">
  <button type="submit">Search</button>
</form>
<p><a href="/go?url=https://example.com">Visit our partner</a></p>`
    )
  );
});

app.get("/products", (req, res) => {
  const category = req.query.category || "";
  try {
    const rows = db
      .prepare("SELECT id, name, price FROM products WHERE category = '" + category + "'")
      .all();
    const items = rows.map((r) => `<li>${escapeHtml(r.name)} - $${escapeHtml(r.price)}</li>`).join("");
    res.send(page("Products", `<h1>Products</h1><ul>${items}</ul>`));
  } catch (err) {
    res.status(500).send(page("Error", `<pre>${escapeHtml(err.message)}</pre>`));
  }
});

app.get("/search", (req, res) => {
  const q = String(req.query.q || "");
  const rows = db.prepare("SELECT name FROM products WHERE name LIKE ?").all("%" + q + "%");
  const items = rows.map((r) => `<li>${escapeHtml(r.name)}</li>`).join("");
  res.send(page("Search", `<h1>Results for ${q}</h1><ul>${items}</ul>`));
});

app.get("/go", (req, res) => {
  res.redirect(String(req.query.url || "/"));
});

module.exports = app;
