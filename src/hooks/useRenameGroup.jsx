import React, { useEffect, useState } from "react";
import useFetch from "./useFetch";
import { useToast } from "@chakra-ui/react";
import useErrorToast from "./useErrorToast";
import useFetchChats from "./useFetchChats";

const useRenameGroup = (chatId, chatName) => {
  const [endpoint, setEndpoint] = useState();
  const { data, error, loading } = useFetch(endpoint, {
    method: "put",
    headers: {
      "Content-type": "application/json",
    },
    data: {
      chatId,
      chatName,
    },
  });
  const reFetchChats = useFetchChats(data);
  const err = useErrorToast(error, "Rename Group Failed");
  const toast = useToast();

  useEffect(() => {
    if (chatId && chatName) {
      setEndpoint(`/api/chat/rename?name=${chatName}`);
    } else {
      setEndpoint();
    }

    return () => setEndpoint();
  }, [chatId, chatName]);

  useEffect(() => {
    if (data) {
      toast({
        title: "Rename Group Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  }, [data]);

  return { data, error, loading };
};

export default useRenameGroup;
