import React, { useContext } from "react";
import useFetch from "./useFetch";
import { useState } from "react";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { ChatContext } from "../context/ChatContext";
import useErrorToast from "./useErrorToast";

const useCreateGroup = (name, users) => {
  const [endpoint, setEndpoint] = useState();
  const { loading, data, error } = useFetch(endpoint, {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    data: {
      name,
      users: JSON.stringify(users.map((u) => u._id)),
    },
  });
  const err = useErrorToast(error);

  const { setSelectedChat, setChats, chats } = useContext(ChatContext);
  const toast = useToast();

  useEffect(() => {
    if (name && users) {
      setEndpoint("/api/chat/group");
    }

    return () => setEndpoint();
  }, [name, users]);

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

export default useCreateGroup;
