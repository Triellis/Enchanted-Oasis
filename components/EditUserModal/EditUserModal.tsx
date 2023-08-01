import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  SimpleGrid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";

import styles from "./EditUserModal.module.css";
import { ReceivedUserDataOnClient, SentUserDataFromClient } from "@/lib/types";

import { editUser } from "@/lib/functions";

interface EditUserModalProps {
  isEditModalOpen: boolean;
  onEditModalClose: () => void;
  mutate: () => void;
  userData: ReceivedUserDataOnClient;
}

function OverlayOne() {
  return <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />;
}

export default function EditUserModal({
  isEditModalOpen,
  onEditModalClose,
  mutate,
  userData,
}: EditUserModalProps) {
  // for the overlay
  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  const toast = useToast();
  const [newUserData, setNewUserData] = useState<
    SentUserDataFromClient & { _id: string; oldPicture: string }
  >({
    _id: "",
    name: "",
    email: "",
    password: "",
    rollNumber: "",
    phone: "",
    role: "Student",
    profilePicture: null,
    house: "",
    oldPicture: userData.profilePicture, // this is need to remove the old picture from the server
  });
  // for the name of the profile picture
  const [imageName, setImageName] = useState("No Image Selected");

  useEffect(() => {
    setImageName("No Image Selected");
    setNewUserData({
      _id: userData._id.toString(),
      name: userData.name,
      email: userData.email,
      password: "",
      rollNumber: userData.rollNumber,
      phone: userData.phone,
      role: userData.role,
      profilePicture: null,
      house: userData.house, // Add the missing property here
      oldPicture: userData.profilePicture,
    });
  }, [isEditModalOpen]);

  const[isLoading, setIsLoading] = useState(false);

  return (
    <Modal
      isCentered
      isOpen={isEditModalOpen}
      onClose={onEditModalClose}
      scrollBehavior="inside"
      // responsive:
      size={{ sm: "2xl", base: "xs", lg: "3xl" }}
    >
      {/* <ModalOverlay /> */}
      {overlay}
      <ModalContent bg={"hsl(var(--b1))"}>
        <ModalHeader>Create new user</ModalHeader>
        <ModalCloseButton onClick={onEditModalClose} />
        <ModalBody className={styles.modalBody}>
          <SimpleGrid columns={{ base: 1, lg: 4 }} gap={4}>
            <GridItem colSpan={2}>
              {/* Name */}
              <FormControl>
                <div className={styles.quarter}>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="Text"
                    value={newUserData!.name}
                    onChange={(e) =>
                      setNewUserData((data) => {
                        const dataClone = structuredClone(data)!;

                        dataClone.name = e.target.value;
                        return dataClone;
                      })
                    }
                  />
                </div>

                {/* Phone Number */}
                <div className={styles.quarter}>
                  <FormLabel>Phone</FormLabel>
                  <Input
                    type="number"
                    value={newUserData!.phone}
                    onChange={(e) => {
                      setNewUserData((data) => {
                        const dataClone = structuredClone(data)!;

                        dataClone.phone = e.target.value;
                        return dataClone;
                      });
                    }}
                  />
                </div>

                <div className={styles.quarter}>
                  {/* Password */}
                  <FormLabel>New password</FormLabel>
                  <Input
                    type="password"
                    value={newUserData?.password}
                    onChange={(e) => {
                      setNewUserData((data) => {
                        const dataClone = structuredClone(data)!;

                        dataClone.password = e.target.value;
                        return dataClone;
                      });
                    }}
                  />
                </div>
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl>
                {/* Profile Picture */}
                <FormLabel>Avatar</FormLabel>
                <form className={styles.picIn}>
                  <label
                    htmlFor="myFileInput"
                    className={styles.customFileLabel}
                  >
                    {imageName}
                  </label>
                  <input
                    accept=".jpg,.jpeg,.png"
                    type="file"
                    // value={newUserData.profilePicture}
                    id="myFileInput"
                    className={styles.customFileInput}
                    // event listener
                    onChange={(e) => {
                      setNewUserData((data) => {
                        const dataClone = structuredClone(data)!;

                        dataClone.profilePicture = e.target.files![0];
                        return dataClone;
                      });

                      if (e.target.files![0]) {
                        setImageName(e.target.files![0].name);
                      } else {
                        setImageName("No Image Selected");
                      }
                    }}
                  />
                </form>
              </FormControl>
            </GridItem>
          </SimpleGrid>
        </ModalBody>

        <ModalFooter className={styles.modalFooter}>
          <Button onClick={onEditModalClose} className={styles.modalCancel} >Discard Changes</Button>

          <Button
            isLoading={isLoading}
            className={styles.modalAdd}
            onClick={async () => {
              setIsLoading(true);
              const res = await editUser(newUserData!);
              if (res.status == 200) {
                toast({
                  title: "User created",
                  description: "User created successfully",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
                mutate();
                onEditModalClose();
              } else {
                toast({
                  title: "User creation failed",
                  description: await res.text(),
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                });
              }
              setIsLoading(false);
            }}
          >
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
