import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import Topbar from '../components/Topbar'
import { useLocation } from "react-router-dom";
// import "./reportOutput.css";


const Report2 = () => {
    const { currentUser } = useContext(AuthContext);

    const location = useLocation(); //accessing the URL
    const venueName = location.pathname.split("/")[2];

    const [results, setResults] = useState([])
    useEffect(()=>{
        const fetchAllUsers = async ()=>{ // async function since making api request
            try{
                const res = await axios.get("http://localhost:8800/report2/" + venueName)
                setResults(res.data);
                console.log("res" , res)
            }catch(err){
                console.log(err)
            }
        }

        fetchAllUsers()
    },[venueName])


  return (
    <>
    <Topbar />
    <div className='reportPage'>
    <h1><u>{currentUser.name}'s Report 2</u></h1>
    <p className='paragraph'>
      Here is concert information for the performances that other users attended which happened at <b>{venueName}</b>:
    </p>
 
    <div className='artists'>
   
   {results.map(result=>(
        <div className="artist" key={result}>
          <h2>{result.tourName}</h2>
          <h3>{result.artistName}</h3>
          <p>{result.concertDate}</p>
        </div>    
    ))

    } 
    </div>

    </div>
    </>
  );
}

export default Report2