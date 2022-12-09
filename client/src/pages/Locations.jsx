import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import "./locations.css";
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import Topbar from '../components/Topbar'

const Locations = () => {
    const { currentUser } = useContext(AuthContext);
    console.log("user", currentUser);
    const [locations, setLocations] = useState([])
    useEffect(()=>{
        const fetchAllLocations = async ()=>{ // async function since making api request
            try{
                const res = await axios.get("http://localhost:8800/locations")
                setLocations(res.data);
                console.log(res)
            }catch(err){
                console.log(err)
            }
        }

        fetchAllLocations()
    },[])


    const handleDelete = async (locationID) => {
        try {
            await axios.delete("http://localhost:8800/locations/"+locationID)
            window.location.reload() //refreshes the page automatically
        } catch (error) {
            console.log(error)
        }
    }



  return (
    <>
    <Topbar />
    <div className='locationPage'>
    <h1 className='header'><u>{currentUser.name}'s Locations</u></h1>

 
    <div className ="locations">
    {locations.map(location=>(
        <div className="location" key={location.locationID}>
            <h2>{location.cityName}, {location.stateName}</h2>
            <h3>{location.venueName}, {location.sectionNumber}</h3>
            <p>{location.locationDate}</p>

            <button className="delete" onClick={() => handleDelete(location.locationID)}>Delete</button>
        </div>    
    ))

    }
    </div>
    <button className='addL'><Link to="/addLocation">Add New Location</Link></button>

    </div>
    </>
  );
}

export default Locations