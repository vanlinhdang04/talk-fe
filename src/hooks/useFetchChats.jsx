import React, { useContext, useEffect, useState } from "react";
import useFetch from "./useFetch";
import { ChatContext } from "../context/ChatContext";
import useErrorToast from "./useErrorToast";

const useFetchChats = (flag = true) => {
  const [endpoint, setEndpoint] = useState();
  const { data, error, loading, refetch } = useFetch(endpoint);
  const { setChats, setSelectedChat, selectedChat } = useContext(ChatContext);
  const errorToast = useErrorToast(error, "Failed to Load the Chats");
  ``;
  useEffect(() => {
    if (Boolean(flag) && !endpoint) {
      return setEndpoint("/api/chat");
    }

    if (Boolean(flag) && endpoint) {
      return refetch();
    }

    return () => setEndpoint();
  }, [flag]);

  useEffect(() => {
    if (data) {
      // console.log(data);
      setChats(data);
      // setSelectedChat(data[0]);
    }
  }, [data]);

  useEffect(() => {
    const clearEndpoit = () => {
      setEndpoint();
    };

    if (data || error) {
      clearEndpoit();
    }
  }, [data, error]);

  return { data, error, loading, refetch };
};

export default useFetchChats;
