import React, { useContext, useState } from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import SideDrawer from "../components/Assorted/SideDrawer";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { userInfo } = useContext(AuthContext);
  const { selectedChat } = useContext(ChatContext);

  return (
    <div style={{ width: "100%" }}>
      {userInfo && <SideDrawer />}
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }}
        gap={4}
        m={4}
        h={"85vh"}
      >
        <GridItem
          colSpan={{ base: 1, md: 1 }}
          bg={"white"}
          borderRadius={"lg"}
          overflowY={"hidden"}
          display={{ base: selectedChat ? "none" : "block", md: "block" }}
        >
          {userInfo && (
            <MyChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
        </GridItem>
        <GridItem
          colSpan={{ base: 1, md: 3 }}
          display={{ base: selectedChat ? "block" : "none", md: "block" }}
          h={"100%"}
          overflowY={"hidden"}
        >
          {userInfo && (
            <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
        </GridItem>
      </Grid>
    </div>
  );
};

export default Chatpage;
