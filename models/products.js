const client = require("../loaders/client.js");

exports.getProductById = async (id) => {
    try {
      const result = await client.query(
        "SELECT * FROM products WHERE id = $1",
        [id]
      );
      return result.rows[0];
    } catch (err) {
      throw new Error(err);
    }
  };

  exports.getAllProducts = async () => {
    try {
      const result = await client.query("SELECT * FROM products");
      return result.rows;
    } catch (err) {
      throw new Error(err);
    }
  };