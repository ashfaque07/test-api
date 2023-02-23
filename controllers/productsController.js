const Product = require("../models/productsModel");
const { getPostData } = require('../utils');

// @desc get all products
// @route GET /api/products
async function getProducts(req, res) {
  try {
    const products = await Product.findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log(error);
  }
}

// @desc get single products
// @route GET /api/products/:id
async function getProduct(req, res, id) {
  try {
    const product = await Product.findById(id);
    if (product) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found" }));
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc create products
// @route POST /api/products
async function createProduct(req, res) {
  try {
    let body = await getPostData(req);
    const { title, description, price } = JSON.parse(body);
      const product = {
        title, 
        description, 
        price
      };
      
      const newProduct = await Product.create(product);
      res.writeHead(201, {'Content-Type': 'application/json'});
      return res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
  }
}

// @desc update product
// @route PUT /api/products/:id
async function updateProduct(req, res, id) {
  try {
    const product = await Product.findById(id);
    if(product) {
      let body = await getPostData(req);
      const { title, description, price } = JSON.parse(body);
      const productData = {
        title: title || product.title,
        description: description || product.description,
        price: price || product.price
      }
      const updatedProduct = await Product.update(productData, id);
      res.writeHead(200, {'Content-Type' : 'application/json'});
      return res.end(JSON.stringify(updatedProduct));
    } else {
      res.writeHead(404, {'Content-Type' : 'application/json'});
      res.end(JSON.stringify({ message: 'Product not found' }));
    }
  } catch(error) {
    console.log(error);
  }

}

// @desc delete product
// @route DELETE /api/products/:id
async function deleteProduct(req, res, id) {
  try {
    const product = await Product.findById(id);
    if(product) {
      Product.remove(id);
      res.writeHead(200, {'Content-Type': 'application/json'});
      return res.end(JSON.stringify({message: `Product id ${id} deletedrs`}));
    } else {
      res.writeHead(404, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({message: 'Product not found'}));
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
};
