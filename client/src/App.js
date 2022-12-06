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
/*import { AuthContext } from "./context/authContext";
import { useContext } from "react";*/



function App() {
  //const { currentUser } = useContext(AuthContext);
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
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
