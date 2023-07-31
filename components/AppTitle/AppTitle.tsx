import React from "react";
import styles from "./AppTitle.module.css";

export default function AppTitle({ fontSize }: { fontSize?: number }) {
  const titleSize = {
    fontSize: `"${fontSize}rem"`,
  };
  return (
    <h1 style={titleSize} className={styles.appName}>
      Enchanted Oasis
    </h1>
  );
}
