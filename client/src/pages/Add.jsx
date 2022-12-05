import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const [concert, setConcerts] = useState ({ //concert is the object and setConcerts is the setter method
        artistName: "",
        tourName: "",
        concertDate: ""

    })


    const navigate = useNavigate()
    
    const handleChange = (e) => {
        setConcerts(prev=>({...prev, [e.target.name] : e.target.value}));

    };

    const handleClick = async e => {
        e.preventDefault()
        try { //if it works
            await axios.post("http://localhost:8800/concerts", concert) //input into the database
            navigate("/") //send client back to the concert homepage
        } catch (error) {
            console.log(error)
        }
    }

    console.log(concert)

    return (
        <div className = 'form'>
            <h1> Add New Concert</h1>
            <input type="text" placeholder="Tour Name" onChange={handleChange} name="tourName"/>
            <input type="text" placeholder="Artist Name" onChange={handleChange} name="artistName"/>
            <input type="text" placeholder="Date of Concert (YYYY-MM-DD)" onChange={handleChange} name="concertDate"/>

            <button className="formButton" onClick={handleClick}>Add</button>

        </div>
    )
}

export default Add