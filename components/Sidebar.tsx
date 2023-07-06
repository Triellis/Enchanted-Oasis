import React from "react";
import { useState } from "react";
import {  } from "@chakra-ui/react";
import styles from "./Sidebar.module.css";

function Sidebar({ isOpen }: { isOpen: boolean }) {
  return (
    <div
      className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}
    >
      {/* Sidebar content goes here */}
      <ul className={styles.menu}>
        <li>Menu Item 1</li>
        <li>Menu Item 2</li>
        <li>Menu Item 3</li>
      </ul>
    </div>
  );
}

export default Sidebar;
