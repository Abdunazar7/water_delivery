const pool = require("../config/db");

// Create
const createProduct = async (req, res) => {
  try {
    const { name, volume_liters, price } = req.body;

    const newProduct = await pool.query(
      `INSERT INTO water_products (name, volume_liters, price)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, volume_liters, price]
    );

    res
      .status(201)
      .send({ message: "Product created", data: newProduct.rows[0] });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};

// Get all
const getProducts = async (req, res) => {
  try {
    const products = await pool.query(
      "SELECT * FROM water_products ORDER BY id ASC"
    );
    res.send(products.rows);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await pool.query(
      "SELECT * FROM water_products WHERE id=$1",
      [id]
    );

    if (!customer.rows.length) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.send(customer.rows[0]);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};

// Update
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, volume_liters, price } = req.body;

    const result = await pool.query(
      `UPDATE water_products
       SET name=$1, volume_liters=$2, price=$3
       WHERE id=$4
       RETURNING *`,
      [name, volume_liters, price, id]
    );

    if (!result.rows.length)
      return res.status(404).json({ message: "Water product not found" });

    res.json({ message: "Water product updated", data: result.rows[0] });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Delete
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await pool.query(
      `DELETE FROM water_products WHERE id=$1 RETURNING *`,
      [id]
    );

    if (!deleted.rows.length)
      return res.status(404).send({ message: "Product not found" });

    res.send({ message: "Product deleted", data: deleted.rows[0] });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
