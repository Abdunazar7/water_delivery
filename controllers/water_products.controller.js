const pool = require("../config/db");
const buildUpdateQuery = require("../helpers/buildUpdateQuery.helper");

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
    const customer = await pool.query("SELECT * FROM water_products WHERE id=$1", [
      id,
    ]);

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
    const query = buildUpdateQuery("water_products", id, req.body);
    if (!query) return res.status(400).json({ message: "Nothing to update" });

    const updated = await pool.query(query.sql, query.values);
    if (!updated.rows.length) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product updated", data: updated.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
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

module.exports = { createProduct, getProducts, getProductById, updateProduct, deleteProduct };
