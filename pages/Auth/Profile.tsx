import React, { useEffect, useState } from "react";

import styles from "./Profile.module.css";
import Layout from "../Layout";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  SkeletonCircle,
  Tabs,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  AtSignIcon,
  PhoneIcon,
  ArrowRightIcon,
  LockIcon,
  CheckCircleIcon,
  SettingsIcon,
} from "@chakra-ui/icons";
import { editUser, fetcher, getRoleColor } from "@/lib/functions";
import useSWR from "swr";
import { ReceivedUserDataOnClient } from "@/lib/types";
import classNames from "classnames";

function useProfile() {
  const { data, error, isLoading, mutate } = useSWR("/api/user", fetcher);

  return {
    user: data as ReceivedUserDataOnClient,
    isLoading,
    error,
    mutate,
  };
}

function LoadingSkeleton() {
  return (
    <Box>
      <div className={styles.container}>
        {/* header with profile photo, name, email, role */}
        <div className={styles.header}>
          {/* profile */}
          <SkeletonCircle size={{ base: "24", lg: "36" }} />

          {/* information */}
          <div className={styles.prime}>
            <div className={styles.name}>
              <Skeleton height={{ base: "1em", lg: "1.5em" }}>
                Segun Adebayo
              </Skeleton>
              <Skeleton height={"1em"}> Student</Skeleton>
            </div>
            <div className={styles.email}>
              <Skeleton height={"1em"}> Student</Skeleton>
            </div>
          </div>

          <div className={styles.edit}>
            <Button
              variant="outline"
              className={classNames("clicky", styles.editProf)}
            >
              Edit Profile
            </Button>
          </div>
        </div>

        <Divider />

        {/* footer with phone, roll number, house */}
        <div className={styles.footer}>
          {/* no images only labels and text */}
          {/* phone */}
          <div className={styles.phone}>
            <div>Phone Number</div>
            <div>
              {" "}
              <PhoneIcon />{" "}
              <Skeleton height={"1em"} display={"inline-block"}>
                9876543210
              </Skeleton>
            </div>
          </div>

          {/* roll number */}
          <div className={styles.roll}>
            <div>Roll Number</div>
            <div>
              {" "}
              <AtSignIcon />{" "}
              <Skeleton height={"1em"} display={"inline-block"}>
                9876543210
              </Skeleton>
            </div>
          </div>

          {/* house */}
          <div className={styles.house}>
            <div>House</div>
            <div>
              {" "}
              <ArrowRightIcon />
              <Skeleton height={"1em"} display={"inline-block"}>
                9876543210
              </Skeleton>
            </div>
          </div>
          <Button
            className={classNames("clicky", styles.changePassword)}
            variant={"outline"}
          >
            Change Password
          </Button>
        </div>
      </div>
    </Box>
  );
}

