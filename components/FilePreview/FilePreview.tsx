import React from "react";
import styles from "./FilePreview.module.css";
import { AddIcon } from "@chakra-ui/icons";

export default function FilePreview({ url }: { url: string }) {
  // fetch the name and type of the file from the url and then display it:
  const name = url.split("/").pop();
  const type = name?.split(".").pop();
  const icon = <AddIcon />;

  return (
    <button
      className={styles.pill}
      onClick={() => {
        window.open(url, "_blank");
      }}
    >
      {/* a pill shaped component to show file */}
      <div className={styles.icon}>{icon}</div>
      <div className={styles.fileName}>{name}</div>
      <div>{type}</div>
    </button>
  );
}
