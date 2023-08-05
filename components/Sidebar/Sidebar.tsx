import React from "react";
import styles from "./Sidebar.module.css";

import AppTitle from "../AppTitle/AppTitle";
import sideBarItemStyles from "@/components/SidebarItem/SidebarItem.module.css";
import classNames from "classnames";
import { signOut } from "next-auth/react";

import dynamic from "next/dynamic";

function Sidebar({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: React.ReactNode;
}) {
  let isMobile = window.innerWidth < 768;

  return (
    // contraction and retraction of sidebar
    <div
      className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}
    >
      {/* Sidebar content goes here */}
      <div className={styles.menu}>
        {/* Header of sidebar */}
        <div>
          {!isMobile && <AppTitle sizeNumber={2.5} />}
          <br />
          <nav>{children}</nav>
        </div>

        {/* Footer of the sidebar! */}
        <button
          className={classNames(styles.logOut, sideBarItemStyles.item)}
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

// export default Sidebar in new manner:
export default dynamic(() => Promise.resolve(Sidebar), {
  ssr: false,
});
