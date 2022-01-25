const express = require('express');
const router = new express.Router();
const customerSalesService = require('../service/customer');

router.get("/api/customersales/:id", customerSalesService.getCustomerSalesById);


module.exports = router;