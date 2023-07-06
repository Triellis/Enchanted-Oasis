import {
  Card,
  CardBody,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Avatar,
} from "@chakra-ui/react";
import React from "react";
import styles from "./Nav.module.css";
import { HamburgerIcon, PhoneIcon } from "@chakra-ui/icons";

const Nav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className={styles.navbar}>
      {/* Hamburger Icon */}
      <div className={styles.hamButton}>
        <Button onClick={onOpen}>
          <HamburgerIcon />
        </Button>
      </div>

      {/* Search Bar */}
      <div className={styles.searchBar}>
        <FormControl id="search" >
          <InputGroup>
            <Input type="text" placeholder="Search" />
            <InputRightElement pointerEvents="none">
              <PhoneIcon color="gray.300" />
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </div>

      {/* Avatar */}
      <div>
        <Avatar bg="red.500" />
      </div>
    </div>
  );
};

export default Nav;
