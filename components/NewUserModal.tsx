import React, { useState } from "react";
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
} from "@chakra-ui/react";

import styles from "./NewUserModal.module.css";

interface NewUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  postUser: (userData: any) => Promise<Response>;
  mutate: (url: string) => void;
}

function OverlayOne() {
  return <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />;
}

function NewUserModal({
  isOpen,
  onClose,
  postUser,
  mutate,
}: NewUserModalProps) {
  // for the overlay
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setNewUserData({
          name: "",
          email: "",
          password: "",
          rollNumber: "",
          phone: "",
          role: "Student",
          profilePicture: null,
          house: "", // Add the missing property here
        });
      }}
      // responsive:
      size={{ sm: "2xl", base: "xs", lg: "3xl" }}
    >
      {/* <ModalOverlay /> */}
      {overlay}
      <ModalContent bg={"hsl(var(--b1))"}>
        <ModalHeader>Create new user</ModalHeader>
        <ModalCloseButton onClick={onClose} />
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

                {/* Role and House */}
                <div className={styles.randh}>
                  <FormLabel>Role</FormLabel>
                  <RadioGroup defaultValue="Student">
                    <Stack>
                      <Radio
                        value="Student"
                        onChange={(e) =>
                          setNewUserData({
                            ...newUserData,
                            role: e.target.value as Role,
                          })
                        }
                      >
                        Student
                      </Radio>
                      <Radio
                        value="Faculty"
                        onChange={(e) =>
                          setNewUserData({
                            ...newUserData,
                            role: e.target.value as Role,
                          })
                        }
                      >
                        Faculty
                      </Radio>
                      <Radio
                        value="Admin"
                        onChange={(e) =>
                          setNewUserData({
                            ...newUserData,
                            role: e.target.value as Role,
                          })
                        }
                      >
                        Admin
                      </Radio>
                    </Stack>
                  </RadioGroup>

                  {/* divider */}
                  <Center height={"140px"}>
                    <Divider orientation="vertical" />
                  </Center>

                  {/* House */}
                  <FormLabel>House</FormLabel>
                  <RadioGroup>
                    <Stack>
                      <Radio value="Gryffindor">Gryffindor</Radio>
                      <Radio value="Ravenclaw">Ravenclaw</Radio>
                      <Radio value="Slytherin">Slytherin</Radio>
                      <Radio value="Hufflepuff">Hufflepuff</Radio>
                    </Stack>
                  </RadioGroup>
                </div>
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl>
                {/* Profile Picture */}
                <FormLabel>Profile Picture</FormLabel>
                <form className={styles.picIn}>
                  <input
                    type="file"
                    onChange={(e) => {
                      setNewUserData({
                        ...newUserData,
                        profilePicture: e.target.files![0],
                      });
                    }}
                  />
                </form>
              </FormControl>
            </GridItem>
            <GridItem className={styles.quarThree} colSpan={2}>
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
              <div className={styles.quarter}>
                {/* Password */}
                <FormLabel>Password</FormLabel>
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
              <FormControl>
                <div className={styles.quarter}>
                  <FormLabel>Roll Number</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) => {
                      setNewUserData({
                        ...newUserData,
                        rollNumber: e.target.value,
                      });
                    }}
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
              </FormControl>
            </GridItem>
          </SimpleGrid>
        </ModalBody>

        <ModalFooter className={styles.modalFooter}>
          <Button
            className={styles.modalAdd}
            onClick={async () => {
              // validation logic:
              console.log("x");

              if (newUserData.name.trim() == "") {
                toast({
                  title: "Name field empty",
                  description: "Please enter a name",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                });
                return;
              } else if (newUserData.email.trim() == "") {
                toast({
                  title: "Email field empty",
                  description: "Please enter an email",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                });
                return;
              } else if (newUserData.password.trim() == "") {
                toast({
                  title: "Password field empty",
                  description: "Please enter a password",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                });
                return;
              } else if (newUserData.rollNumber.trim() == "") {
                toast({
                  title: "Roll Number field empty",
                  description: "Please enter a roll number",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                });
                return;
              } else if (newUserData.phone.trim() == "") {
                toast({
                  title: "Phone field empty",
                  description: "Please enter a phone number",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                });
                return;
              } else if (!newUserData.role) {
                toast({
                  title: "Role field empty",
                  description: "Please select a role",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                });
                return;
              }
              // for images
              else if (newUserData.profilePicture === null) {
                toast({
                  title: "Profile Picture field empty",
                  description: "Please select a profile picture",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                });
                return;
              } else {
                // validation successful
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
                mutate("/api/users");
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

export default NewUserModal;
