import { Avatar, Box, Tooltip } from "@chakra-ui/react";
import React, { useContext } from "react";
import ScrollableFeed from "react-scrollable-feed";
import { isLastMessage, isSameSender } from "../../utils/getSender";
import { AuthContext } from "../../context/AuthContext";
import MessageContent from "../Chat/MessageContent";

const ScrollableChat = ({ messages }) => {
  const { userInfo } = useContext(AuthContext);
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <MessageContent
            key={m?._id}
            message={m}
            hideAvatar={isSameSender(messages, m, i, userInfo?._id)}
            isOwner={m?.sender?._id === userInfo?._id}
          />
          //   <Box key={m?._id} display={"flex"}>
          //     {/* {(isSameSender(messages, m, i, userInfo?._id) ||
          //       isLastMessage(messages, i, userInfo?._id)) && (
          //       <Tooltip
          //         label={m?.sender?.name}
          //         placement="bottom-start"
          //         hasArrow
          //       >
          //         <Avatar
          //           mt={"7px"}
          //           mr={1}
          //           size={"sm"}
          //           cursor={"pointer"}
          //           name={m?.sender?.name}
          //           src={m?.sender?.pic}
          //         />
          //       </Tooltip>
          //     )} */}
          //     <span
          //       style={{
          //         backgroundColor: `${
          //           m?.sender?._id === userInfo?._id ? "#BEE3F8" : "#B9F5B0"
          //         }`,
          //         borderRadius: "20px",
          //         padding: "5px 15px",
          //         maxWidth: "75%",
          //       }}
          //     >
          //       {m?.content}
          //     </span>
          //   </Box>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
