const productsModel = require('../models/products');

exports.getAllProducts = async (request, response) => {
  try {
    const productsRecord = await productsModel.getAllProducts();
    response.status(200).send(productsRecord);
  } catch (err) {
    response.status(500).send({ message: err.message });
  }
};

exports.getProductById = async (request, response) => {
  try {
    let { id } = request.params;
    const productRecord = await productsModel.getProductById(id);
    response.status(200).send(productRecord);
  } catch (err) {
    response.status(404).send({ message: err.message });
  }
};
