import "./topbar.css";
import { Link } from "react-router-dom";
import React from "react";

export default function Topbar() {
	return (
			<>
		<div className="topbarContainer">
			<div className="topbarLeft">
				<Link to="/home" style={{ textDecoration: "none" }}>
					<span className="home">Concert Tracker</span>
				</Link>
				<Link to="/concerts" style={{ textDecoration: "none" }}>
					<span className="link">My Concerts</span>
				</Link>
				<Link to="/locations" style={{ textDecoration: "none" }}>
					<span className="link">My Locations</span>
				</Link>
				<Link to="/artists" style={{ textDecoration: "none" }}>
					<span className="link">My Artists</span>
				</Link>
				<Link to="/reports" style={{ textDecoration: "none" }}>
					<span className="link">My Reports</span>
				</Link>
			</div>


			<div className="topbarRight">

				<Link to="/logout" style={{ textDecoration: "none" }} role="button">
					<span className="logoutbutton">Logout</span>
				</Link>

			</div>
		</div>
		</>
	);
}