import Image from "next/image";
import React from "react";

import styles from "./Profile.module.css";
import Layout from "../Layout";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
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

function ProfileComponent({ user }: { user: ReceivedUserDataOnClient }) {
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
        >
          Change Password
        </Button>
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
