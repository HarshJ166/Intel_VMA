const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const asyncHandler = require("express-async-handler");

connectDb();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Vehicle schema
const vehicleSchema = new mongoose.Schema({
  numberPlate: String,
  Model: String,
  Color: String,
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

// API endpoint to search for a vehicle
app.post(
  `/api/vehicle`,
  asyncHandler(async (req, res) => {
    const numberPlate = req.body.numberPlate;
    console.log(req.body);
    const vehicle = await Vehicle.findOne({
      numberPlate: numberPlate,
    });
    if (vehicle) {
      res.json(vehicle);
    } else {
      res.status(404).json({ message: "Vehicle not found" });
    }
  })
);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
