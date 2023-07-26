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
} from "@chakra-ui/react";
import { HamburgerIcon, BellIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
import styles from "./Nav.module.css";

import Link from "next/link";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import classNames from "classnames";
import useSWR from "swr";
import { fetcher } from "@/lib/functions";
import { MySession, ReceivedUserDataOnClient } from "@/lib/types";
import { useAppSelector } from "@/lib/hooks";

function HamburgerIconAnimated() {
  const isSidebarOpen = useAppSelector((state) => state.isSidebarOpen.value);

  return (
    <div
      className={classNames(
        styles.hamburger,
        isSidebarOpen && styles.hamburgerOpen
      )}
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}

function useUser() {
  const { data, isLoading, error } = useSWR("/api/user", fetcher, {
    refreshInterval: 1000,
  });
  return {
    userJson: data as ReceivedUserDataOnClient,
    isUserLoading: isLoading,
    error,
  };
}

function Nav({
  onToggle,
  toggleTheme,
}: {
  onToggle: () => void;
  toggleTheme: () => void;
}) {
  const { userJson, isUserLoading, error: userError } = useUser();
  const session = useSession();
  const sessionData = session.data as MySession;

  let notificationCountComponent;

  if (isUserLoading || session.status !== "authenticated") {
    notificationCountComponent = "";
  } else {
    const count = Number(userJson.unseenNotificationsCount);
    if (count === 0 || !count) {
      notificationCountComponent = "";
    } else {
      notificationCountComponent = (
        <span className={styles.notifCount}>{count}</span>
      );
    }
  }

  // for changing the icon of the button:
  const [sun, setSun] = React.useState(true);

  return (
    <div className={styles.navbar}>
      {/* Hamburger Icon */}
      <div className={styles.hamDiv}>
        <Button onClick={onToggle} className={styles.hamButton}>
          <HamburgerIconAnimated />
        </Button>
      </div>

      {/* Last Group of Icons */}
      <div>
        <div className={styles.endGroup}>
          <Link href={`/${sessionData?.user.role}/Dashboard`}>
            <button
              className={classNames(styles.notificationIndicator, "clicky")}
            >
              <BellIcon
                h={4}
                className={notificationCountComponent && styles.ringBell}
              />
              {notificationCountComponent}
            </button>
          </Link>

          <IconButton
            aria-label="color mode"
            fontSize="20px"
            onClick={() => {
              toggleTheme();
              setSun((prev) => !prev);
            }}
            className={styles.themeButton}
            icon={sun ? <SunIcon /> : <MoonIcon />}
          />

          <Menu>
            <MenuButton className="clicky">
              {/* Avatar */}
              <Avatar
                src={
                  isUserLoading || !userJson
                    ? session.data?.user?.image!
                    : userJson.profilePicture
                }
              />
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
              <MenuItem
                className={styles.menuOut}
                onClick={() => signOut()}
                color={"rgb(255,69,0)"}
              >
                Logout{" "}
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default Nav;
