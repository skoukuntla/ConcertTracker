import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
export default function Logout() {
    const {currentUser} = useContext(AuthContext);
    currentUser.authenticated=false;
    window.location.href = "/login"
}