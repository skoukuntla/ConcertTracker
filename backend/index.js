import express from "express"
import mysql from "mysql"
import cors from "cors"
const app = express() //server


const db = mysql.createConnection({ //create database connection
    host: "localhost",
    user: "root",
    password: "hero243REFR",
    database: "test"
})


app.use(express.json()) // allows us to send json files to server from client
app.use(cors()) // allows front end to access backend (permissions)

app.get("/", (req, res)=>{ //default page : localhost:8800
    res.json("sup senorita")
})

app.get("/concerts", (req,res)=>{ // get all concerts from db
    const getAllConcerts = "SELECT * FROM concerts"
    db.query(getAllConcerts, (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})


app.post("/concerts",(req,res)=>{ // insert concert into db
    const sendConcert = "INSERT INTO concerts(`tourName`, `artistName`, `concertDate`) VALUES (?)"
    const values = [ /*"Lil Nas X", "Montero", "2022-09-11" */
        req.body.tourName, 
        req.body.artistName,
        req.body.concertDate
    ]
    db.query(sendConcert, [values], (err, data)=>{
        if(err) return res.json(err)
        return res.json("Concert has been created successfully.")
    })

})

app.put("/concerts/:concertID", (req, res)=>{ // update specific concert into db
    const concertID = req.params.concertID; // .params is the url and the concertID is what's passed into the url concertID part
    const updateConcertsQuery = "UPDATE concerts SET `tourName` = ?, `artistName` = ?, `concertDate` = ? WHERE concertID = ?";

    const values = [
    req.body.tourName, 
    req.body.artistName,
    req.body.concertDate
    ]

    db.query(updateConcertsQuery,[...values, concertID],(err,data)=>{ //calls everything in values and the concertID
        if(err) return res.json(err)
        return res.json("Concert has been updated successfully.")
    })
}) // which concert do you want to update? pass in concertID

app.delete("/concerts/:concertID", (req, res)=>{ // delete specific concert into db
    const concertID = req.params.concertID; // .params is the url and the concertID is what's passed into the url concertID part
    const deleteConcertsQuery = "DElETE FROM concerts WHERE concertID = ?"
    db.query(deleteConcertsQuery,[concertID],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Concert has been deleted successfully.")
    })
}) // which concert do you want to delete? pass in concertID

app.listen(8800, ()=>{ // connect server to port
    console.log("Connected to Backend!")
})