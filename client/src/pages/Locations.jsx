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

    const username = currentUser.username;

    console.log("user", currentUser);
    const [locations, setLocations] = useState([])
    useEffect(()=>{
        const fetchAllLocations = async ()=>{ // async function since making api request
            try{
                const res = await axios.get("http://localhost:8800/locations/" + username)
                setLocations(res.data);
                console.log(res)
            }catch(err){
                console.log(err)
            }
        }

        fetchAllLocations()
    },[username])


    // const handleDelete = async (location) => {
    //     try {
       
    //     const city = {
    //         cityName: location.city,
    //         stateName: location.state,
    //         date: location.date
    //     }

    //     const venue = {
    //         venueName: location.venue,
    //         sectionNumber: location.sectionNumber,
    //         date: location.date
    //     }
   
    //     console.log(city)
    //     console.log(venue)

    //     await axios.delete("http://localhost:8800/city/"+location.city+"/"+location.state+"/"+location.date)
    //     await axios.delete("http://localhost:8800/venue"+location.venue+"/"+location.sectionNumber+"/"+location.date)
    //    // window.location.reload() //refreshes the page automatically
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }



  return (
    <>
    <Topbar />
    <div className='locationPage'>
    <h1 className='header'><u>{currentUser.name}'s Locations</u></h1>

 
    <div className ="locations">
    {locations.map(location=>(
        <div className="location" key={location}>
            <h2>{location.city}, {location.state}</h2>
            <h3>{location.venue}, {location.sectionNumber}</h3>
            <p>{location.date}</p>

            {/* <button className="delete" onClick={() => handleDelete(location)}>Delete</button> */}
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