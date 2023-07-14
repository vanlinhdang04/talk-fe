import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";
import { ChatContext } from "./ChatContext";
import { useState } from "react";
import { useCallback } from "react";

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState();
  //   const socket = "";
  const { userInfo } = useContext(AuthContext);
  const { selectedChat, setMessages, setIsTyping } = useContext(ChatContext);

  // const recievedMessage = () => {
  //   console.log("messageRecieved");
  //   socket.on("messageRecieved", (message) => {
  //     if (!selectedChat || selectedChat?._id !== message?.chat?._id) {
  //       // Notification
  //     } else {
  //       // show message
  //       setMessages((prev) => [...prev, message]);
  //     }
  //   });
  // };

  const setup = () => {
    if (userInfo && socket) {
      socket.emit("setup", userInfo);
      socket.on("connected", () => {
        console.log("setup ok");
        // recievedMessage();
      });
    }
  };

  const joinChat = () => {
    if (socket && selectedChat) {
      console.log("join");
      socket.emit("joinChat", selectedChat?._id);
    }
  };

  const messageRecieved = useCallback(() => {
    if (socket && selectedChat) {
      console.log("start messageRecieved");
      socket.off("messageRecieved");
      socket.on("messageRecieved", (message) => {
        if (!selectedChat || selectedChat?._id !== message?.chat?._id) {
          // Notification
          console.log("Notification");
        }
        if (selectedChat?._id === message?.chat?._id) {
          // show message
          console.log("messageRecieved");
          setMessages((prev) => [...prev, message]);
        }
      });
    }
  }, [socket, selectedChat]);

  useEffect(() => {
    const sk = io(import.meta.env.VITE_URL_API);
    setSocket(sk);

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      setup();
    }
  }, [userInfo, socket]);

  useEffect(() => {
    joinChat();
  }, [selectedChat, socket]);

  useEffect(() => {
    messageRecieved();
  }, [messageRecieved]);

  useEffect(() => {
    if (socket && setIsTyping) {
      socket.on("typing", () => setIsTyping(true));
      socket.on("stopTyping", () => setIsTyping(false));
    }
  }, [socket, setIsTyping]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
