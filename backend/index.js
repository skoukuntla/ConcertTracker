import express from "express"
const app = express() //server

import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import concertRoutes from "./routes/concerts.js"

import { db } from "./connect.js"
import cors from "cors"
import cookieParser from "cookie-parser";


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

//START ORM

//"SELECT * FROM concerts WHERE username = ?"
app.get("/concerts1/:username", (req, res) => {
    const username = req.params.username;
    concerts.findAll({ where: {username: username }})
    .then((concertsNewR) => {
        res.send(concertsNewR);
    }).catch((err) => {

    if (err) {
        console.log(err);
    }
    });
});

//"INSERT INTO concerts(`tourName`, `artistName`, `concertDate`, `username`) VALUES (?)"
app.post("/concerts1", (req, res) => {
    concerts.create({
        tourName: req.body.tourName,
        artistName: req.body.artistName,
        concertDate: req.body.concertDate,
        username: req.body.username
    }).catch((err) => {
        if (err) {
        console.log(err);
    }
}); 
    res.send("insert");
});



//"DELETE FROM concerts WHERE concertID = ?"
app.get("/concerts1/:concertID", (req, res) => { // delete specific concert into db
    const concertID = req.params.concertID; //// .params is the url and the concertID is what's passed into the url concertID part
    concerts.destroy({ where: {city: concertID }});
    res.send("delete")
}); // which concert do you want to delete? pass in concertID
  

//INSERT INTO artists(`artistName`, `genre`, `username`) VALUES (?)
app.post("/addArtist1", (req, res) => {
    artists.create({
        artistName: req.body.artistName,
        genre: req.body.genre,
        username: req.body.username
    }).catch((err) => {
        if (err) {
        console.log(err);
    }
});
    
    res.send("insert Artists");
});


//"SELECT * FROM artists WHERE username = ?"
app.get("/artists1/:username", (req, res) => {
    const username = req.params.username;
    artistsNew.findAll({ where: {city: username }})
    .then((artistsNew) => {
        res.send(artistsNew);
    }).catch((err) => {
    if (err) {
        console.log(err);
    }
    });
});


//DELETE FROM artists WHERE artistID = ?
app.get("/artists1/:artistID", (req, res) => { // delete specific artist into db
    const artistID = req.params.artistID;
    citynew.destroy({ where: {city: artistID }});
    res.send("delete")
}); // which concert do you want to delete? pass in concertID


app.delete("/artists1/:artistID", (req, res)=>{ // delete specific concert into db
    const artistID = req.params.artistID; // .params is the url and the concertID is what's passed into the url concertID part
    const deleteArtistsQuery = "DElETE FROM artists WHERE artistID = ?"
    db.query(deleteArtistsQuery,[artistID],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Artist has been deleted successfully.")
    })
}); // which concert do you want to delete? pass in concertID


//"INSERT INTO city(`date`, `city`,`state`, `username`) VALUES (?)"
app.post("/addCity1", (req, res) => {
    citynew.create({
        date: req.body.date, 
        city: req.body.cityName,
        state: req.body.stateName,
        username: req.body.username
    }).catch((err) => {
        if (err) {
        console.log(err);
        }
});
res.send("insert Cities");
});


app.post("/venue1/:venueName/:sectionNumber/:date", (req, res) => {
    citynew.create({
        venue: req.params.venueName, 
        sectionNumber: req.params.sectionNumber,
        date: req.params.date
    }).catch((err) => {
        if (err) {
            console.log(err);
        }
})
res.send("insert Venue");
});


//INSERT INTO venue(`date`, `venue`,`sectionNumber`, `username`) VALUES (?)
app.post("/addVenue1", (req, res) => {
    citynew.create({
        date: req.body.date,
        venue: req.body.venueName,
        sectionNumber: req.body.sectionNumber,
        username: req.body.username
    }).catch((err) => {
        if (err) {
        console.log(err);
    }
});
res.send("insert Venue");
});


