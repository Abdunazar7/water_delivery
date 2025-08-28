const pool = require("../config/db");
const buildUpdateQuery = require("../helpers/buildUpdateQuery.helper");

const createDeliveryStaff = async (req, res) => {
  try {
    const { name, phone, vehicle_number, district_id } = req.body;

    const result = await pool.query(
      `
      INSERT INTO delivery_staff (name, phone, vehicle_number, district_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [name, phone, vehicle_number, district_id]
    );

    res.status(201).json({
      message: "Delivery staff created",
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const getDeliveryStaff = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT ds.*, d.name as district_name
       FROM delivery_staff ds
       LEFT JOIN districts d ON ds.district_id = d.id`
    );

    res.json({ data: result.rows });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const getDeliveryStaffById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT ds.*, d.name as district_name
       FROM delivery_staff ds
       LEFT JOIN districts d ON ds.district_id = d.id
       WHERE ds.id=$1`,
      [id]
    );

    if (!result.rows.length) return res.status(404).json({ message: "Staff not found" });

    res.json({ data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const patchDeliveryStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const fields = req.body;

    const query = buildUpdateQuery("delivery_staff", id, fields);
    if (!query) return res.status(400).json({ message: "Nothing to update" });

    const updated = await pool.query(query.sql, query.values);
    if (!updated.rows.length) return res.status(404).json({ message: "Staff not found" });

    res.json({ message: "Staff updated", data: updated.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const deleteDeliveryStaff = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM delivery_staff WHERE id=$1 RETURNING *`,
      [id]
    );

    if (!result.rows.length) return res.status(404).json({ message: "Staff not found" });

    res.json({ message: "Staff deleted", data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  createDeliveryStaff,
  getDeliveryStaff,
  getDeliveryStaffById,
  patchDeliveryStaff,
  deleteDeliveryStaff,
};
