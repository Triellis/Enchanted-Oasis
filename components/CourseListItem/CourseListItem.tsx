import React from "react";

import styles from "./CourseListItem.module.css";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Divider,
  IconButton,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { CourseListItemData } from "@/lib/types";
import { useRouter } from "next/router";

export default function CourseListItem({
  course,
}: {
  course: CourseListItemData;
}) {
  const router = useRouter();
  const enrollmentMode = false;

  return (
    <div className={styles.courseListItem}>
      <AccordionItem border={"none"}>
        <div className={styles.itemWrapper}>
          <AccordionButton className={styles.openClose}>
            <AccordionIcon />
          </AccordionButton>

          <div
            className={styles.courseInfo}
            tabIndex={1}
            onClick={() => {
              router.push(`/Everyone/CoursePage/${course._id}`);
            }}
          >
            {/* course name */}
            <div className={styles.courseName}>{course.name}</div>

            <div className={styles.courseBack}>
              {/* course code */}
              <div className={styles.courseCode}>{course.code}</div>
              {/* course credits */}
              <div className={styles.courseCredits}>{course.credits}</div>
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
          <span className={styles.descHead}>{course.name}</span>
          <Divider className={styles.descDiv} />
          <span className={styles.descCon}>{course.description}</span>
        </AccordionPanel>
      </AccordionItem>
    </div>
  );
}
