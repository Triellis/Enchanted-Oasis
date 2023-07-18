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
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@chakra-ui/react";
import React from "react";
import styles from "./NotifItem.module.css";
import { CalendarIcon, EmailIcon, TimeIcon } from "@chakra-ui/icons";

export default function NotifItem() {
  return (
    <li style={{ listStyle: "none" }}>
      <Box className={styles.notifItem} bg="hsl(var(--b3))">
        {/* Modal for opening the notification */}
        <Box>
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
        </Box>
        <Box>
          {/* Title and Content */}
          <Box>
            <Text fontWeight="bold" fontSize="1.2em">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            </Text>
            <Text fontSize="md ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            </Text>
          </Box>
        </Box>
        <Box pt="2">
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
        </Box>
      </Box>
    </li>
  );
}
