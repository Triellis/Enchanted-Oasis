import React from "react";

import styles from "./CourseListItem.module.css";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Divider,
  IconButton,
  ListItem,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon, MinusIcon } from "@chakra-ui/icons";
import { CourseListItemData } from "@/lib/types";

export default function CourseListItem({
  course,
}: {
  course: CourseListItemData;
}) {
  // item backend goes here

  const enrollmentMode = false;

  return (
    <div className={styles.courseListItem}>
      <ListItem border={"none"}>
        <div className={styles.itemWrapper}>
          <div className={styles.courseInfo}>
            {/* course name */}
            <div className={styles.courseName}>{course.name}</div>

            <div className={styles.courseBack}>
              {/* course code */}
              <div className={styles.courseCode}>{course.code}</div>
              {/* course credits */}
              <div className={styles.courseCredits}>{course.credits}</div>
            </div>
          </div>

          {!enrollmentMode && (
            <div className={styles.coursePlay}>
              {/* add butotn */}
              <IconButton
                isRound
                variant="outline"
                aria-label="Add course"
                className={styles.courseDel}
                icon={<DeleteIcon />}
              />
            </div>
          )}
        </div>
      </ListItem>
    </div>
  );
}
