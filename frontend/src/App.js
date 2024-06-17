import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [numberPlate, setNumberPlate] = useState("");
  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/vehicle`, {
        numberPlate,
      });
      setVehicle(response.data);
      setError("");
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("Vehicle not found");
        setVehicle(null);
      } else {
        setError("An error occurred");
        setVehicle(null);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="space-x-5">Vehicle Search</h1>
        <input
          className="text-black text-center w-[30rem] flex justify-center items-center h-10 px-5 border border-gray-500 rounded-lg focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Enter vehicle number plate"
          value={numberPlate}
          onChange={(e) => setNumberPlate(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        {error && <p>{error}</p>}
        {vehicle && (
          <div>
            <h2>Vehicle Details</h2>
            <p>Number Plate: {vehicle.numberPlate}</p>
            <p>Model: {vehicle.Model}</p>
            <p>Color: {vehicle.Color}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
