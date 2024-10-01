import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState([]);

  const Navigate = useNavigate();


  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userData"));
    if(userInfo){
     setUser(userInfo.data);
    }
    if (!userInfo) {
      // Navigate('sign-in');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Navigate]);

  return (
    <ChatContext.Provider value={{selectedChat,setSelectedChat,user,setUser,notification,setNotification,chats,setChats,}}>
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;