const ProductManager = require('./class/ProductManager.js');
const {mate, vaso, yerbera, azucarera, termo} = require('./products/products.js');

const newProductManager = new ProductManager('./database/productsDb.json')
newProductManager.getProducts();
//newProductManager.addProduct(termo);
//newProductManager.getProductById(1);
//newProductManager.updateProduct(2, {stock: 30})
//newProductManager.deleteProductById(1);
//newProductManager.deleteAllProducts();
