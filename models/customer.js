const client = require("../loaders/client");

exports.getCustomerSalesById = async (id) => {
  try {
    const result = await client.query(
      "SELECT amount_of_sales FROM customer WHERE id = $1",
      [id]
    );
    return result.rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

