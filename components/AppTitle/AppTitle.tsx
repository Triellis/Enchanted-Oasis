import React from "react";
import styles from "./AppTitle.module.css";
import { useRouter } from "next/router";

export default function AppTitle({ sizeNumber }: { sizeNumber?: number }) {
  const titleSize = {
    fontSize: `${sizeNumber}em`,
  };

  const router = useRouter();

  return (
    <div className={styles.appTitle}>
      <button
        style={titleSize}
        className={styles.appName}
        onClick={() => {
          router.push("/");
        }}
      >
        Enchanted Oasis
      </button>
    </div>
  );
}