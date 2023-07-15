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
  useToast,
} from "@chakra-ui/react";

import styles from "./NewUserModal.module.css";
import { Role, SentUserDataFromClient } from "@/lib/types";
import { profile } from "console";

interface NewUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  mutate: () => void;
  newUserData: SentUserDataFromClient;
  setNewUserData: React.Dispatch<React.SetStateAction<SentUserDataFromClient>>;
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

export default function NewUserModal({
  isOpen,
  onClose,
  mutate,
  newUserData,
  setNewUserData,
}: NewUserModalProps) {
  // for the overlay
  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  const toast = useToast();
  const houses = ["Gryffindor", "Ravenclaw", "Hufflepuff", "Slytherin"];

  // for the name of the profile picture
  const [imageName, setImageName] = useState("No Image Selected");

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
                      {["Student", "Faculty", "Admin"].map((role) => (
                        <Radio
                          key={role}
                          value={role}
                          onChange={(e) =>
                            setNewUserData({
                              ...newUserData,
                              role: e.target.value as Role,
                            })
                          }
                        >
                          {role}
                        </Radio>
                      ))}
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
                      {houses.map((house) => (
                        <Radio
                          key={house}
                          value={house}
                          onChange={(e) =>
                            setNewUserData({
                              ...newUserData,
                              house: e.target.value,
                            })
                          }
                        >
                          {house}
                        </Radio>
                      ))}
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
                  <label
                    htmlFor="myFileInput"
                    className={styles.customFileLabel}
                  >
                    {imageName}
                  </label>
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
                onClose();
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
