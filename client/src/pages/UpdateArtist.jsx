import axios from "axios";
import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./update.css";
import Topbar from "../components/Topbar";

const UpdateArtist = () => {
  const [artist, setArtists] = useState({
    //artist is the object and setArtists is the setter method
    artistName: "",
    genre: "",
  });

  const navigate = useNavigate(); //redirecting to another page
  const location = useLocation(); //accessing the URL

  const artistID = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setArtists((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      //if it works
      await axios.put("http://localhost:8800/artists/" + artistID, artist); //input into the database
      navigate("/artists"); //send client back to the artist homepage
    } catch (error) {
      console.log(error);
    }
  };

  console.log(artist);

  return (
    <>
      <Topbar />
      <div className="Update">
        <div className="form">
          <h1> Update Artist Information</h1>
   
          <input
            type="text"
            placeholder="Artist Name"
            onChange={handleChange}
            name="artistName"
          />
          <input
            type="text"
            placeholder="Genre"
            onChange={handleChange}
            name="genre"
          />

          <button className="formButton" onClick={handleClick}>
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateArtist;
