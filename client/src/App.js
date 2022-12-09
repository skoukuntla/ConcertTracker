import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Add from "./pages/Add";
import Concerts from "./pages/Concerts";
import Update from "./pages/Update";
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import Logout from "./pages/logout/Logout"
import Home from "./pages/home/Home"
import Artists from "./pages/Artists";
import Locations from "./pages/Locations";
import AddArtist from "./pages/AddArtist";
import AddLocation from "./pages/AddLocation";
import Reports from "./pages/Reports";
import Report1 from "./pages/Report1";
import Report2 from "./pages/Report2";
import Report3 from "./pages/Report3";
import Report4 from "./pages/Report4";
import UpdateArtist from "./pages/UpdateArtist";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path ="/concerts" element={<Concerts/>}/>
        <Route path ="/add" element={<Add/>}/>
        <Route path ="/update/:concertID" element={<Update/>}/>
        <Route path ="/logout" element={<Logout/>}/>
        <Route path ="/home" element={<Home/>}/>
        <Route path ="/artists" element={<Artists/>}/>
        <Route path ="/locations" element={<Locations/>}/>
        <Route path ="/addArtist" element={<AddArtist/>}/>
        <Route path ="/updateArtist/:artistID" element={<UpdateArtist/>}/>
        <Route path ="/addLocation" element={<AddLocation/>}/>
        <Route path ="/reports" element={<Reports/>}/>
        <Route path ="/report1" element={<Report1/>}/>
        <Route path ="/report2" element={<Report2/>}/>
        <Route path ="/report3" element={<Report3/>}/>
        <Route path ="/report4" element={<Report4/>}/>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
