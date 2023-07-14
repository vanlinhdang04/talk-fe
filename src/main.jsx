import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min.js";
import AuthProvider from "./context/AuthContext.jsx";
import ChatProvider from "./context/ChatContext.jsx";
import SocketProvider from "./context/SocketContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <ChatProvider>
        <ChakraProvider>
          <SocketProvider>
            <App />
          </SocketProvider>
        </ChakraProvider>
      </ChatProvider>
    </AuthProvider>
  </BrowserRouter>
);
