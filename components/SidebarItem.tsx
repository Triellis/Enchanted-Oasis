import Link from "next/link";
import styles from "./SidebarItem.module.css";
import { Router, useRouter } from "next/router";
import classNames from "classnames";

import { RxDashboard } from "react-icons/rx";
import { FiUsers } from "react-icons/fi";
import { BsHouses } from "react-icons/bs";
import { IoLibraryOutline } from "react-icons/io5";

function IconPrev({ text }: { text: string }) {
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

export default function SidebarItem({
  text,
  linkTo,
}: {
  text: string;
  linkTo: string;
}) {
  const router = useRouter();

  return (
    <div>
      <Link
        className={classNames(
          styles.item,
          linkTo === router.pathname ? styles.active : ""
        )}
        href={linkTo}
      >
        <IconPrev text={text} />
        {text}
      </Link>
    </div>
  );
}
