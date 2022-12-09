import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./addlocation.css";
import Topbar from '../components/Topbar'

const AddLocation = () => {
  const [location, setLocations] = useState({
    //location is the object and setLocations is the setter method
    cityName: "",
    stateName: "",
    venueName: "",
    sectionNumber: "",
    locationDate: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLocations((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      //if it works
      await axios.post("http://localhost:8800/locations", location); //input into the database
      navigate("/locations"); //send client back to the location homepage
    } catch (error) {
      console.log(error);
    }
  };

  console.log(location);

  return (
    <>
    <Topbar />
    <div className="Add">
      <div className="form">
        <h1> Add New Location</h1>
        <input
          type="text"
          placeholder="City"
          onChange={handleChange}
          name="cityName"
        />
        <input
          type="text"
          placeholder="State"
          onChange={handleChange}
          name="stateName"
        />
        <input
          type="text"
          placeholder="Venue Name"
          onChange={handleChange}
          name="venueName"
        />
        <input
          type="text"
          placeholder="Section Number"
          onChange={handleChange}
          name="sectionNumber"
        />
        <input
          type="date"
          placeholder="Date of Concert"
          onChange={handleChange}
          name="locationDate"
        />

        <button className="formButton" onClick={handleClick}>
          Add
        </button>
      </div>
    </div>
    </>
  );
};

export default AddLocation;