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
