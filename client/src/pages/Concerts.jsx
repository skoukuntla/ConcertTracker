import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import "./concerts.css";
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import Topbar from '../components/Topbar'

const Concerts = () => {
    const { currentUser } = useContext(AuthContext);
    console.log("user", currentUser);
    const [concerts, setConcerts] = useState([])
    useEffect(()=>{
        const fetchAllConcerts = async ()=>{ // async function since making api request
            try{
                const res = await axios.get("http://localhost:8800/concerts")
                setConcerts(res.data);
                console.log(res)
            }catch(err){
                console.log(err)
            }
        }

        fetchAllConcerts()
    },[])


    const handleDelete = async (concertID) => {
        try {
            await axios.delete("http://localhost:8800/concerts/"+concertID)
            window.location.reload() //refreshes the page automatically
        } catch (error) {
            console.log(error)
        }
    }



  return (
    <>
    <Topbar />
    <div className='concertPage'>
    <h1 className='header'><u>{currentUser.name}'s Concerts</u></h1>

 
    <div className ="concerts">
    {concerts.map(concert=>(
        <div className="concert" key={concert.concertID}>
            <h2>{concert.tourName}</h2>
            <h3>{concert.artistName}</h3>
            <p>{concert.concertDate}</p>

            <button className="delete" onClick={() => handleDelete(concert.concertID)}>Delete</button>
            <button className="update"><Link to={`/update/${concert.concertID}`}>Update</Link></button>

        </div>    
    ))

    }
    </div>
    <button className='addC'><Link to="/add">Add New Concert</Link></button>

    </div>
    </>
  );
}

export default Concerts