const pool = require("../config/db");
const buildUpdateQuery = require("../helpers/buildUpdateQuery.helper");

// Create
const createRegion = async (req, res) => {
  try {
    const { name } = req.body;

    const newRegion = await pool.query(
      `INSERT INTO regions (name) VALUES ($1) RETURNING *`,
      [name]
    );

    res
      .status(201)
      .send({ message: "Region created", data: newRegion.rows[0] });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};

// Get all
const getRegions = async (req, res) => {
  try {
    const regions = await pool.query("SELECT * FROM regions ORDER BY id ASC");
    res.send(regions.rows);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};

const getRegionById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await pool.query("SELECT * FROM regions WHERE id=$1", [
      id,
    ]);

    if (!customer.rows.length) {
      return res.status(404).send({ message: "Region not found" });
    }

    res.send(customer.rows[0]);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};

// Update
const updateRegion = async (req, res) => {
  try {
    const { id } = req.params;
    const query = buildUpdateQuery("regions", id, req.body);
    if (!query) return res.status(400).json({ message: "Nothing to update" });

    const updated = await pool.query(query.sql, query.values);
    if (!updated.rows.length) return res.status(404).json({ message: "Region not found" });

    res.json({ message: "Region updated", data: updated.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// Delete
const deleteRegion = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await pool.query(
      `DELETE FROM regions WHERE id=$1 RETURNING *`,
      [id]
    );

    if (!deleted.rows.length)
      return res.status(404).send({ message: "Region not found" });

    res.send({ message: "Region deleted", data: deleted.rows[0] });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { createRegion, getRegions, getRegionById, updateRegion, deleteRegion };
