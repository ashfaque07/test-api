const http = require("http");


const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("./controllers/productsController");
const server = http.createServer((req, res) => {
  let reqId = req.url.split("api/products/").pop();
  if (req.url === "/api/products" && req.method === "GET") {
    getProducts(req, res);
  } else if (req.url === "/api/products" && req.method === "POST") {
    createProduct(req, res);
  } else if (req.url.match(/\/api\/products\/\w+/) && reqId) {
    if (req.method === "GET") {
      getProduct(req, res, reqId);
    } else if (req.method === "PUT") {
      updateProduct(req, res, reqId);
    } else if (req.method === "DELETE") {
      deleteProduct(req, res, reqId);
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify("Invalid request"));
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify("Invalid request"));
  }
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
