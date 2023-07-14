import { useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";

const useErrorToast = (error, title, description) => {
  const toast = useToast();

  useEffect(() => {
    if (!error) return;
    // console.log(error);

    toast({
      title: title || "Error!",
      description: description || error?.response?.data?.message || "",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top-left",
    });
  }, [error, description]);

  return {};
};

export default useErrorToast;
