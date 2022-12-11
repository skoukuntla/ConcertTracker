import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import Topbar from '../components/Topbar'
import { useLocation } from "react-router-dom";
import "./reportOutput.css";



const Report1 = () => {
    const { currentUser } = useContext(AuthContext);

    const username = currentUser.username;

    const location = useLocation(); //accessing the URL

    const tourName = location.pathname.split("/")[2];
    const cityName = location.pathname.split("/")[3];

    const [results, setResults] = useState([])
    useEffect(()=>{
        const fetchAllUsers = async ()=>{ // async function since making api request
            try{
                const res = await axios.get("http://localhost:8800/report1/" + tourName + "/" + cityName + "/" + username)
                setResults(res.data);
                console.log("res" , res)
            }catch(err){
                console.log(err)
            }
        }

        fetchAllUsers()
    },[tourName, cityName, username])


  return (
    <>
    <Topbar />
    <div className='reportPage'>
    <h1><u>{currentUser.name}'s Report 1</u></h1>
    <p className='paragraph'>
      Here are all the users who attended <b>{tourName}</b> in <b>{cityName}</b>:
    </p>
 
    <div>
   
   {results.map(result=>(
        <div className="report1" key={result}>
          <h3>{result.username}</h3>
        </div>    
    ))

    } 
    </div>

    </div>
    </>
  );
}

export default Report1