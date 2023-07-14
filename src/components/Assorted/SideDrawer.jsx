import { useContext, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import ProfileModal from "./ProfileModal";
import { AuthContext } from "../../context/AuthContext";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import ChatLoading from "../Loading/ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";
import useAccessChat from "../../hooks/useAccessChat";
import useSearchUsers from "../../hooks/useSearchUsers";

const SideDrawer = () => {
  const [search, setSearch] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: searchUsersData, loading: searchUsersLoading } =
    useSearchUsers(search);

  const [userIdAccess, setUserIdAccess] = useState(null);
  const { data: accessChatData, loading: accessChatLoading } =
    useAccessChat(userIdAccess);

  const { userInfo, logout } = useContext(AuthContext);

  const validationSchema = Yup.object({
    search: Yup.string().required("Please Fill Field."),
  });

  const handleSubmit = (values) => {
    setSearch(values.search);
  };

  const accessChat = (userId) => {
    console.log("a", userId);
    setUserIdAccess(userId);
    onClose();
  };

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        bg={"white"}
        w={"100%"}
        p={"5px 10px"}
        borderWidth={"5px"}
      >
        <Tooltip label="Search Users to Chat" hasArrow placement="bottom-end">
          <Button variant={"ghost"} onClick={onOpen}>
            <i className="fas fa-search"></i>
            <Text display={{ base: "none", md: "flex" }} px={4}>
              Search Users
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize={"2xl"}>Talk Together</Text>
        <Box>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize={"2xl"} m={1} />
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size={"sm"}
                cursor={"pointer"}
                src={userInfo?.pic}
                name={userInfo?.name}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={userInfo}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={() => logout()}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={"1px"}>Search Users</DrawerHeader>
          <DrawerBody>
            <Formik
              initialValues={{ search: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <Field name="search">
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.search} pb={2}>
                      <Box display={"flex"}>
                        <Input
                          placeholder="Search by Name or Email"
                          mr={2}
                          {...field}
                        />
                        <Button type="submit">Go</Button>
                      </Box>
                      <FormErrorMessage>{form.errors.search}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Form>
            </Formik>
            {searchUsersLoading ? (
              <ChatLoading />
            ) : (
              <Box>
                {searchUsersData?.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user._id)}
                  />
                ))}
              </Box>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
