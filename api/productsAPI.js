const express = require('express');
const router = new express.Router();
const productsService = require('../service/products');

router.get("/api/products", productsService.getAllProducts);
router.get("/api/products/:id", productsService.getProductById);

module.exports = router;