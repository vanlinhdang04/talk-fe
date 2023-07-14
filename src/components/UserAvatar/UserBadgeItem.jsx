import { CloseIcon } from "@chakra-ui/icons";
import { Avatar, Box, Text, Tooltip } from "@chakra-ui/react";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const UserBadgeItem = ({ user, handleFunction }) => {
  const { userInfo } = useContext(AuthContext);
  return userInfo?._id !== user?._id ? (
    <Tooltip label={user?.email} hasArrow borderRadius={"lg"}>
      <Box
        px={2}
        py={1}
        borderRadius={"lg"}
        m={1}
        _odd={{
          bg: "purple.600",
        }}
        _even={{
          bg: "blue.600",
        }}
        color={"white"}
        cursor={"pointer"}
        onClick={handleFunction}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Avatar size={"xs"} src={user?.pic} name={user?.name} />
        <Text px={1} fontSize={12} fontWeight={"semibold"}>
          {user?.name}
        </Text>
        <CloseIcon p={1} fontSize={14} />
      </Box>
    </Tooltip>
  ) : (
    <Tooltip label={user?.email} hasArrow borderRadius={"lg"}>
      <Box
        px={2}
        py={1}
        borderRadius={"lg"}
        m={1}
        bg={"red.600"}
        color={"white"}
        cursor={"pointer"}
        // onClick={handleFunction}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Avatar size={"xs"} src={user?.pic} name={user?.name} />
        <Text px={1} fontSize={12} fontWeight={"semibold"}>
          {user?.name}
        </Text>
        {/* <CloseIcon p={1} fontSize={14} /> */}
      </Box>
    </Tooltip>
  );
};

export default UserBadgeItem;
