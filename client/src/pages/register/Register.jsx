import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";

const Register = () => {

  const navigate = useNavigate()

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    age: "",
    favArtist: ""
  });
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { login } = useContext(AuthContext);
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8800/backend/auth/register", inputs);
      await login(inputs);
      navigate("/home")
    } catch (err) {
      setErr(err.response.data);
    }
  };


  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Concert Tracker</h1>
          <p>
            Created by SQLovers!
          </p>
          <span>Do you already have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            <input
              type="int"
              placeholder="Age"
              name="age"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Your Favorite Artist"
              name="favArtist"
              onChange={handleChange}
            />
            {err && err}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;