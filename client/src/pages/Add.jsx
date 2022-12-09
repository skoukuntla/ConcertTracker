import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./add.css";
import Topbar from '../components/Topbar'
import { AuthContext } from "../context/authContext";
import { useContext } from "react";

const Add = () => {
  const { currentUser } = useContext(AuthContext);
  const [concert, setConcerts] = useState({
    //concert is the object and setConcerts is the setter method
    artistName: "",
    tourName: "",
    concertDate: "",
    username: currentUser.username
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setConcerts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      //if it works
      await axios.post("http://localhost:8800/concerts", concert); //input into the database
      navigate("/concerts"); //send client back to the concert homepage
    } catch (error) {
      console.log(error);
    }
  };

  console.log(concert);

  return (
    <>
    <Topbar />
    <div className="Add">
      <div className="form">
        <h1> Add New Concert</h1>
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
          Add
        </button>
      </div>
    </div>
    </>
  );
};

export default Add;
