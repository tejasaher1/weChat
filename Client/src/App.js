import React, { useState, useEffect } from "react";
import Axios from "axios";
import style from "./app.module.css";
import LoginPage from "./Pages/LoginPage";
import NavBar from "./Component/NavBar";
import Registration from "./Pages/RegistrationPage";
import HomePage from "./Pages/HomePage";
import {createBrowserRouter, RouterProvider, Navigate, useNavigate, Route, Routes } from "react-router-dom";
import CheckAuthentication from "./Component/CheckAuthentication";
import { ChakraProvider } from "@chakra-ui/react";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/sign-in" />;
  };


  // const router = createBrowserRouter([
  //   {
  //       path: '/',
  //       element: <NavBar />,
  //       children: [
  //           { path: 'sign-in', element: <LoginPage /> },
  //           {path: 'registartion', element: <Registration />},
  //           {path: '/home', element: <PrivateRoute element={<HomePage />}/>}
  //       ]
  //   }
  // ])

  return (
    <>
      <CheckAuthentication setIsAuthenticated={setIsAuthenticated} />
      
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route path="/sign-in" element={<LoginPage />} />
          <Route path="/registartion" element={<Registration />} />
        </Route>

        <Route path="/" >
           <Route path="home" element={<PrivateRoute element={
              <ChakraProvider> <HomePage /> </ChakraProvider>
            } />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