app.get("/locations1/:username", (req,res)=>{ // get all concerts from db
    const username = req.params.username;
    const getAllLocations = "SELECT * from city c1, venue v1 where c1.date = v1.date AND c1.username = ? AND (v1.username = c1.username)"
    db.query(getAllLocations, [username], (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
});

//END OF ORM

// PREPARED STATEMENT UPDATES
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

app.put("/artists/:artistID", (req, res)=>{ // update specific artist in db
    const artistID = req.params.artistID; // .params is the url and the concertID is what's passed into the url concertID part
    const updateArtistsQuery = "UPDATE artists SET `artistName` = ?, `genre` = ? WHERE artistID = ?";

    const values = [
    req.body.artistName, 
    req.body.genre,
    ]

    db.query(updateArtistsQuery,[...values, artistID],(err,data)=>{ 
        if(err) return res.json(err)
        return res.json("Artist has been updated successfully.")
    })
}) // which artist do you want to update? pass in artistID

// PREPARED STATEMENT QUERIES FOR REPORTS
app.get("/report1/:tourName/:cityName/:username", (req,res)=>{ // get all concerts from db

    const values = [ /*"Lil Nas X", "Montero", "2022-09-11" */
    req.params.cityName, //cityName
    req.params.tourName, //tourName
    req.params.username  //username  
]

    //console.log("values" , values);

    const getAllUsers = "SELECT DISTINCT (con.username) FROM concerts con, city c1 WHERE con.concertDate = c1.date AND c1.city = ? AND con.tourName = ? AND con.username != ?";
    db.query(getAllUsers, [ 
    req.params.cityName, //cityName
    req.params.tourName, //tourName
    req.params.username  //username  
], (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/report2/:venueName", (req,res)=>{

    const getCountUsers = "SELECT DISTINCT con.concertID, con.username, con.tourName, con.artistName, DATE_FORMAT(con.concertDate, '%m-%d-%Y') AS concertDate FROM concerts con, venue v1 WHERE con.concertDate = v1.date AND v1.venue = ? ORDER BY concertDate";
    //SELECT DATE_FORMAT(concertDate, '%m-%d-%Y')  as concertDate, tourName, artistNam
    db.query(getCountUsers, [req.params.venueName], (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/report3/:favArtist", (req,res)=>{ 

    const getCountUsers = "SELECT t1.age FROM (SELECT favArtist, avg(age) AS age FROM users GROUP BY favArtist) as t1 WHERE t1.favArtist= ?";
    db.query(getCountUsers, [req.params.favArtist], (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/report4/:date1/:date2/:username", (req,res)=>{ 

    const getConcerts = "SELECT con.tourName, con.artistName FROM concerts con WHERE con.concertDate >= ? AND con.concertDate <= ? AND con.username = ?";
    db.query(getConcerts, [req.params.date1, req.params.date2, req.params.username], (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})


// end of reports


// concerts api calls
app.get("/concerts/:username", (req,res)=>{ // get all concerts from db
    const username = req.params.username;
    const getAllConcerts = "SELECT DATE_FORMAT(concertDate, '%m-%d-%Y')  as concertDate, tourName, artistName, concertID,username FROM concerts WHERE username = ?"
    db.query(getAllConcerts, [username], (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})



app.post("/concerts",(req,res)=>{ // insert concert into db
    const sendConcert = "INSERT INTO concerts(`tourName`, `artistName`, `concertDate`, `username`) VALUES (?)"
    const values = [ /*"Lil Nas X", "Montero", "2022-09-11" */
        req.body.tourName, 
        req.body.artistName,
        req.body.concertDate,
        req.body.username
    ]
    db.query(sendConcert, [values], (err, data)=>{
        if(err) return res.json(err)
        return res.json("Concert has been created successfully.")
    })

})



app.delete("/concerts/:concertID", (req, res)=>{ // delete specific concert into db
    const concertID = req.params.concertID; // .params is the url and the concertID is what's passed into the url concertID part
    const deleteConcertsQuery = "DElETE FROM concerts WHERE concertID = ?"
    db.query(deleteConcertsQuery,[concertID],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Concert has been deleted successfully.")
    })
}) // which concert do you want to delete? pass in concertID



// artists api calls
app.post("/addArtist",(req,res)=>{ // insert concert into db

    const sendArtist = "INSERT INTO artists(`artistName`, `genre`, `username`) VALUES (?)"
    const values = [ /*"Lil Nas X", "Montero", "2022-09-11" */
        req.body.artistName, 
        req.body.genre,
        req.body.username
    ]
    db.query(sendArtist, [values], (err, data)=>{
        if(err) return res.json(err)
        return res.json("Concert has been created successfully.")
    })

})


app.get("/artists/:username", (req,res)=>{ // get all artists from db
    const username = req.params.username;
    const getAllArtists = "SELECT * FROM artists WHERE username = ?"
    db.query(getAllArtists, [username], (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})


app.delete("/artists/:artistID", (req, res)=>{ // delete specific concert into db
    const artistID = req.params.artistID; // .params is the url and the concertID is what's passed into the url concertID part
    const deleteArtistsQuery = "DElETE FROM artists WHERE artistID = ?"
    db.query(deleteArtistsQuery,[artistID],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Artist has been deleted successfully.")
    })
}) // which concert do you want to delete? pass in concertID


// locations api calls

// insert city into db
app.post("/addCity",(req,res)=>{ // insert concert into db

    const sendCity = "INSERT INTO city(`date`, `city`,`state`, `username`) VALUES (?)"
    const values = [ /*"Lil Nas X", "Montero", "2022-09-11" */
        req.body.date, 
        req.body.cityName,
        req.body.stateName,
        req.body.username
    ]
    db.query(sendCity, [values], (err, data)=>{
        if(err) return res.json(err)
        return res.json("city has been created successfully.")
    })

})


app.delete("/city/:cityName/:stateName/:date", (req, res)=>{ // delete specific concert into db
    
    const values = [
        req.params.cityName, 
        req.params.stateName,
        req.params.date
        ]

    console.log(values)
    const deleteCityQuery = "DElETE FROM city WHERE city = ? AND state = ? AND date = ?"
    db.query(deleteCityQuery,[...values],(err,data)=>{ 
        if(err) return res.json(err)
        return res.json("Artist has been deleted successfully.")
    })

}) 


app.delete("/venue/:venueName/:sectionNumber/:date", (req, res)=>{ // delete specific concert into db
  
    const values = [
        req.params.venueName, 
        req.params.sectionNumber,
        req.params.date
        ]

    console.log(values)
    const deleteVenueQuery = "DElETE FROM venue WHERE venue = ? AND sectionNumber = ? AND date = ?"
    db.query(deleteVenueQuery,[...values],(err,data)=>{ 
        if(err) return res.json(err)
        return res.json("Venue has been deleted successfully.")
    })
  
}) 


// insert venue into db
app.post("/addVenue",(req,res)=>{ // insert concert into db

    const sendVenue = "INSERT INTO venue(`date`, `venue`,`sectionNumber`, `username`) VALUES (?)"
    const values = [ /*"Lil Nas X", "Montero", "2022-09-11" */
        req.body.date,    
        req.body.venueName, 
        req.body.sectionNumber,
        req.body.username
    ]
    db.query(sendVenue, [values], (err, data)=>{
        if(err) return res.json(err)
        return res.json("Venue has been created successfully.")
    })

})


app.get("/locations/:username", (req,res)=>{ // get all concerts from db
    const username = req.params.username;
    const getAllLocations = "SELECT DATE_FORMAT(c1.date, '%m-%d-%Y') as date, c1.city, c1.state, v1.venue, v1.sectionNumber from city c1, venue v1 where c1.date = v1.date AND c1.username = ? AND (v1.username = c1.username)"
    db.query(getAllLocations, [username], (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})



app.listen(8800, ()=>{ // connect server to port
    console.log("Connected to Backend!")
})


