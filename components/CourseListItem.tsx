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
  description,
  credits,
}: any) {
  // item backend goes here

  const enrollmentMode = false;

  return (
    <AccordionItem className={styles.courseListItem}>
      <div className={styles.itemWrapper}>
        <AccordionButton className={styles.openClose}>
          <AccordionIcon />
        </AccordionButton>

        <div className={styles.courseInfo}>
          {/* course name */}
          <div className={styles.courseName}>{name}</div>

          <div className={styles.courseBack}>
            {/* course code */}
            <div className={styles.courseCode}>{code}</div>
            {/* course credits */}
            <div className={styles.courseCredits}>{credits}</div>
          </div>
        </div>

        {enrollmentMode && (
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
        )}
      </div>

      <AccordionPanel pb={4} className={styles.courseDesc}>
        {description}
      </AccordionPanel>
    </AccordionItem>
  );
}
