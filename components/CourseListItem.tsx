import React from "react";

import styles from "./CourseListItem.module.css";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  IconButton,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

export default function CourseListItem({
  _id,
  name,
  code,
  descripton,
  credits,
}: any) {
  // item backend goes here

  return (
    <li className={styles.courseListItem}>
      <AccordionItem>
        <div className={styles.itemWrapper}>
          <AccordionButton className={styles.openClose}>
            <AccordionIcon />
          </AccordionButton>

          <div className={styles.courseInfo}>
            {/* course name */}
            <div className={styles.courseName}>{name}</div>
            {/* course code */}
            <div className={styles.courseCode}>{code}</div>
            {/* course credits */}
            <div className={styles.courseCredits}>{credits}</div>
          </div>

          <div className={styles.coursePlay}>
            {/* add butotn */}
            <IconButton
              isRound
              variant="outline"
              aria-label="Add course"
              className={styles.courseAdd}
              icon={<AddIcon />}
            />
            {/* remove button */}
            <IconButton
              isRound
              variant="outline"
              aria-label="Remove Course"
              className={styles.courseRemove}
              icon={<MinusIcon />}
            />
          </div>
        </div>

        <AccordionPanel pb={4} className={styles.courseDesc} >{descripton}</AccordionPanel>
      </AccordionItem>
    </li>
  );
}
