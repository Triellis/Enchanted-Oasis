import Link from "next/link";
import styles from "./SidebarItem.module.css";
import { Router, useRouter } from "next/router";
import classNames from "classnames";

import IconPrev from "./IconPrevious";

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
