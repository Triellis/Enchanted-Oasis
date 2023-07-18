import {
  Flex,
  Avatar,
  Badge,
  Text,
  Box,
  IconButton,
  Tag,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  ModalFooter,
} from "@chakra-ui/react";
import React from "react";
import styles from "./NotifItem.module.css";
import { CalendarIcon, EmailIcon, TimeIcon } from "@chakra-ui/icons";

export default function NotifItem() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <li className={styles.notifItem} onClick={onOpen}>
      {/* Avatar */}
      <Avatar src="https://bit.ly/sage-adebayo" size="lg" />
      <Box fontSize="1.2em">
        {/* Name */}
        <Text fontWeight="bold">
          Segun Adebayo
          {/* Badge */}
          {` `}
          <Badge colorScheme="green">New</Badge>
        </Text>
        {/* Email */}
        <Text fontSize="sm">admin@gmail.com</Text>
      </Box>
      {/* Content */}
      <Box className={styles.infoBox}>
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
        <div>12/12/2021</div>
        <div>12:00 PM</div>
      </Box>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        size={{ base: "xs", sm: "lg", lg: "2xl" }}
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent bg="hsl(var(--b3))">
          <ModalHeader>
            {/* Avatar, name, email */}
            <Flex>
              <Avatar src="https://bit.ly/sage-adebayo" />
              <Box ml="3">
                <Text fontWeight="bold">Segun Adebayo</Text>
                <Text fontSize="sm" color="gray">
                  UI Engineer
                </Text>
              </Box>
            </Flex>
          </ModalHeader>
          <ModalBody>
            {/* Title and Content */}
            <Box>
              <Text fontWeight="bold" fontSize="1.2em">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam
              </Text>
              <Text fontSize="md ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam
              </Text>
            </Box>
          </ModalBody>
          <ModalFooter justifyContent="flex-start" display="flex" pt="2">
            {/* Date and time without icons */}
            <Box>
              <Box>
                <Text fontSize="sm" color="gray">
                  12:00pm • 12/12/2021
                </Text>
              </Box>
              <Box>
                {/* Badge */}
                <Badge colorScheme="green">New</Badge>
              </Box>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </li>
  );
}
