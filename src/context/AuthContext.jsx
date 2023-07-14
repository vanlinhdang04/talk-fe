import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useContext } from "react";
import { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { SocketContext } from "./SocketContext";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [userInfo, setUserInfo] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();
  // const socket = useContext(SocketContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo")) || null;
    const tok = JSON.parse(localStorage.getItem("token")) || null;
    setUserInfo(user);
    setToken(tok);
  }, []);

  // useEffect(() => {
  //   if (userInfo && socket) {
  //     socket.emit("setup", userInfo);
  //     socket.on("connected", () => {
  //       console.log("setup ok");
  //     });
  //   }
  // }, [socket, userInfo]);

  const signup = async (values) => {
    setLoading(true);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_URL_API}/api/user`,
        {
          name: values.name,
          email: values.email,
          password: values.password,
          pic: values.pic,
        },
        config
      );
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      setUserInfo(data);
      setToken(data?.token);
      localStorage.setItem("userInfo", JSON.stringify(data));
      localStorage.setItem("token", JSON.stringify(data?.token));

      setLoading(false);
      history.push("/chats");
    } catch (error) {
      console.log(error);
      toast({
        title: "Error Occured!",
        description: error?.response?.data?.message || error?.message || "",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);

    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_URL_API}/api/user/login`,
        {
          email,
          password,
        },
        config
      );
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      console.log("data", data);

      setUserInfo(data);
      setToken(data?.token);
      localStorage.setItem("userInfo", JSON.stringify(data));
      localStorage.setItem("token", JSON.stringify(data?.token));

      setLoading(false);
      history.push("/chats");
    } catch (error) {
      console.log(error);
      toast({
        title: "Error Occured!",
        description: error?.response?.data?.message || error?.message || "",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    setUserInfo();
    setToken();

    history.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        token,
        login,
        signup,
        loading,
        setLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
