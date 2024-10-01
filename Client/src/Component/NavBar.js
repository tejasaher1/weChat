// components/Navbar.js
import React from "react";
import style from "../Styles/NavBar.module.css";
import { Outlet, NavLink, useLocation, Link } from "react-router-dom";
import {handleSuccess, handleError } from '../utils'
import {ToastContainer} from 'react-toastify'

function NavBar() {
  const location = useLocation();
  // Determine which route is active

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userData');
    // window.location.href = "/";
    setTimeout(() => {
      handleSuccess('Logged Out Successfully');
    },0)
  }

  return (
    <>
      <nav>
        <div className={style.nav_container}>

          <div className={style.nav_title_wrapper}>
            <NavLink to="" className={style.links}> 
              <h4>weChat</h4>
            </NavLink> 
          </div>

          <div className={style.nav_details}>
            {location.pathname === '/home' ? <Link onClick={handleLogout} to="sign-in" className={style.links}> <h4> Log-Out </h4> </Link> :
            
                                            <>
                                              <Link to="sign-in" className={style.links}> <h4> Sign-In </h4> </Link> 
                                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                              <Link to="registartion" className={style.links}> <h4> Registration </h4></Link>
                                            </>  
            }


 
          </div>
          
        </div>
      </nav>
      <ToastContainer />

      <Outlet />
    </>
  );
}

export default NavBar;




