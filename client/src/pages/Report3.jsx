import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import Topbar from '../components/Topbar'
import { useLocation } from "react-router-dom";
// import "./reportOutput.css";


const Report3 = () => {
    const { currentUser } = useContext(AuthContext);

    const location = useLocation(); //accessing the URL
    const favArtist = location.pathname.split("/")[2];

    const [result, setResults] = useState([])
    useEffect(()=>{
        const fetchAllUsers = async ()=>{ // async function since making api request
            try{
                const res = await axios.get("http://localhost:8800/report3/" + favArtist)
                setResults(res.data[0].age);

            }catch(err){
                console.log(err)
            }
        }

        fetchAllUsers()
    },[favArtist])



  return (
    <>
    <Topbar />
    <div className='reportPage'>
    <h1><u>{currentUser.name}'s Report 3</u></h1>
    <p className='paragraph'>
      Here is the average age of users whose favorite artist is <b>{favArtist}</b>: 
    </p>
 
    <div className='artists'>
   <h3>{result}</h3>

    </div>

    </div>
    </>
  );
}

export default Report3