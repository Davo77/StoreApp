const specialModel = require('../models/special');

exports.getAllDiscounts = async (request, response) => {
    try {
      const specialRecord = await specialModel.getAllDiscounts();
      response.status(200).send(specialRecord);
    } catch (err) {
      response.status(500).send({ message: err.message });
    }
  };

  exports.getSpecialById = async (request, response) => {
    try {
      let { user_id } = request.params;
      const specialRecord = await specialModel.getSpecialById(user_id);
      response.status(200).send(specialRecord);
    } catch (err) {
      response.status(400).send({ message: err.message });
    }
  }