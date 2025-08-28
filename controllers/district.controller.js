const pool = require("../config/db");
const buildUpdateQuery = require("../helpers/buildUpdateQuery.helper");

// Create
const createdistrict = async (req, res) => {
  try {
    const { name } = req.body;

    const newdistrict = await pool.query(
      `INSERT INTO districts (name) VALUES ($1) RETURNING *`,
      [name]
    );

    res
      .status(201)
      .send({ message: "district created", data: newdistrict.rows[0] });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};

// Get all
const getdistricts = async (req, res) => {
  try {
    const districts = await pool.query("SELECT * FROM districts ORDER BY id ASC");
    res.send(districts.rows);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};

const getdistrictById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await pool.query("SELECT * FROM districts WHERE id=$1", [
      id,
    ]);

    if (!customer.rows.length) {
      return res.status(404).send({ message: "district not found" });
    }

    res.send(customer.rows[0]);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};

// Update
const updatedistrict = async (req, res) => {
  try {
    const { id } = req.params;
    const query = buildUpdateQuery("districts", id, req.body);
    if (!query) return res.status(400).json({ message: "Nothing to update" });

    const updated = await pool.query(query.sql, query.values);
    if (!updated.rows.length) return res.status(404).json({ message: "district not found" });

    res.json({ message: "district updated", data: updated.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Delete
const deletedistrict = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await pool.query(
      `DELETE FROM districts WHERE id=$1 RETURNING *`,
      [id]
    );

    if (!deleted.rows.length)
      return res.status(404).send({ message: "district not found" });

    res.send({ message: "district deleted", data: deleted.rows[0] });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { createdistrict, getdistricts, getdistrictById, updatedistrict, deletedistrict };
