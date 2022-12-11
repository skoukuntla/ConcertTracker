import React from "react";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "./reports.css";
import Topbar from "../components/Topbar";
import { useState } from "react";

const Reports = () => {
  const { currentUser } = useContext(AuthContext);

  const [query, setQuery] = useState({
    //concert is the object and setConcerts is the setter method
    tourName: "",
    city: ""
  });

  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  return (
    <>
      <Topbar />
      <div className="reportPage">
        <h1><u>Hi {currentUser.name}! Let's generate a report!</u></h1>
        <div className="reports">
          <div className="report">
          <h3>Report 1: Who went to your show?</h3>
            <p>Do you want to know the other users who went to the same tour in the same city as you? This is a great way of meeting new users who are in your area and enjoy the same artist as you!</p>
            <input
            type="text"
            placeholder="Tour Name"
            onChange={handleChange}
            name="tourName"
          />
          <input
            type="text"
            placeholder="City"
            onChange={handleChange}
            name="city"
          />
            <button className='addR'><Link to={`/report1/${query.tourName}/${query.city}`}>Generate</Link></button>
            {/* <button className="update"><Link to={`/updateArtist/${artist.artistID}`}>Update</Link></button> */}

          </div> {/* div that is formmating report 1 column */}

          <div className="report">
          <h3>Report 2</h3>
            <p> Descrption report 2</p>
            <button className='addR'><Link to="/report2">Generate</Link></button>
          </div> {/* div that is formmating report 2 column */}

          <div className="report">
            <h3>Report 3</h3>
            <p> Descrption report 3</p>
            <button className='addR'><Link to="/report3">Generate</Link></button>
          </div> {/* div that is formmating report 3 column */}

          <div className="report">
          <h3>Report 4</h3>
            <p> Descrption report 4</p>
            <button className='addR'><Link to="/report4">Generate</Link></button>
          </div> {/* div that is formmating report 4 column */}

          
        </div> {/* div that is formmating all the columns of reports */}
      </div> {/* div that is formmating whole page except topbar */}
    </>
  );
};

export default Reports;
