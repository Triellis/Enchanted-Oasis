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
  RadioGroup,
  Stack,
  Radio,
  Center,
  Divider,
  ModalFooter,
  Button,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";

import styles from "./EditUserModal.module.css";
import { SentUserDataFromClient } from "@/lib/types";
import { profile } from "console";

interface EditUserModalProps {
  isEditModalOpen: boolean;
  onEditModalClose: () => void;
  mutate: () => void;
  newUserData: SentUserDataFromClient;
  setNewUserData: React.Dispatch<React.SetStateAction<SentUserDataFromClient>>;
  editMode: boolean;
}

function OverlayOne() {
  return <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />;
}

async function postUser(newUserData: SentUserDataFromClient) {
  const formData = new FormData();
  for (const key in newUserData) {
    // @ts-ignore
    formData.append(key, newUserData[key]);
  }

  const res = await fetch("/api/user", {
    method: "POST",

    body: formData,
  });

  return res;
}

export default function EditUserModal({
  isEditModalOpen,
  onEditModalClose,
  mutate,
  newUserData,
  setNewUserData,
  editMode,
}: EditUserModalProps) {
  // for the overlay
  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  const toast = useToast();

  // for the name of the profile picture
  const [imageName, setImageName] = useState("No Image Selected");
  useEffect(() => {
    setImageName("No Image Selected");
    setNewUserData({
      name: newUserData.name,
      email: newUserData.email,
      password: "",
      rollNumber: newUserData.rollNumber,
      phone: newUserData.phone,
      role: newUserData.role,
      profilePicture: null,
      house: newUserData.house, // Add the missing property here
    });
  }, [isEditModalOpen]);
  return (
    <Modal
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
                    value={newUserData.name}
                    onChange={(e) =>
                      setNewUserData({
                        ...newUserData,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Phone Number */}
                <div className={styles.quarter}>
                  <FormLabel>Phone</FormLabel>
                  <Input
                    type="number"
                    onChange={(e) => {
                      setNewUserData({
                        ...newUserData,
                        phone: e.target.value,
                      });
                    }}
                  />
                </div>

                <div className={styles.quarter}>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    onChange={(e) =>
                      setNewUserData({
                        ...newUserData,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl>
                {/* Profile Picture */}
                <FormLabel>Profile Picture</FormLabel>
                <form className={styles.picIn}>
                  <label
                    htmlFor="myFileInput"
                    className={styles.customFileLabel}
                  >
                    {imageName}
                  </label>
                  <input
                    type="file"
                    id="myFileInput"
                    className={styles.customFileInput}
                    // event listener
                    onChange={(e) => {
                      setNewUserData({
                        ...newUserData,
                        profilePicture: e.target.files![0],
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
            <GridItem className={styles.quarThree} colSpan={2}>
              <div className={styles.quarter}>
                {/* Password */}
                <FormLabel>New password</FormLabel>
                <Input
                  type="password"
                  onChange={(e) => {
                    setNewUserData({
                      ...newUserData,
                      password: e.target.value,
                    });
                  }}
                />
              </div>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl>{/* temporary */}</FormControl>
            </GridItem>
          </SimpleGrid>
        </ModalBody>

        <ModalFooter className={styles.modalFooter}>
          <Button
            className={styles.modalAdd}
            onClick={async () => {
              // validation logic:
              for (let field of Object.keys(newUserData)) {
                if (!(newUserData as any)[field]) {
                  toast({
                    title: `${field} field empty`,
                    description: `Please enter a ${field}`,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                  });
                  return;
                }
              }

              const res = await postUser(newUserData);
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
            }}
          >
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
