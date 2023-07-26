const fs = require ("fs");

class ProductManager {
  constructor() {
    this.products = [];
    this.path= "Products.json";
    this.createFile();
    this.productoIdCounter = 0;
    this.product = {
      id: this.productoIdCounter,
      title: "",
      description: "",
      price: 0,
      thumbnail: "",
      code: 0,
      stock: 0,
    };
  }

  async createFile(){
    if(!fs.existsSync(this.path)){
        fs.writeFileSync(this.path, JSON.stringify(this.products));
    }

  }
  async addProduct(product) {
    const productoExiste = this.products.find(
      (producto) => producto.code === product.code
    );
    if (productoExiste) {
      console.log(`El producto ${productoExiste.title}  ya existe`);
      return;
    }
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      console.log(
        `Debes completar todos los campos para agregar un producto ${title}`
      );
    } else {
      this.productoIdCounter++;
    }
    product.id = this.productoIdCounter;
    this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    this.products.push(product);
    fs.writeFileSync(this.path, JSON.stringify(this.products));
  }

  async updateProduct(id, product){
    this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    let pos = this.products.findIndex(item => item.id === id);

    if (pos > -1){
        this.products[pos].title = product.title;
        this.products[pos].description = product.description;
        this.products[pos].price = product.price;
        this.products[pos].thumbnail = product.thumbnail;
        this.products[pos].code = product.code;
        this.products[pos].stock = product.stock;
        fs.writeFileSync(this.path, JSON.stringify(this.products));
        console.log("Update Product")
    } else{
        console.log("Not found")
    }


  }

  async deleteProduct(id){
    this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    let pos = this.products.findIndex(item => item.id === id);

    if (pos > -1){
        this.products.splice(pos, 1);
        fs.writeFileSync(this.path, JSON.stringify(this.products));
        console.log("Product N* " + id + " deleted!")
    } else{
        console.log("Not found")
    }
  }

  async getProducts() {
    this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));

    return this.products;
  }

  async getProductById(id) {    
    this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));

    const producto = this.products.find((producto) => producto.id === id);

    if (!producto) {
      throw new Error("El producto no se encuentra");
    }

    return producto;
  }
}

module.exports = { ProductManager };