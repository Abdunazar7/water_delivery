const pool = require("../config/db");

// Create
const createPayment = async (req, res) => {
  try {
    const { order_id, amount, payment_date, method } = req.body;

    const result = await pool.query(
      `INSERT INTO payments (order_id, amount, payment_date, method)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [order_id, amount, payment_date, method]
    );

    res.status(201).json({ message: "Payment created", data: result.rows[0] });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Get all
const getPayments = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM payments ORDER BY id ASC`);
    res.json(result.rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Get one
const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`SELECT * FROM payments WHERE id=$1`, [id]);

    if (!result.rows.length)
      return res.status(404).json({ message: "Payment not found" });

    res.json(result.rows[0]);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Update
const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { order_id, amount, payment_date, method } = req.body;

    const result = await pool.query(
      `UPDATE payments
       SET order_id=$1, amount=$2, payment_date=$3, method=$4
       WHERE id=$5 RETURNING *`,
      [order_id, amount, payment_date, method, id]
    );

    if (!result.rows.length)
      return res.status(404).json({ message: "Payment not found" });

    res.json({ message: "Payment updated", data: result.rows[0] });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Delete
const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `DELETE FROM payments WHERE id=$1 RETURNING *`,
      [id]
    );

    if (!result.rows.length)
      return res.status(404).json({ message: "Payment not found" });

    res.json({ message: "Payment deleted", data: result.rows[0] });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  createPayment,
  getPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
};
