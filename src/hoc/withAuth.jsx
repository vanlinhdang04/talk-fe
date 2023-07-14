import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useToast } from "@chakra-ui/react";

const withAuth = (WrappedComponent) => {
  const ComponentWithAuth = (props) => {
    const history = useHistory();
    const { userInfo } = useContext(AuthContext);
    const toast = useToast();

    useEffect(() => {
      if (userInfo === null) {
        toast({
          title: "Please Login!",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        history.push("/");
      }
    }, [userInfo]);

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
