// import React from 'react'
// import Axios from 'axios';
// import style from "../Styles/HomePage.module.css";
// import {useState, useEffect} from 'react'
// import {handleSuccess, handleError } from '../utils'
// import {ToastContainer} from 'react-toastify';
// import SideDrawer from "../HomePageComponent/SideDrawer"
// import { Box } from '@chakra-ui/react';
// import MyChats from '../HomePageComponent/MyChats';
// import ChatBox from '../HomePageComponent/ChatBox';

// export default function HomePage() {

//   const [fetchAgain, setFetchAgain] = useState(false);
//   const { user } = ChatState();

//   return (
//     <>
//       <div style={{width:"100%"}}>
//         <SideDrawer />
//         <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
//           <MyChats />
//           <ChatBox />
//         </Box>
//       </div>


//       <ToastContainer />
//     </>
//   )
// }


import style from "../Styles/HomePage.module.css";
import {ToastContainer} from 'react-toastify';
import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import ChatBox from '../HomePageComponent/ChatBox';
import MyChats from '../HomePageComponent/MyChats';
import SideDrawer from "../HomePageComponent/SideDrawer"
import { ChatState } from "../Context/ChatProvider";

const HomePage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>

      <ToastContainer />
    </div>



  );
};

export default HomePage;

