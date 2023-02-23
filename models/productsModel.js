
const { v4: uuid4 } = require('uuid');
const products = require('../data/products');
const { writeDataToFile } = require('../utils');

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(products);
    });
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const product = products.find((p) => p?.id === id)
        resolve(product);
    });
}

function create(product) {
    return new Promise((resolve, reject) => {
        const newProduct = { id: uuid4, ...product };
        products.push(newProduct);
        writeDataToFile('./data/products.json', products);
        resolve(newProduct);
    });
}

function update(productData, id) {
    return new Promise((resolve, reject) => {
        const index = products.findIndex((p) => p.id === id);
        products[index] = {id, ...productData};
        writeDataToFile('./data/products.json', products);
        resolve(products[index]);
    });
}

function remove(id) {
    return new Promise((resolve, reject) => {
        let updatedProducts = products.filter((p) => p.id !== id);
        writeDataToFile('./data/products.json', updatedProducts);
        resolve();
    });
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}