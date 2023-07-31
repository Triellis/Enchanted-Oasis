import React from "react";
import styles from "./AppTitle.module.css";

export default function AppTitle({ sizeNumber }: { sizeNumber?: number }) {
  const titleSize = {
    fontSize: `${sizeNumber}em`,
  };
  return (
    <div className={styles.appTitle}>
      <button
        style={titleSize}
        className={styles.appName}
        onClick={() => {
          window.location.href = "/";
        }}
      >
        Enchanted Oasis
      </button>
    </div>
  );
}
