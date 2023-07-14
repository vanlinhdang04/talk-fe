import { SettingsIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import { Field, Form, Formik } from "formik";
import useSearchUsers from "../../hooks/useSearchUsers";
import UserListItem from "../UserAvatar/UserListItem";
import * as Yup from "yup";
import useRenameGroup from "../../hooks/useRenameGroup";
import useAddToGroup from "../../hooks/useAddToGroup";
import useRemoveFromGroup from "../../hooks/useRemoveFromGroup";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const GroupChatOptions = ({ children, group }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userInfo } = useContext(AuthContext);
  const { setSelectedChat } = useContext(ChatContext);
  const [search, setSearch] = useState();
  const [filterSearchUsers, setFilterSearchUsers] = useState([]);
  const [renameGroup, setRenameGroup] = useState();
  const [addToGroup, setAddToGroup] = useState();
  const [removeFromGroup, setRemoveFromGroup] = useState();

  const { data: searchUsersData, refetch: refetchSearch } =
    useSearchUsers(search);
  const rename = useRenameGroup(renameGroup?.chatId, renameGroup?.chatName);
  const add = useAddToGroup(addToGroup?.chatId, addToGroup?.userId);
  const remove = useRemoveFromGroup(
    removeFromGroup?.chatId,
    removeFromGroup?.userId
  );

  useEffect(() => {
    const set = new Set(group?.users?.map((obj) => obj._id));
    const filtered = searchUsersData?.filter((user) => !set.has(user._id));
    // console.log(set);
    setFilterSearchUsers(filtered);
  }, [searchUsersData, group]);

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleAddToGroup = (user) => {
    console.log(user);
    setAddToGroup({ chatId: group?._id, userId: user?._id });
    refetchSearch();
  };

  const removeMember = (user) => {
    setRemoveFromGroup({ chatId: group?._id, userId: user?._id });
  };

  const handleRenameGroup = (values) => {
    setRenameGroup({ chatId: group?._id, chatName: values?.nameGroup });
  };

  const handleLeaveGroup = () => {
    setRemoveFromGroup({ chatId: group?._id, userId: userInfo?._id });
    setSelectedChat();
    onClose();
  };

  return (
    <>
      {/* Button */}
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: "flex" }}
          icon={<SettingsIcon />}
          onClick={onOpen}
        />
      )}

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={"40px"}
            display={"flex"}
            justifyContent={"center"}
            fontWeight={"bold"}
          >
            {group?.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            alignItems={"center"}
            w={"100%"}
          >
            <Accordion w={"100%"} my={2} defaultIndex={[0]} allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Members
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <HStack wrap={"wrap"}>
                    {group?.users?.map((user) => (
                      <UserBadgeItem
                        key={user?._id}
                        user={user}
                        handleFunction={() => removeMember(user)}
                      />
                    ))}
                  </HStack>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Custom Group
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Formik
                    initialValues={{ nameGroup: "" }}
                    validationSchema={Yup.object({
                      nameGroup: Yup.string().required(
                        "Name Group is required"
                      ),
                    })}
                    onSubmit={handleRenameGroup}
                    validateOnChange={false} // Disable validation on change
                    validateOnBlur={false} // Disable validation on blur
                  >
                    <Form>
                      <Field name="nameGroup">
                        {({ field, form }) => (
                          <>
                            <FormControl
                              isInvalid={
                                form.errors.nameGroup && form.touched.nameGroup
                              }
                              mb={3}
                            >
                              <Box display={"flex"}>
                                <Input placeholder="Name Group" {...field} />
                                <Button
                                  type="submit"
                                  variant={"solid"}
                                  colorScheme="teal"
                                  ml={1}
                                >
                                  Change
                                </Button>
                              </Box>
                              <FormErrorMessage>
                                {form.errors.nameGroup}
                              </FormErrorMessage>
                            </FormControl>
                          </>
                        )}
                      </Field>
                    </Form>
                  </Formik>

                  <Divider />

                  <FormControl>
                    <FormLabel>Add Member</FormLabel>
                    <Input
                      placeholder="Add Users eg: Linh, Nhi"
                      mb={1}
                      onChange={handleChangeSearch}
                      value={search || ""}
                    />
                  </FormControl>
                  <VStack gap={0}>
                    {filterSearchUsers?.slice(0, 4).map((user) => (
                      <UserListItem
                        user={user}
                        key={user?._id}
                        handleFunction={() => handleAddToGroup(user)}
                      />
                    ))}
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </ModalBody>

          <ModalFooter>
            <Button variant={"ghost"} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme={"red"} onClick={handleLeaveGroup}>
              Leave Group
            </Button>
            {/* <Button variant="ghost">Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatOptions;
