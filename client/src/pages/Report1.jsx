import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'
// import "./report1s.css";
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import Topbar from '../components/Topbar'
import { useLocation } from "react-router-dom";


const Report1 = () => {
    const { currentUser } = useContext(AuthContext);

    const username = currentUser.username;

    const location = useLocation(); //accessing the URL

    const tourName = location.pathname.split("/")[2];
    const cityName = location.pathname.split("/")[3];

    console.log("user", currentUser);
    const [results, setResults] = useState([])
    useEffect(()=>{
        const fetchAllUsers = async ()=>{ // async function since making api request
            try{
                const res = await axios.get("http://localhost:8800/report1/" + tourName + "/" + cityName, username)
                setResults(res.data);
                console.log(res)
            }catch(err){
                console.log(err)
            }
        }

        fetchAllUsers()
    },[tourName, cityName, username])


  return (
    <>
    <Topbar />
    <div className='report1Page'>
    <h1 className='header'><u>{currentUser.name}'s Report 1</u></h1>

 
    <div className ="report1s">
    {results.map(result=>(
        <div className="report1" key={result}>
          <h3>{result.tourName}</h3>
        </div>    
    ))

    }
    </div>

    </div>
    </>
  );
}

export default Report1