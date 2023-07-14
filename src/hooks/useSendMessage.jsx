import React, { useEffect, useState } from "react";
import useFetch from "./useFetch";
import useErrorToast from "./useErrorToast";
import useFetchChats from "./useFetchChats";
import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";

const useSendMessage = (chatId, content) => {
  const [endpoint, setEndpoint] = useState();
  const socket = useContext(SocketContext);

  const { data, error, loading } = useFetch(endpoint, {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    data: { chatId, content },
  });
  const err = useErrorToast(error, "Send Message Failed");
  const reFetchChats = useFetchChats(data);

  useEffect(() => {
    if (chatId && content) {
      setEndpoint("/api/message");
    } else {
      setEndpoint();
    }

    return () => setEndpoint();
  }, [chatId, content]);

  useEffect(() => {
    if (data) {
      socket.emit("newMessage", data);
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

  return { data, error, loading };
};

export default useSendMessage;
