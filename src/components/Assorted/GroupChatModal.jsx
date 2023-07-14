import {
  Button,
  FormControl,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import useSearchUsers from "../../hooks/useSearchUsers";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useState } from "react";
import { useEffect } from "react";
import UserListItem from "../UserAvatar/UserListItem";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import useCreateGroup from "../../hooks/useCreateGroup";

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [filterSearchUses, setFilterSearchUsers] = useState([]);
  const [search, setSearch] = useState();
  const { data: searchUsersData } = useSearchUsers(search);

  const [dataCreate, setDataCreate] = useState({ name: "", users: [] });
  const { data: createGroupData } = useCreateGroup(
    dataCreate.name,
    dataCreate.users
  );

  const toast = useToast();

  useEffect(() => {
    const set = new Set(selectedUsers?.map((obj) => obj._id));
    const filtered = searchUsersData?.filter((user) => !set.has(user._id));
    setFilterSearchUsers(filtered);
  }, [searchUsersData, selectedUsers]);

  useEffect(() => {
    if (createGroupData) {
      setSelectedUsers([]);
      setSearch();
      setGroupChatName();
      setDataCreate({ name: "", users: [] });
      setFilterSearchUsers([]);
      onClose();
    }
  }, [createGroupData]);

  const handleChangeName = (name) => {
    setGroupChatName(name);
  };

  const handleAddToGroup = (user) => {
    if (selectedUsers.includes(user)) {
      return toast({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }

    setSelectedUsers((prev) => [...prev, user]);
  };

  const handleDelete = (user) => {
    setSelectedUsers(selectedUsers.filter((obj) => obj?._id !== user?._id));
  };

  const handleSubmit = () => {
    setDataCreate({ name: groupChatName, users: selectedUsers });
  };

  return (
    <>
      {/* Button */}
      <span onClick={onOpen}>{children}</span>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={"35px"}
            display={"flex"}
            justifyContent={"center"}
            // fontWeight={"bold"}
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <FormControl>
              <Input
                placeholder="Name Group"
                mb={3}
                value={groupChatName || ""}
                onChange={(e) => handleChangeName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Users eg: Linh, Nhi"
                mb={1}
                onChange={(e) => setSearch(e.target.value)}
              />
            </FormControl>

            {/* Render Selected Users */}
            <HStack wrap={"wrap"} mb={2} gap={1}>
              {selectedUsers.map((user) => (
                <UserBadgeItem
                  key={user?._id}
                  user={user}
                  handleFunction={() => handleDelete(user)}
                />
              ))}
            </HStack>

            {/* Render searched users */}
            {filterSearchUses?.slice(0, 4).map((user) => (
              <UserListItem
                user={user}
                key={user?._id}
                handleFunction={() => handleAddToGroup(user)}
              />
            ))}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={handleSubmit}
              isDisabled={!groupChatName || !selectedUsers.length}
            >
              CREATE
            </Button>
            {/* <Button variant="ghost">Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
