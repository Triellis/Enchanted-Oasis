import { Flex, Avatar, Badge, Text, Box, IconButton, Tag } from "@chakra-ui/react";
import React from "react";
import styles from "./NotifItem.module.css";
import { CalendarIcon, EmailIcon, TimeIcon } from "@chakra-ui/icons";

export default function NotifItem() {
  return (
    <Flex className={styles.notifItem}>
      {/* Avatar */}
      <Avatar src="https://bit.ly/sage-adebayo" size="lg" />
      <Box fontSize="1.2em">
        {/* Name */}
        <Text fontWeight="bold">Segun Adebayo </Text>
        {/* Email */}
        <Text fontSize="sm">admin@gmail.com</Text>
      </Box>

      {/* Badge */}
      <Badge colorScheme="green">
        New
      </Badge>{" "}

      {/* Content */}
      <Box className={styles.infoBox} >
        {/* title */}
        <Text fontSize="sm" fontWeight="bold" className={styles.title}>
          Lorem ipsum dolor sit amet consectetur adipisicing
        </Text>
        {/* content */}
        <Text fontSize="sm" className={styles.content}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        </Text>
      </Box>

      {/* Taget Audience*/}
      <Box className={styles.targetAudience}>
        <Text fontWeight="bold">Target</Text>
        <Tag>Student</Tag>
      </Box>

      {/* Date and time */}
      <Box className={styles.dateAndTime}>
        <div>
          <TimeIcon /> {` `}12/12/2021
        </div>
        <div>
          <CalendarIcon /> {` `} 12:00 PM
        </div>
      </Box>

    </Flex>
  );
}
