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
  color,
  MenuGroup,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  SunIcon,
  Search2Icon,
  MoonIcon,
} from "@chakra-ui/icons";
import styles from "./Nav.module.css";

import Link from "next/link";

import React from "react";
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

      {/* Last Group of Icons */}
      <div className={styles.endGroup}>
        {/* Avatar */}
        <Menu>
          <MenuButton className="clicky">
            <Avatar src={session.data?.user?.image!} />
          </MenuButton>
          <MenuList
            backgroundColor={"hsl(var(--b2))"}
            className={styles.customList}
            boxSize={""}
            borderRadius={"var(--rounded-box)"}
          >
            <Link href="/Auth/Profile" style={{ textDecoration: "none" }}>
              <MenuItem className={styles.menuItem}>My Profile</MenuItem>
            </Link>
            <MenuItem className={styles.menuItem}>Create a Copy</MenuItem>
            <MenuItem className={styles.menuItem}>Mark as Draft</MenuItem>
            <MenuItem className={styles.menuItem}>Delete</MenuItem>
            <MenuItem
              className={styles.menuOut}
              onClick={() => signOut()}
              color={"rgb(255,69,0)"}
            >
              Sign out{" "}
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
}

export default Nav;
