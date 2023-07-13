import React from "react";
import styles from "./Sidebar.module.css";
import SidebarItem from "./SidebarItem";
import sideBarItemStyles from "./SidebarItem.module.css";
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
          <h1 className={styles.appName}>Enchanted Oasis</h1>
          <br />
          <nav>{children}</nav>
        </div>

        {/* Footer of the sidebar */}
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
