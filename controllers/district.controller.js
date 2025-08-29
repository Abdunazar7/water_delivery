const pool = require("../config/db");

// Create
const createDistrict = async (req, res) => {
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
const getDistricts = async (req, res) => {
  try {
    const districts = await pool.query(
      "SELECT * FROM districts ORDER BY id ASC"
    );
    res.send(districts.rows);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};

// Get one
const getDistrictById = async (req, res) => {
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
const updateDistrict = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const result = await pool.query(
      `UPDATE districts
       SET name=$1
       WHERE id=$2
       RETURNING *`,
      [name, id]
    );

    if (!result.rows.length)
      return res.status(404).json({ message: "District not found" });

    res.json({ message: "District updated", data: result.rows[0] });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Delete
const deleteDistrict = async (req, res) => {
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

module.exports = {
  createDistrict,
  getDistricts,
  getDistrictById,
  updateDistrict,
  deleteDistrict,
};
