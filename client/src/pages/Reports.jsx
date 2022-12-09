import React from "react";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "./reports.css";
import Topbar from "../components/Topbar";

const Reports = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      <Topbar />
      <div className="reportPage">
        <h1><u>Hi {currentUser.name}! Let's generate a report!</u></h1>
        <div className="reports">
          <div className="report">
          <h3>Report 1</h3>
            <p> Descrption report 1</p>
            <button className='addR'><Link to="/report1">Generate</Link></button>
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
