import axios from "axios";
import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./update.css";
import Topbar from "../components/Topbar";

const Update = () => {
  const [concert, setConcerts] = useState({
    //concert is the object and setConcerts is the setter method
    tourName: "",
    artistName: "",
    concertDate: "",
  });

  const navigate = useNavigate(); //redirecting to another page
  const location = useLocation(); //accessing the URL

  const concertID = location.pathname.split("/")[2];
  console.log("this is concertID " + concertID);

  const handleChange = (e) => {
    setConcerts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      //if it works
      await axios.put("http://localhost:8800/concerts/" + concertID, concert); //input into the database
      navigate("/concerts"); //send client back to the concert homepage
    } catch (error) {
      console.log(error);
    }
  };

  console.log(concert);

  return (
    <>
      <Topbar />
      <div className="Update">
        <div className="form">
          <h1> Update Concert Information</h1>
          <input
            type="text"
            placeholder="Tour Name"
            onChange={handleChange}
            name="tourName"
          />
          <input
            type="text"
            placeholder="Artist Name"
            onChange={handleChange}
            name="artistName"
          />
          <input
            type="date"
            placeholder="Date of Concert (YYYY-MM-DD)"
            onChange={handleChange}
            name="concertDate"
          />

          <button className="formButton" onClick={handleClick}>
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default Update;
