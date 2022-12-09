import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import "./artists.css";
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import Topbar from '../components/Topbar'

const Artists = () => {
    const { currentUser } = useContext(AuthContext);

    const username = currentUser.username;

    console.log("user", currentUser);
    const [artists, setArtists] = useState([])
    useEffect(()=>{
        const fetchAllArtists = async ()=>{ // async function since making api request
            try{
                const res = await axios.get("http://localhost:8800/artists/" + username)
                setArtists(res.data);
                console.log(res)
            }catch(err){
                console.log(err)
            }
        }

        fetchAllArtists()
    },[username])


    const handleDelete = async (artistID) => {
        try {
            await axios.delete("http://localhost:8800/artists/"+artistID)
            window.location.reload() //refreshes the page automatically
        } catch (error) {
            console.log(error)
        }
    }



  return (
    <>
    <Topbar />
    <div className='artistPage'>
    <h1 className='header'><u>{currentUser.name}'s Artists</u></h1>

 
    <div className ="artists">
    {artists.map(artist=>(
        <div className="artist" key={artist.artistID}>
            <h3>{artist.artistName}</h3>
            <p>{artist.genre}</p>

            <button className="delete" onClick={() => handleDelete(artist.artistID)}>Delete</button>
            <button className="update"><Link to={`/updateArtist/${artist.artistID}`}>Update</Link></button>

        </div>    
    ))

    }
    </div>
    <button className='addA'><Link to="/addArtist">Add New Artist</Link></button>

    </div>
    </>
  );
}

export default Artists