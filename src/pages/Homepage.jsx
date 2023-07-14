import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";
import Login from "../components/Authentication/Login";
import SignUp from "../components/Authentication/SignUp";

const Homepage = () => {
  return (
    <Container maxW={"xl"} centerContent>
      <Box
        d={"flex"}
        justifyContent={"center"}
        p={3}
        bg={"white"}
        w={"100%"}
        m={"40px 0 15px"}
        borderRadius={"lg"}
        borderWidth={"1px"}
      >
        <Text fontSize={"4xl"} textAlign={"center"}>
          Talk-Together
        </Text>
      </Box>
      <Box
        bg={"white"}
        w={"100%"}
        p={4}
        borderRadius={"lg"}
        borderWidth={"1px"}
      >
        <Tabs variant="soft-rounded">
          <TabList mb={"1em"} gap={2}>
            <Tab w={"50%"}>Login</Tab>
            <Tab w={"50%"}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {/* Login */}
              <Login />
            </TabPanel>
            <TabPanel>
              {/* Sign Up */}
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
