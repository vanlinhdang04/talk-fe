import React, { useContext, useEffect, useState } from "react";
import useFetch from "./useFetch";
import { ChatContext } from "../context/ChatContext";
import { useToast } from "@chakra-ui/react";
import useErrorToast from "./useErrorToast";

const useAccessChat = (userId) => {
  const [endpoint, setEndpoint] = useState(null);
  const { data, error, loading } = useFetch(endpoint, {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    data: { userId },
  });
  const { setSelectedChat, setChats, chats } = useContext(ChatContext);
  const err = useErrorToast(error);

  useEffect(() => {
    if (userId) {
      setEndpoint(`/api/chat`);
    }
  }, [userId]);

  useEffect(() => {
    if (data) {
      if (!chats?.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }
      setSelectedChat(data);
    }
  }, [data]);

  return { data, error, loading };
};

export default useAccessChat;
