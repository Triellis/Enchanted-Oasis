import React from "react";
import styles from "./IconPrevious.module.css";

import { RxDashboard } from "react-icons/rx";
import { FiUsers } from "react-icons/fi";
import { BsHouses } from "react-icons/bs";
import { IoLibraryOutline } from "react-icons/io5";
import { MdLogout, MdOutlineEmail } from "react-icons/md";
import { CgProfile, CgRename } from "react-icons/cg";
import { FiEdit } from "react-icons/fi";
import { PiPasswordBold } from "react-icons/pi";

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
  } else if (text === "Logout" || text === "Sign Out") {
    return (
      <div className={styles.icon}>
        <MdLogout />
      </div>
    );
  } else if (text === "Profile") {
    return (
      <div className={styles.icon}>
        <CgProfile />
      </div>
    );
  } else if (text === "Edit") {
    return (
      <div className={styles.icon}>
        <FiEdit />
      </div>
    );
  } else if (text === "Name") {
    return (
      <div className={styles.icon}>
        <CgRename />
      </div>
    );
  } else if (text === "Email") {
    return (
      <div className={styles.icon}>
        <MdOutlineEmail />
      </div>
    );
  } else if (text === "Password") {
    return (
      <div className={styles.icon}>
        <PiPasswordBold />
      </div>
    );
  }
}
