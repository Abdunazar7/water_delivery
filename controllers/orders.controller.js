const pool = require("../config/db");

// Create
const createOrder = async (req, res) => {
  try {
    const { customer_id, delivery_staff_id, order_date, status } = req.body;

    const result = await pool.query(
      `INSERT INTO orders (customer_id, delivery_staff_id, order_date, status)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [customer_id, delivery_staff_id, order_date, status]
    );

    res.status(201).json({ message: "Order created", data: result.rows[0] });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Get all
const getOrders = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM orders ORDER BY id ASC`);
    res.json(result.rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Get one
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`SELECT * FROM orders WHERE id=$1`, [id]);

    if (!result.rows.length)
      return res.status(404).json({ message: "Order not found" });

    res.json(result.rows[0]);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Update
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { customer_id, delivery_staff_id, order_date, status } = req.body;

    const result = await pool.query(
      `UPDATE orders
       SET customer_id=$1, delivery_staff_id=$2, order_date=$3, status=$4
       WHERE id=$5 RETURNING *`,
      [customer_id, delivery_staff_id, order_date, status, id]
    );

    if (!result.rows.length)
      return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order updated", data: result.rows[0] });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Delete
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `DELETE FROM orders WHERE id=$1 RETURNING *`,
      [id]
    );

    if (!result.rows.length)
      return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order deleted", data: result.rows[0] });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
