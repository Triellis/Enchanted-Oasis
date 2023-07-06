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
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import styles from "./Nav.module.css";
import {
  HamburgerIcon,
  SunIcon,
  Search2Icon,
  ChevronDownIcon,
} from "@chakra-ui/icons";

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

        <Menu>
          <MenuButton>
            <Avatar bg="red.500" />
          </MenuButton>
          <MenuList className={styles.customList}>
            <MenuItem>Download</MenuItem>
            <MenuItem>Create a Copy</MenuItem>
            <MenuItem>Mark as Draft</MenuItem>
            <MenuItem>Delete</MenuItem>
            <MenuItem>Attend a Workshop</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};

export default Nav;
