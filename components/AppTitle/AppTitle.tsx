import React from "react";
import styles from "./AppTitle.module.css";

export default function AppTitle({ sizeNumber }: { sizeNumber?: number }) {
  const titleSize = {
    fontSize: `${sizeNumber}em`,
  };
  return (
    <h1 style={titleSize} className={styles.appName}>
      Enchanted Oasis
    </h1>
  );
}