async function changePassPost(
  oldPassword: string,
  newPassword: string,
  confirmPassword: string,
  onClose: () => void,
  toast: any,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  setIsLoading(true);
  if (newPassword !== confirmPassword) {
    toast({
      title: "Passwords do not match",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    setIsLoading(false);
    return;
  }

  const res = await fetch("/api/user/password", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      oldPassword,
      newPassword,
    }),
  });
  if (!res.ok) {
    toast({
      title: "Error",
      description: "Wrong password",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  } else {
    toast({
      title: "Password changed",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    onClose();
  }
  setIsLoading(false);
}

function ChangePasswordModal({
  isOpen,
  onOpen,
  onClose,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // step 1:
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }, [isOpen]);

  const toast = useToast();
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"sm"} isCentered>
      <ModalOverlay bg="blackAlpha.500" backdropFilter="blur(10px)" />
      <ModalContent
        style={{
          backgroundColor: "hsl(var(--b2))",
        }}
      >
        <ModalHeader>Change Password</ModalHeader>
        <ModalCloseButton />
        <ModalBody className={styles.modal}>
          {/* old password */}
          <FormControl>
            <FormLabel>Old Password</FormLabel>

            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SettingsIcon />
              </InputLeftElement>
              <Input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </InputGroup>
          </FormControl>

          {/* new password */}
          <FormControl>
            <FormLabel>New Password</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <LockIcon />
              </InputLeftElement>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </InputGroup>
          </FormControl>

          {/* confirm password */}
          <FormControl>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <CheckCircleIcon />
              </InputLeftElement>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </InputGroup>
          </FormControl>
        </ModalBody>

        <ModalFooter className={styles.modalFooter}>
          <Button className="modalNoBtn" onClick={onClose}>
            Cancel
          </Button>
          <Button
            isLoading={isLoading}
            className="modalYesBtn"
            onClick={() => {
              changePassPost(
                oldPassword,
                newPassword,
                confirmPassword,
                onClose,
                toast,
                setIsLoading
              );
            }}
          >
            Change
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function EditProfileModal({
  isOpen,
  onOpen,
  onClose,
  user,
  mutate,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  user: ReceivedUserDataOnClient;
  mutate: () => void;
}) {
  const [newUserData, setNewUserData] = useState<{
    phone: string;
    profilePicture: File | null;
  }>({
    phone: user.phone,
    profilePicture: null,
  });
  useEffect(() => {
    setNewUserData({
      phone: user.phone,
      profilePicture: null,
    });
  }, [isOpen]);

  const toast = useToast();
  // for the profile picture:
  const [imageName, setImageName] = useState("No Image Selected");
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"sm"} isCentered>
      <ModalOverlay bg="blackAlpha.500" backdropFilter="blur(10px)" />
      <ModalContent
        style={{
          backgroundColor: "hsl(var(--b2))",
        }}
      >
        <ModalHeader>Edit Profile</ModalHeader>

        {/* contents of the modal */}
        <ModalBody>
          {/* profile photo */}

          <FormLabel>New Avatar</FormLabel>
          <form className={styles.picIn}>
            <label htmlFor="myFileInput" className={styles.customFileLabel}>
              {imageName}
            </label>
            <input
              type="file"
              id="myFileInput"
              accept=".jpg,.jpeg,.png"
              className={styles.customFileInput}
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

          {/* phone number */}
          <FormLabel mt="1.5em">New Phone Number</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <PhoneIcon />
            </InputLeftElement>
            <Input
              value={newUserData.phone}
              onChange={(e) =>
                setNewUserData({
                  ...newUserData,
                  phone: e.target.value,
                })
              }
            />
          </InputGroup>
        </ModalBody>

        {/* footer of the modal */}
        <ModalFooter className={styles.modalFooter}>
          <Button
            className="modalNoBtn"
            onClick={() => {
              onClose();
              setImageName("No Image Selected");
            }}
          >
            Discard Changes
          </Button>
          <Button
            isLoading={isLoading}
            className="modalYesBtn"
            onClick={async () => {
              setIsLoading(true);
              const res = await editUser(newUserData as any);
              if (res.ok) {
                toast({
                  title: "Profile Updated",
                  description: "Your profile has been updated successfully",
                  status: "success",
                  duration: 3000,
                  isClosable: true,
                });
                mutate();
                onClose();
              } else {
                toast({
                  title: "Error",
                  description: await res.text(),
                  status: "error",
                  duration: 3000,
                  isClosable: true,
                });
              }
              setIsLoading(false);
              setImageName("No Image Selected");
            }}
          >
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function ProfileComponent({
  user,
  mutate,
}: {
  user: ReceivedUserDataOnClient;
  mutate: any;
}) {
  const {
    isOpen: isChangePassOpen,
    onOpen: onOpenChangePass,
    onClose: onCloseChangePass,
  } = useDisclosure();

  const {
    isOpen: isEditProfileOpen,
    onOpen: onOpenEditProfile,
    onClose: onCloseEditProfile,
  } = useDisclosure();

  return (
    <div className={styles.container}>
      {/* header with profile photo, name, email, role */}
      <div className={styles.header}>
        {/* profile */}
        <div className={styles.meInfo}>
          <Avatar src={user.profilePicture} size={{ base: "xl", lg: "2xl" }} />

          {/* information */}
          <div className={styles.prime}>
            <Text fontWeight="bold" className={styles.name}>
              {user.name}
              <Badge
                colorScheme={getRoleColor(user.role)}
                className={styles.role}
              >
                {user.role}
              </Badge>
            </Text>
            <Text className={styles.email} fontWeight="light">
              {user.email}
            </Text>
          </div>
        </div>
        <div className={styles.edit}>
          <Button
            variant="outline"
            className={classNames("clicky", styles.editProf)}
            onClick={onOpenEditProfile}
          >
            Edit Profile
          </Button>
        </div>

        <EditProfileModal
          isOpen={isEditProfileOpen}
          onOpen={onOpenEditProfile}
          onClose={onCloseEditProfile}
          user={user}
          mutate={mutate}
        />
      </div>

      <Divider />

      {/* footer with phone, roll number, house */}
      <div className={styles.footer}>
        {/* no images only labels and text */}
        {/* phone */}
        <div className={styles.phone}>
          <div>Phone Number</div>
          <Text>
            {" "}
            <PhoneIcon /> {user.phone}
          </Text>
        </div>

        {/* roll number */}
        <div className={styles.roll}>
          <div>Roll Number</div>
          <Text>
            {" "}
            <AtSignIcon /> {user.rollNumber ? user.rollNumber : " None"}
          </Text>
        </div>

        {/* house */}
        <div className={styles.house}>
          <div>House</div>
          <Text>
            {" "}
            <ArrowRightIcon />
            {user.house ? user.house : " None"}
          </Text>
        </div>
        <Button
          className={classNames("clicky", styles.changePassword)}
          variant={"outline"}
          onClick={onOpenChangePass}
        >
          Change Password
        </Button>
        <ChangePasswordModal
          isOpen={isChangePassOpen}
          onOpen={onOpenChangePass}
          onClose={onCloseChangePass}
        />
      </div>
    </div>
  );
}

export default function Profile() {
  const { user, isLoading, error, mutate } = useProfile();
  let componentToRender;
  if (isLoading) {
    componentToRender = <LoadingSkeleton />;
  } else if (error) {
    componentToRender = <div>Error</div>;
  } else {
    componentToRender = <ProfileComponent mutate={mutate} user={user} />;
  }

  return (
    <>
      <Layout>{componentToRender}</Layout>
    </>
  );
}
