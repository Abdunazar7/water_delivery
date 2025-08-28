const pool = require("../config/db");
const buildUpdateQuery = require("../helpers/buildUpdateQuery.helper");

// Create
const createCustomer = async (req, res) => {
  try {
    const { name, phone, email, is_active } = req.body;

    const newCustomer = await pool.query(
      `
      INSERT INTO customers (name, phone, email, is_active)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [name, phone, email, is_active ?? false]
    );

    res.status(201).send({
      message: "New Customer created",
      data: newCustomer.rows[0],
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};

// Get all
const getCustomers = async (req, res) => {
  try {
    const customers = await pool.query(
      "SELECT * FROM customers ORDER BY id ASC"
    );
    res.send(customers.rows);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};

// Get one
const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await pool.query("SELECT * FROM customers WHERE id=$1", [
      id,
    ]);

    if (!customer.rows.length) {
      return res.status(404).send({ message: "Customer not found" });
    }

    res.send(customer.rows[0]);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};

// Update
const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const fields = req.body;

    const query = buildUpdateQuery("customers", id, fields);
    if (!query) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    const updated = await pool.query(query.sql, query.values);

    if (!updated.rows.length) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json({ message: "Customer updated", data: updated.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Delete
const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await pool.query(
      "DELETE FROM customers WHERE id=$1 RETURNING *",
      [id]
    );

    if (!deleted.rows.length) {
      return res.status(404).send({ message: "Customer not found" });
    }

    res.send({ message: "Customer deleted", data: deleted.rows[0] });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
