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

    const [query3, setQuery3] = useState({
      favArtist: "",
    });
    
    const handleChange3 = (e) => {
      setQuery3((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
  

    const [query4, setQuery4] = useState({
      date1: "",
      date2: ""
    });
    
    const handleChange4 = (e) => {
      setQuery4((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

  return (
    <>
      <Topbar />
      <div className="reportPage">
        <h1><u>Hi {currentUser.name}! Let's generate a report!</u></h1>
        <div className="reports">
          <div className="report">
          <h3 className="reportHeader">Report 1: Who went to your show?</h3>
            <p>Have you ever wondered which users went to a tour in a specific city? This is a great way of seeing which users are in your area and enjoy the same artist as you!</p>
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
          <h3 className="reportHeader">Report 2: What concerts were held at this venue?</h3>
            <p>Have you ever wondered about what other concerts were ever held at a venue? Just type in the name of the venue and we'll tell you all the concerts our users have been to at this venue!</p>
            <input
            type="text"
            placeholder="Venue Name"
            onChange={handleChange2}
            name="venueName"
          />
            <button className='addR'><Link to={`/report2/${query2.venueName}`}>Generate</Link></button>
          </div> {/* div that is formmating report 2 column */}

          <div className="report">
            <h3 className="reportHeader">Report 3: What is the average age of users with the same favorite artist?</h3>
            <p>Have you ever wondered about the average age of people who have the same favorite artist? Just type in the name of the artist and we'll tell you their fanbase's average age!</p>
            <input
            type="text"
            placeholder="Fav Artist Name"
            onChange={handleChange3}
            name="favArtist"
          />
            <button className='addR'><Link to={`/report3/${query3.favArtist}`}>Generate</Link></button>
          </div> {/* div that is formmating report 3 column */}

          <div className="report">
          <h3 className="reportHeader">Report 4: What concerts did I go to between two dates</h3>
            <p>Have you ever wondered about which concerts you went to during a specific date range? Just type in the two dates and we'll list all the concerts you went to (not excluding your emo phase kek rawr XD)!</p>
            <input
            type="date"
            placeholder="First Date"
            onChange={handleChange4}
            name="date1"
          />
          <input
            type="date"
            placeholder="Second Date"
            onChange={handleChange4}
            name="date2"
          />
          <button className='addR'><Link to={`/report4/${query4.date1}/${query4.date2}`}>Generate</Link></button>
          </div> {/* div that is formmating report 4 column */}

          
        </div> {/* div that is formmating all the columns of reports */}
      </div> {/* div that is formmating whole page except topbar */}
    </>
  );
};

export default Reports;
