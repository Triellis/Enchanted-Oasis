import React from "react";
import styles from "./Sidebar.module.css";

import AppTitle from "../AppTitle/AppTitle";
import sideBarItemStyles from "@/components/SidebarItem/SidebarItem.module.css";
import classNames from "classnames";
import { signOut } from "next-auth/react";

function Sidebar({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: React.ReactNode;
}) {
  return (
    // contraction and retraction of sidebar
    <div
      className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}
    >
      {/* Sidebar content goes here */}
      <div className={styles.menu}>
        {/* Header of sidebar */}
        <div>
          <AppTitle sizeNumber={2.5} />
          <br />
          <nav>{children}</nav>
        </div>

        {/* Footer of the sidebar! */}
        <button
          className={classNames(styles.logOut, sideBarItemStyles.item)}
          onClick={() => signOut()}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
