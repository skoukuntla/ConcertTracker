import React from "react";
import { AuthContext } from "../../context/authContext";
import { useContext } from 'react';
import { Link } from 'react-router-dom'
import "./home.css";
import Topbar from '../../components/Topbar'


const Home = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
    <Topbar />
    <div className="Home">
      <h1>Welcome {currentUser.name}!</h1>
      <h3>
      <Link to="/concerts">My Concerts</Link>
      </h3>
      <h3>
      <Link to="/locations">My Locations</Link>
      </h3>
      <h3>
      <Link to="/artists">My Artists</Link>
      </h3>
      <h3>
      <Link to="/reports">Generate Reports</Link>
      </h3>
    </div>
    </>
  );
};

export default Home;
