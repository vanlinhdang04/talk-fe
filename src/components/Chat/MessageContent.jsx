import { Avatar, Box, Tooltip, Text } from "@chakra-ui/react";
import React from "react";

const MessageContent = ({ message, hideAvatar, isOwner }) => {
  return (
    <Box
      display={"flex"}
      my={1}
      flexDir={isOwner ? "row-reverse" : "row"}
      alignItems={"center"}
    >
      <Tooltip
        label={`${message?.sender?.name}(${message?.sender?.email})`}
        placement="bottom-start"
        hasArrow
      >
        <Box
          visibility={hideAvatar ? "hidden" : "visible"}
          display={isOwner ? "none" : "flex"}
        >
          <Avatar
            //   mt={"7px"}
            mx={1}
            size={"sm"}
            cursor={"pointer"}
            name={message?.sender?.name}
            src={message?.sender?.pic}
          />
        </Box>
      </Tooltip>
      <Box
        bg={isOwner ? "#BEE3F8" : "#B9F5B0"}
        borderRadius={"20px"}
        p={"5px 15px"}
        maxW={"75%"}
      >
        {message?.content}
      </Box>
    </Box>
  );
};

export default MessageContent;
