const pool = require("../config/db");

// Create
const createOrderItem = async (req, res) => {
  try {
    const { order_id, product_id, quantity, total_price } = req.body;

    const result = await pool.query(
      `INSERT INTO order_items (order_id, product_id, quantity, total_price)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [order_id, product_id, quantity, total_price]
    );

    res
      .status(201)
      .json({ message: "Order item created", data: result.rows[0] });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Get all
const getOrderItems = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM order_items ORDER BY id ASC`
    );
    res.json(result.rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Get one
const getOrderItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`SELECT * FROM order_items WHERE id=$1`, [
      id,
    ]);

    if (!result.rows.length)
      return res.status(404).json({ message: "Order item not found" });

    res.json(result.rows[0]);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Update
const updateOrderItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { order_id, product_id, quantity, total_price } = req.body;

    const result = await pool.query(
      `UPDATE order_items
       SET order_id=$1, product_id=$2, quantity=$3, total_price=$4
       WHERE id=$5 RETURNING *`,
      [order_id, product_id, quantity, total_price, id]
    );

    if (!result.rows.length)
      return res.status(404).json({ message: "Order item not found" });

    res.json({ message: "Order item updated", data: result.rows[0] });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Delete
const deleteOrderItem = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `DELETE FROM order_items WHERE id=$1 RETURNING *`,
      [id]
    );

    if (!result.rows.length)
      return res.status(404).json({ message: "Order item not found" });

    res.json({ message: "Order item deleted", data: result.rows[0] });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  createOrderItem,
  getOrderItems,
  getOrderItemById,
  updateOrderItem,
  deleteOrderItem,
};
