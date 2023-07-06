import {
  useDisclosure,
  Button,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Avatar,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  SunIcon,
  Search2Icon,
  MoonIcon,
} from "@chakra-ui/icons";

import React from "react";
import styles from "./Nav.module.css";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

function Nav({ onToggle }: { onToggle: () => void }) {
  // for the drawer:

  // for the dark mode - light mode toggle:
  const [isSunIcon, setIsSunIcon] = useState(true);
  const { colorMode, toggleColorMode } = useColorMode();
  const session = useSession();
  const modeChange = () => {
    setIsSunIcon((prev) => !prev);
    toggleColorMode();
  };

  return (
    <div className={styles.navbar}>
      {/* Hamburger Icon */}
      <div className={styles.hamButton}>
        <Button onClick={onToggle}>
          <HamburgerIcon />
        </Button>
      </div>
      {/* Search Bar */}
      <div className={styles.searchBar}>
        <FormControl id="search">
          <InputGroup>
            <Input type="text" placeholder="Search" />
            <InputRightElement pointerEvents="none">
              <Search2Icon />
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </div>

      {/* Last Group of Icons */}
      <div className={styles.endGroup}>
        {/* Dark Mode - Light Mode toggle */}
        <IconButton
          variant="filled"
          colorScheme="teal"
          aria-label="Call Sage"
          fontSize="20px"
          icon={isSunIcon ? <SunIcon /> : <MoonIcon />}
          onClick={modeChange}
        />

        {/* Avatar */}
        <Menu>
          <MenuButton>
            <Avatar src={session.data?.user?.image!} />
          </MenuButton>
          <MenuList className={styles.customList}>
            <MenuItem>Download</MenuItem>
            <MenuItem>Create a Copy</MenuItem>
            <MenuItem>Mark as Draft</MenuItem>
            <MenuItem>Delete</MenuItem>
            <MenuItem onClick={() => signOut()}>Sign out </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
}

export default Nav;
