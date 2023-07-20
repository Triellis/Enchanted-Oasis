import React from "react";
import styles from "./IconPrevious.module.css";

import { RxDashboard } from "react-icons/rx";
import { FiUsers } from "react-icons/fi";
import { BsHouses } from "react-icons/bs";
import { IoLibraryOutline } from "react-icons/io5";

export default function IconPrev({ text }: { text: string }) {
  if (text === "Dashboard") {
    return (
      <div className={styles.icon}>
        <RxDashboard />
      </div>
    );
  } else if (text === "Users") {
    return (
      <div className={styles.icon}>
        <FiUsers />
      </div>
    );
  } else if (text === "Houses") {
    return (
      <div className={styles.icon}>
        <BsHouses />
      </div>
    );
  } else if (text === "Courses") {
    return (
      <div className={styles.icon}>
        <IoLibraryOutline />
      </div>
    );
  }
}
