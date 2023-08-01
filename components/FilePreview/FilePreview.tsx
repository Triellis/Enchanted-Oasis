import React from "react";
import styles from "./FilePreview.module.css";
import { AddIcon } from "@chakra-ui/icons";
import { getLinkPreview, getPreviewFromContent } from "link-preview-js";

import Link from "next/link";
function FileComponent({ data }: { data: LinkPreviewData }) {
  return (
    <div className={styles.fileComponent}>
      <div className={styles.fileInfo}>
        <div className={styles.fileName}>{data.title}</div>
      </div>
    </div>
  );
}
export default function FilePreview({ url }: { url: string }) {
  // fetch the name and type of the file from the url and then display it:
  const name = url.split("/").pop();
  const type = name?.split(".").pop();
  const icon = <AddIcon />;
  getLinkPreview("https://www.youtube.com/watch?v=MejbOFk7H6c").then((data) =>
    console.debug(data)
  );
  let preview;

  return preview;
}
