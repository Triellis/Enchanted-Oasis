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
  Text,
} from "@chakra-ui/react";
import { AtSignIcon, PhoneIcon, ArrowRightIcon } from "@chakra-ui/icons";

export default function Profile() {
  const isAdmin = false;
  let house = "Gryffindor";

  return (
    <>
      <Layout>
        <div className={styles.container}>
          {/* header with profile photo, name, email, role */}
          <div className={styles.header}>
            {/* profile */}
            <Avatar
              src="https://bit.ly/sage-adebayo"
              size={{ base: "lg", md: "xl", lg: "2xl" }}
            />

            {/* information */}
            <Box ml="1">
              <Text fontWeight="bold" className={styles.name}>
                Segun Adebayo
                <Badge colorScheme="teal" className={styles.role}>
                  Student
                </Badge>
              </Text>
              <Text className={styles.email} fontWeight="light">
                student@gmail.com
              </Text>
            </Box>
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
                <PhoneIcon /> +91 9876543210
              </Text>
            </div>

            {/* roll number */}
            <div className={styles.roll}>
              <div>Roll Number</div>
              <Text>
                {" "}
                <AtSignIcon /> HG2240041
              </Text>
            </div>

            {/* house */}
            <div className={styles.house}>
              <div>House</div>
              <Text>
                {" "}
                <ArrowRightIcon />
                {house}
              </Text>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
