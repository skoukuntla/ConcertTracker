import express from "express"
const app = express() //server

import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import concertRoutes from "./routes/concerts.js"

import { db } from "./connect.js"
import cors from "cors"
import cookieParser from "cookie-parser"

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
  });
  app.use(express.json());
  app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );
  app.use(cookieParser());

  app.use("/backend/users/", userRoutes)
  app.use("/backend/auth/", authRoutes)
  app.use("/backend/concerts/", concertRoutes)

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