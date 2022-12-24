const fs = require("fs");

class ProductManager {
  constructor(filepath) {
    this.filepath = filepath;
  }

  async #readFile() {
    try {
      const content = await fs.promises.readFile(this.filepath, "utf-8");
      const parseContent = JSON.parse(content);
      return parseContent;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getProducts() {
    const fileContent = await this.#readFile();

    try {
      if (fileContent.length === 0) {
        console.log("No se encontraron productos!");
      } else return fileContent;
    } catch (error) {
      console.log("No se encontraron productos!");
    }
  }

  async #checkProductCode(code) {
    const fileContent = await this.#readFile();
    return fileContent.find((obj) => obj.code === code);
  }

  async addProduct(obj) {
    const fileContent = await this.#readFile();
    if (await this.#checkProductCode(obj.code))
      return console.log(`El código de producto ${obj.code} es inválido`);

    try {
      if (fileContent.length !== 0)
        await fs.promises.writeFile(
          this.filepath,
          JSON.stringify(
            [
              ...fileContent,
              { ...obj, id: fileContent[fileContent.length - 1].id + 1 },
            ],
            null,
            2
          ),
          "utf-8"
        );
      else
        await fs.promises.writeFile(
          this.filepath,
          JSON.stringify([{ ...obj, id: 1 }]),
          "utf-8"
        );
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    try {
      const fileContent = await this.#readFile();

      if (!fileContent.find((obj) => obj.id === id))
        throw new Error(`Producto con ID: ${id} no encontrado`);
      else console.log(fileContent.find((obj) => obj.id === id));
    } catch {
      console.log(`Producto con ID: ${id} no encontrado`);
    }
  }

  async updateProduct(id, obj) {
    try {
      const fileContent = await this.#readFile();
      const updated = fileContent.map((product) =>
        product.id === id ? { ...product, ...obj } : product
      );

      if (!fileContent.find((obj) => obj.id === id))
        throw new Error(`Producto con id ${id} no encontrado`);
      else
        await fs.promises.writeFile(
          this.filepath,
          JSON.stringify(updated, null, 2)
        );
    } catch (error) {
      console.log(`Producto con id ${id} no encontrado`);
    }
  }
  async deleteProductById(id) {
    try {
      const fileContent = await this.#readFile();
      const filteredProduct = fileContent.filter(
        (product) => product.id !== id
      );

      if (!fileContent.find((obj) => obj.id === id))
        throw new Error(`Producto con ID: ${id} no encontrado`);
      else
        await fs.promises.writeFile(
          this.filepath,
          JSON.stringify(filteredProduct, null, 2)
        );
    } catch (error) {
      console.log(`Producto con ID: ${id} no encontrado`);
    }
  }

  async deleteAllProducts() {
    await fs.promises.writeFile(this.filepath, JSON.stringify([]));
  }
}
module.exports = ProductManager;
