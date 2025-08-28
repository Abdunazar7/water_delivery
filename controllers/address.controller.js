const pool = require("../config/db");
const DeviceDetector = require('node-device-detector');
const DeviceHelper = require('node-device-detector/helper');
const detector = new DeviceDetector({
  clientIndexes: true,
  deviceIndexes: true,
  osIndexes: true,
  deviceAliasCode: false,
  deviceTrusted: false,
  deviceInfo: false,
  maxUserAgentSize: 500,
});

// Create
const createAddress = async (req, res) => {
  try {
    const { name, address, location, customer_id, district_id } = req.body;

    const newAddress = await pool.query(
      `INSERT INTO address (name, address, location, customer_id, district_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, address, location, customer_id, district_id]
    );

    res
      .status(201)
      .send({ message: "Address created", data: newAddress.rows[0] });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};

// Get all
const getAddresses = async (req, res) => {
  try {

    const userAgent = req.headers["user-agent"];
    console.log(userAgent);
    const result = detector.detect(userAgent)
    console.log(result);
    
    console.log(DeviceHelper.isIOS(result));
    console.log(DeviceHelper.isMobile(result));
    console.log(DeviceHelper.isBrowser(result));
    console.log(DeviceHelper.isDesktop(result));
    
    const addresses = await pool.query(
      "SELECT * FROM address ORDER BY id ASC"
    );
    res.send(addresses.rows);

  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};

const getAddressById = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await pool.query("SELECT * FROM address WHERE id=$1", [
      id,
    ]);

    if (!address.rows.length) {
      return res.status(404).send({ message: "Address not found" });
    }

    res.send(address.rows[0]);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};

// Update
const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, address, location, customer_id, district_id } = req.body;

    const updatedAddress = await pool.query(
      `
      UPDATE customers set (name, address, location, customer_id, district_d)
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING *
      `,
      [name, address, location, customer_id, district_id]
    );
    res.status(201).send({
      message: "Address updated",
      data: updatedAddress.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error });
  }
};

// Delete
const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await pool.query(
      `DELETE FROM address WHERE id=$1`,
      [id]
    );

    if (!deleted.rows.length)
      return res.status(404).send({ message: "Address not found" });

    res.send({ message: "Address deleted", data: deleted.rows[0] });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { createAddress, getAddresses, getAddressById, updateAddress, deleteAddress };