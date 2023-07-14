import { Avatar, Box, Skeleton, Text } from "@chakra-ui/react";
import React from "react";

const UserListItem = ({ user, handleFunction, isLoaded = true }) => {
  return (
    <Skeleton isLoaded={isLoaded} w={"100%"} mb={2}>
      <Box
        onClick={() => handleFunction()}
        cursor={"pointer"}
        bg={"#E8E8E8"}
        _hover={{
          background: "#38B2AC",
          color: "white",
        }}
        w={"100%"}
        display={"flex"}
        alignItems={"center"}
        color={"black"}
        px={3}
        py={2}
        borderRadius={"lg"}
      >
        <Avatar
          mr={2}
          size={"sm"}
          cursor={"pointer"}
          name={user?.name || "User"}
          src={user?.pic}
        />
        <Box>
          <Text>{user?.name}</Text>
          <Text fontSize={"xs"}>
            <b>Email: </b>
            {user?.email}
          </Text>
        </Box>
      </Box>
    </Skeleton>
  );
};

export default UserListItem;
