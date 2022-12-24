const ProductManager = require('./class/ProductManager.js');
const {mate, vaso, yerbera, azucarera, termo, servilleta, bombilla, yerba, te, sahumerio} = require('./products/products.js');

const productManager = new ProductManager('./database/productsDb.json')
//productManager.addProduct(termo);
//productManager.addProduct(vaso);
//productManager.addProduct(azucarera);
//productManager.addProduct(yerbera);
//productManager.addProduct(termo);
//productManager.addProduct(servilleta);
//productManager.addProduct(bombilla);
//productManager.addProduct(yerba);
//productManager.addProduct(te);
//productManager.addProduct(sahumerio);
productManager.getProducts();
//productManager.getProductById(1);
//productManager.updateProduct(2, {stock: 30})
//productManager.deleteProductById(1);
//productManager.deleteAllProducts();