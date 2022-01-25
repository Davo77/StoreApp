const customerSalesModel = require('../models/customer');

exports.getCustomerSalesById = async (request, response) => {
  try {
    let { id } = request.params;
    const customerSalesRecord = await customerSalesModel.getCustomerSalesById(id);
    response.status(200).send(customerSalesRecord);
  } catch (err) {
    response.status(404).send({ message: err.message });
  }
};

exports.getCustomerSpecialDiscountById  = async (request, response) => {
  try {
    let { user_id } = request.params;
    const customerSpecialPriceRecord = await customerSalesModel.getCustomerSpecialDiscountById (user_id);
    response.status(200).send(customerSpecialPriceRecord);
  } catch (err) {
    response.status(404).send({ message: err.message });
  }
};