import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/concerts")
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Concert Tracker</h1>
          <p>
          Created by SQLovers!
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            {err && err}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
// import {useContext, useState } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../../context/authContext";
// import "./login.scss";


// const Login = () => {

//   const [inputs, setInputs] = useState({
//     username: "",
//     password: ""
//   });

//   const [err, setErr] = useState(null);

//   const handleChange = (e) => {
//     setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const { login } = useContext(AuthContext);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try{
//       await login(inputs);
//     } catch (err) {
//       setErr(err.response.data);
//     }
//   }; //end of const handleLogin



//   return (
//     <div className="login">
//       <div className="card">
//         <div className="left">
//           <h1>Concert Tracker</h1>
//           <p>
//             Created by SQLovers!
//           </p>
//           <span>Don't have an account?</span>
//           <Link to="/register">
//             <button>Register</button>
//           </Link>
//         </div>

//         <div className="right">
//           <h1>Login</h1>
//           <form>
//             <input type="text" placeholder="Username" name="username" onChange={handleChange}/>
//             <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
//             {err && err}
//             <button onClick={handleLogin}>Login</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
