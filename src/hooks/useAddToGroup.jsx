import React, { useEffect, useState } from "react";
import useFetch from "./useFetch";
import useErrorToast from "./useErrorToast";
import { useToast } from "@chakra-ui/react";
import useFetchChats from "./useFetchChats";

const useAddToGroup = (chatId, userId) => {
  const [endpoint, setEndpoint] = useState();
  const { data, error, loading } = useFetch(endpoint, {
    method: "put",
    headers: {
      "Content-type": "application/json",
    },
    data: {
      chatId,
      userId,
    },
  });

  const reFetchChats = useFetchChats(data);
  const err = useErrorToast(error, "Rename Group Failed");
  const toast = useToast();

  useEffect(() => {
    if (chatId && userId) {
      setEndpoint(`/api/chat/groupadd?u=${userId}`);
    }

    return () => setEndpoint();
  }, [chatId, userId]);

  useEffect(() => {
    if (data) {
      toast({
        title: `Add User To Group Successful`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
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

export default useAddToGroup;
