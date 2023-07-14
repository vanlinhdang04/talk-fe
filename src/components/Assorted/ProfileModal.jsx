import { ViewIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {/* Button */}
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: "flex" }}
          icon={<ViewIcon />}
          onClick={onOpen}
        />
      )}

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size={"lg"} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={"40px"}
            display={"flex"}
            justifyContent={"center"}
            fontWeight={"bold"}
          >
            {user?.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Image
              borderRadius={"full"}
              boxSize={"150px"}
              src={user?.pic}
              alt={user?.name}
            />
            <Text fontSize={{ base: "28px", md: "30px" }}>
              Email: {user?.email}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button variant={"ghost"} onClick={onClose}>
              Close
            </Button>
            {/* <Button variant="ghost">Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
