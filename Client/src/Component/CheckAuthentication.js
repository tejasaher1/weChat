import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";

function CheckAuthentication({ setIsAuthenticated }) {

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {

      if (localStorage.getItem("jwtToken")) {

        const fetchData = async () => {
          try{
            const headers = {
              headers: {
                'authorization' : localStorage.getItem('jwtToken')
              }
            }
            const responce = await Axios.get('http://localhost:8000/isAuthenticatedCheck', headers);
            if(responce.data.success){
              setIsAuthenticated(true);
              if(location.pathname === '/' || location.pathname ==='/registartion' || location.pathname === '/sign-in'){
                  navigate('/home', {replace: false});
              }
            }
    
          }catch(err){
            console.error('Error sending form data:', err);
          }
      }
      fetchData();
      
      
      }  
  },[location, navigate, setIsAuthenticated]);

  return null;
}

export default CheckAuthentication;
