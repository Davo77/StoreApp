const client = require("../loaders/client");

exports.getAllDiscounts = async () => {
    try {
      const result = await client.query("SELECT * FROM special_price");
      return result.rows;
    } catch (err) {
      throw new Error(err);
    }
  };

  exports.getSpecialById = async user_id => {
    try {
      const result = await client.query(
        "SELECT price_factor FROM special_price WHERE user_id = $1",
        [user_id]
      );
      return result.rows;
    } catch (err) {
      throw new Error(err);
    }
  };