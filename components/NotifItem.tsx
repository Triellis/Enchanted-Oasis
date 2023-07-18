import { Flex, Avatar, Badge, Text, Box, Spacer } from "@chakra-ui/react";
import React from "react";
import styles from "./NotifItem.module.css";
import { CalendarIcon, EmailIcon, TimeIcon, ViewIcon } from "@chakra-ui/icons";

export default function NotifItem() {
  return (
    <div className={styles.notifItem}>
      {/* Modal for opening the notification */}
      <div className={styles.header}>
        {/* Avatar, name, email */}
        <Flex gap={4}>
          <Avatar src="https://bit.ly/sage-adebayo" />
          <div>
            <Text fontWeight="bold">Segun Adebayo</Text>
            <Text fontSize="sm" color={"hsl(var(--nc)  )"}>
              UI Engineer
            </Text>
          </div>
        </Flex>
      </div>
      <div className={styles.body}>
        {/* Title and Content */}
        <span className={styles.title}>
          <Text fontWeight="bold" fontSize="1.2em">
            Hello Moms
          </Text>
        </span>
        <Text fontSize="md" color={"hsl(var(--pc) /70% )"}>
          I will come to your house and fuck your mom with her computer ...
        </Text>
      </div>
      <div className={styles.footer}>
        {/* Date and time without icons */}

        <Text fontSize="sm" color="hsl(var(--nc) )">
          12:00pm • 12/12/2021
        </Text>

        {/* Badge */}
        <Flex>
          <div className={styles.badgesWrapper}>
            <Badge colorScheme="green">New</Badge>
            <Badge colorScheme="blue"> Student</Badge>
            <Badge colorScheme="pink"> custom label </Badge>
          </div>
          <Spacer />
          <div className={styles.viewsDisplay}>
            2.1M<span className={styles.viewsText}>views</span>
          </div>
        </Flex>
      </div>
    </div>
  );
}
