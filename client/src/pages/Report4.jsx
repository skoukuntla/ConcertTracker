import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import Topbar from '../components/Topbar'
import { useLocation } from "react-router-dom";
import "./reportOutput.css";



const Report4 = () => {
    const { currentUser } = useContext(AuthContext);

    const username = currentUser.username;

    const location = useLocation(); //accessing the URL

    const date1 = location.pathname.split("/")[2];
    const date2 = location.pathname.split("/")[3];

    const [results, setResults] = useState([])
    useEffect(()=>{
        const fetchAllUsers = async ()=>{ // async function since making api request
            try{
                const res = await axios.get("http://localhost:8800/report4/" + date1 + "/" + date2 + "/" + username)
                setResults(res.data);
                console.log("res" , res)
            }catch(err){
                console.log(err)
            }
        }

        fetchAllUsers()
    },[date1, date2, username])


  return (
    <>
    <Topbar />
    <div className='reportPage'>
    <h1><u>{currentUser.name}'s Report 4</u></h1>
    <p className='paragraph'>
      Here are all the concerts that you attended between <b>{date1}</b> and <b>{date2}</b>!
    </p>
 
    <div className='artists'>
   
   {results.map(result=>(
        <div className="artist" key={result}>
          <h2>{result.tourName} ({result.artistName})</h2>
        </div>    
    ))

    } 
    </div>

    </div>
    </>
  );
}

export default Report4