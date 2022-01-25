const express = require('express');
const router = new express.Router();
const specialService = require('../service/special');

router.get("/api/specialdiscount/", specialService.getAllDiscounts);
router.get("/api/special/:id", specialService.getSpecialById);

module.exports = router;