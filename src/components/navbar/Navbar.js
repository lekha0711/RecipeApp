import React,{useContext} from 'react'
import { NavLink } from 'react-router-dom'
import "bootstrap/js/src/collapse.js";
import { loginContext } from '../../contexts/loginContext';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'
function Navbar() {
  let [currentUser,loginErr,userLoginStatus,loginUser,logoutUser]=useContext(loginContext) 
  const navigate=useNavigate()
  
  const activeLink={
    color:"orange",
    fonstSize:"10px",
    fontWeight:"bold",
}
const inactiveLink={
    color:"black",
    fontSize:"15px",
}

  return (
    <div>
       <nav className="navbar navbar-expand-sm bg-light shadow justify-content-around ">
  <div className="container">
    <NavLink className="navbar-brand me-5" to="/"><img src="https://img.restaurantguru.com/rbf7-meals-Yummy-Tummy-2022-07-2.jpgg" width="70" height="60" /></NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-8">
        <li className="nav-item mx-auto">
          <NavLink className="nav-link me-5" to="/" style={({isActive})=>{
            return isActive ? activeLink : inactiveLink;
          }}>Home</NavLink>
        </li>
        <li className="nav-item  mx-auto">
          <NavLink className="nav-link me-5" to="/signup" style={({isActive})=>{
            return isActive ? activeLink :inactiveLink
          }}>Signup</NavLink>
        </li>
        {userLoginStatus? (<li className="nav-item  mx-auto">
          <NavLink className="nav-link me-5" to="/login" style={({isActive})=>{
            return isActive ? activeLink :inactiveLink
          }} onClick={logoutUser}>Logout</NavLink>
        </li>):(<li className="nav-item  mx-auto">
          <NavLink className="nav-link me-5" to="/login" style={({isActive})=>{
            return isActive ? activeLink :inactiveLink
          }}>Login</NavLink>
        </li>
        )}
        {userLoginStatus==true && <li className="nav-item mx-auto">
          <NavLink className="nav-link me-5" to="/user-profile" style={({isActive})=>{
            return isActive ? activeLink : inactiveLink;
          }}>My profile</NavLink>
        </li>}
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar