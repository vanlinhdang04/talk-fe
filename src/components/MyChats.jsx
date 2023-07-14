import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import useFetchChats from "../hooks/useFetchChats";
import { Avatar, Box, Button, HStack, Stack, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "./Loading/ChatLoading";
import useAccessChat from "../hooks/useAccessChat";
import { getPic, getSender } from "../utils/getSender";
import { AuthContext } from "../context/AuthContext";
import GroupChatModal from "./Assorted/GroupChatModal";

const MyChats = ({ fetchAgain }) => {
  const { data, refetch } = useFetchChats();
  const { chats, selectedChat, setSelectedChat } = useContext(ChatContext);
  const { userInfo } = useContext(AuthContext);

  // console.log(Boolean(chats));

  useEffect(() => {
    refetch();
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir={"column"}
      alignItems={"center"}
      p={3}
      bg={"white"}
      borderRadius={"lg"}
      h={"100%"}
    >
      <Box
        pb={3}
        px={3}
        display={"flex"}
        w={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
        // borderWidth={"1px"}
      >
        <Text fontSize={{ base: "28px", md: "30px" }}>My Chats</Text>

        <GroupChatModal>
          <Button
            display={"flex"}
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New
          </Button>
        </GroupChatModal>
      </Box>

      <Box
        display={"flex"}
        flexDir={"column"}
        p={3}
        bg={"#F8F8F8"}
        w={"100%"}
        h={"100%"}
        borderRadius={"lg"}
        overflowY={"hidden"}
      >
        {chats ? (
          <Stack overflowY={"scroll"} h={"100%"}>
            {chats?.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor={"pointer"}
                bg={selectedChat?._id === chat?._id ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat?._id === chat?._id ? "white" : "black"}
                px={3}
                py={2}
                borderRadius={"lg"}
                key={chat?._id}
              >
                <HStack>
                  {chat?.isGroupChat ? (
                    <Avatar name={chat?.chatName} />
                  ) : (
                    <Avatar
                      name={getSender(userInfo, chat?.users)}
                      src={getPic(userInfo, chat?.users)}
                    />
                  )}
                  <Text>
                    {!chat.isGroupChat
                      ? getSender(userInfo, chat?.users)
                      : chat?.chatName}
                  </Text>
                </HStack>
              </Box>
            ))}
          </Stack>
        ) : (
          // <ChatLoading />
          <></>
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
