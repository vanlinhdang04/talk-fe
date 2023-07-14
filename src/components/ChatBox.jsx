import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { Box } from "@chakra-ui/react";
import SingleChat from "./Chat/SingleChat";

const ChatBox = () => {
  const { selectedChat } = useContext(ChatContext);
  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      flexDir={"column"}
      alignItems={"center"}
      p={3}
      bg={"white"}
      borderRadius={"lg"}
      borderWidth={"1px"}
      w={"100%"}
      h={"100%"}
    >
      <SingleChat />
    </Box>
  );
};

export default ChatBox;
