import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./addlocation.css";
import Topbar from '../components/Topbar';
import { AuthContext } from "../context/authContext";
import { useContext } from "react";

const AddLocation = () => {
  const { currentUser } = useContext(AuthContext);


  const [city, setCity] = useState({
    //location is the object and setLocations is the setter method
    cityName: "",
    stateName: "",
    date: "",
    username:currentUser.username
  });

  const [venue, setVenue] = useState({
    //location is the object and setLocations is the setter method
    venueName: "",
    sectionNumber: "",
    date: "",
    username:currentUser.username
  });


  const navigate = useNavigate();

  const handleChange = (e) => {
    setCity((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setVenue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/addCity", city); //input city into the database
      await axios.post("http://localhost:8800/addVenue", venue); //input venue into the database
      navigate("/locations"); //send client back to the location homepage
    } catch (error) {
      console.log(error);
    }
  };

  

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
          name="date"
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