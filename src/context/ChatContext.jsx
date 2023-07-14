import { createContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState();
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const { data, loading: messagesLoading } = useFetch(
    selectedChat ? `/api/message/${selectedChat?._id}` : undefined
  );
  // const socket = useContext(SocketContext);

  useEffect(() => {
    if (data) {
      setMessages(data);
    } else {
      setMessages([]);
    }
  }, [data]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        messages,
        setMessages,
        messagesLoading,
        isTyping,
        setIsTyping,
        typing,
        setTyping,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
