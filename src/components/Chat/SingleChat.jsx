import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getSenderInfo } from "../../utils/getSender";
import { AuthContext } from "../../context/AuthContext";
import ProfileModal from "../Assorted/ProfileModal";
import GroupChatOptions from "../Assorted/GroupChatOptions";
import useSendMessage from "../../hooks/useSendMessage";
import "./style.css";
import ScrollableChat from "../Assorted/ScrollableChat";
import { SocketContext } from "../../context/SocketContext";
import Lottie from "lottie-react";
import typingAnimation from "../../animations/typing.json";

var socket, selectedChatCompare;

const SingleChat = () => {
  const socket = useContext(SocketContext);
  const {
    selectedChat,
    setSelectedChat,
    messages,
    setMessages,
    messagesLoading,
    isTyping,
    typing,
    setTyping,
  } = useContext(ChatContext);
  const { userInfo } = useContext(AuthContext);

  // const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();
  const [newMessageTmp, setNewMessageTmp] = useState("");

  // const [typing, setTyping] = useState(false);
  // const [isTyping, setIsTyping] = useState(false);

  const { data } = useSendMessage(selectedChat?._id, newMessage);

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessageTmp) {
      if (socket) {
        socket.emit("stopTyping", selectedChat?._id);
      }
      setNewMessage(newMessageTmp);
      setNewMessageTmp("");
    }
  };

  const sendButton = () => {
    if (socket) {
      socket.emit("stopTyping", selectedChat?._id);
    }
    setNewMessage(newMessageTmp);
    setNewMessageTmp("");
  };

  const typingHandler = (e) => {
    setNewMessageTmp(e.target.value);

    if (!socket) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat?._id);
    }

    let lastTypingTime = new Date().getTime();
    const timerLength = 3000;
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit("stopTyping", selectedChat?._id);
        setTyping(false);
      }
    }, timerLength);
  };

  useEffect(() => {
    if (data) {
      setNewMessage("");
      // console.count("newMessage");
      // socket.emit("newMessage", data);
      setMessages((prev) => [...prev, data]);
    }
  }, [data]);

  return (
    <>
      {selectedChat ? (
        <>
          <Box
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w={"100%"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat()}
            />
            {!selectedChat?.isGroupChat ? (
              <>
                <Text>{getSender(userInfo, selectedChat?.users)}</Text>

                <ProfileModal
                  user={getSenderInfo(userInfo, selectedChat?.users)}
                />
              </>
            ) : (
              <>
                <Text>{selectedChat?.chatName}</Text>

                <GroupChatOptions group={selectedChat} />
              </>
            )}
          </Box>

          <Box
            display={"flex"}
            flexDir={"column"}
            justifyContent={"flex-end"}
            p={3}
            bg={"#E8E8E8"}
            w={"100%"}
            h={"100%"}
            borderRadius={"lg"}
            overflowY={"hidden"}
          >
            {/* Message Here */}
            {messagesLoading ? (
              <Box
                w={"100%"}
                h={"100%"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Spinner size={"xl"} />
              </Box>
            ) : (
              <Box className="messages">
                <ScrollableChat messages={messages} />
              </Box>
            )}

            <FormControl onKeyDown={sendMessage} pt={3}>
              {isTyping ? (
                <Box bg={"transparent"}>
                  <Lottie
                    animationData={typingAnimation}
                    loop={true}
                    style={{
                      width: "3rem",
                    }}
                  />
                </Box>
              ) : (
                <></>
              )}
              <Box display={"flex"}>
                <Input
                  variant={"filled"}
                  bg={"#E0E0E0"}
                  placeholder="Enter a message ..."
                  onChange={typingHandler}
                  value={newMessageTmp}
                />
                <Button colorScheme={"blue"} onClick={sendButton}>
                  Send
                </Button>
              </Box>
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          h={"100%"}
        >
          <Text fontSize={"3xl"}>Click on a user to start chatting</Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
