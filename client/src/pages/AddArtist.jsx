import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./addartist.css";
import Topbar from '../components/Topbar'

const AddArtist = () => {
  const [artist, setArtists] = useState({
    //artist is the object and setArtists is the setter method
    artistName: "",
    genre: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setArtists((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      //if it works
      await axios.post("http://localhost:8800/artists", artist); //input into the database
      navigate("/artists"); //send client back to the artist homepage
    } catch (error) {
      console.log(error);
    }
  };

  console.log(artist);

  return (
    <>
    <Topbar />
    <div className="Add">
      <div className="form">
        <h1> Add New Artist</h1>
        <input
          type="text"
          placeholder="Artist Name"
          onChange={handleChange}
          name="artistName"
        />
        <input
          type="text"
          placeholder="Artist Genre"
          onChange={handleChange}
          name="genre"
        />

        <button className="formButton" onClick={handleClick}>
          Add
        </button>
      </div>
    </div>
    </>
  );
};

export default AddArtist;
