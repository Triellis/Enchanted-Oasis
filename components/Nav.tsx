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
  IconButton,
} from "@chakra-ui/react";
import React from "react";
import styles from "./Nav.module.css";
import { HamburgerIcon, SunIcon, Search2Icon } from "@chakra-ui/icons";

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
        <FormControl id="search">
          <InputGroup>
            <Input type="text" placeholder="Search" />
            <InputRightElement pointerEvents="none">
              <Search2Icon color="gray.300" />
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </div>

      {/* Dark Mode - Light Mode toggle */}
        {/* Avatar */}
      <div className={styles.endGroup}>
        <IconButton
          variant="outline"
          colorScheme="teal"
          aria-label="Call Sage"
          fontSize="20px"
          icon={<SunIcon />}
        />
        <Avatar bg="red.500" />
      </div>

    </div>
  );
};

export default Nav;
