const express = require("express");
const ProductManager = require("../class/ProductManager");

const app = express();
const port = 8080;
const productManager = new ProductManager('./database/productsDb.json')

app.get("/products", async (req, res) => {
  const products = await productManager.getProducts();
  const { limit } = req.query;

  if (limit) return res.send(products.slice(0, limit));
  else return res.send(products);
});

app.get("/products/:pid", async (req, res) => {
  const products = await productManager.getProducts();
  const productoId = products.find((products) => products.id === Number(req.params.pid));
  
  if (productoId) return res.status(200).send(productoId);
  else return res.status(404).json({ message: 'Producto no encontrado' });
});

app.listen(port, () => {
  console.log("Servidor levantado en el puerto", port);
});