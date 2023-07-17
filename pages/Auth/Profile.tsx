import Image from "next/image";
import React, { useState } from "react";

import styles from "./Profile.module.css";
import Layout from "../Layout";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
  UseToastOptions,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { AtSignIcon, PhoneIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { fetcher, getRoleColor } from "@/lib/functions";
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

function Loading() {
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
  toast: any
) {
  if (newPassword !== confirmPassword) {
    toast({
      title: "Passwords do not match",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
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
          <FormControl>
            <FormLabel>Old Password</FormLabel>
            <Input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>New Password</FormLabel>
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter className={styles.modalFooter}>
          <Button
            style={{
              backgroundColor: "hsl(var(--s))",
              color: "hsl(var(--sc))",
            }}
            onClick={() =>
              changePassPost(
                oldPassword,
                newPassword,
                confirmPassword,
                onClose,
                toast
              )
            }
          >
            Change
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
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
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  user: ReceivedUserDataOnClient;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"sm"} isCentered>
      <ModalOverlay bg="blackAlpha.500" backdropFilter="blur(10px)" />
      <ModalContent
        style={{
          backgroundColor: "hsl(var(--b2))",
        }}
      >
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalCloseButton />

        {/* contents of the modal */}
        <ModalBody>hello there</ModalBody>

        {/* footer of the modal */}
        <ModalFooter className={styles.modalFooter}>
          <Button
            style={{
              backgroundColor: "hsl(var(--s))",
              color: "hsl(var(--sc))",
            }}
          >
            Save Changes
          </Button>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function ProfileComponent({ user }: { user: ReceivedUserDataOnClient }) {
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
            <AtSignIcon /> {user.phone}
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
  const { user, isLoading, error } = useProfile();
  let componentToRender;
  if (isLoading) {
    componentToRender = <Loading />;
  } else if (error) {
    componentToRender = <div>Error</div>;
  } else {
    componentToRender = <ProfileComponent user={user} />;
  }

  return (
    <>
      <Layout>{componentToRender}</Layout>
    </>
  );
}
