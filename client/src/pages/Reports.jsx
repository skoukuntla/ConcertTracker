import React from "react";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "./reports.css";
import Topbar from "../components/Topbar";
import { useState } from "react";

const Reports = () => {
  const { currentUser } = useContext(AuthContext);

  //stores input from report 1's fields
  const [query1, setQuery1] = useState({
    tourName: "",
    city: ""
  });

  const handleChange1 = (e) => {
    setQuery1((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

    //stores input from report 2's fields
    const [query2, setQuery2] = useState({
      venueName: "",
    });
    
    const handleChange2 = (e) => {
      setQuery2((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
            onChange={handleChange1}
            name="tourName"
          />
          <input
            type="text"
            placeholder="City"
            onChange={handleChange1}
            name="city"
          />
            <button className='addR'><Link to={`/report1/${query1.tourName}/${query1.city}`}>Generate</Link></button>
            {/* <button className="update"><Link to={`/updateArtist/${artist.artistID}`}>Update</Link></button> */}

          </div> {/* div that is formmating report 1 column */}

          <div className="report">
          <h3>Report 2: What concerts were held at this venue?</h3>
            <p>Have you ever wondered about what other concerts where ever held at a venue? Just type in the name of the venue and we'll tell you all the concerts our users have been to at this venue!</p>
            <input
            type="text"
            placeholder="Venue Name"
            onChange={handleChange2}
            name="venueName"
          />
            <button className='addR'><Link to={`/report2/${query2.venueName}`}>Generate</Link></button>
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
