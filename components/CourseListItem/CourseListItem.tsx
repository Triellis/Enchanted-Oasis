import React from "react";

import styles from "./CourseListItem.module.css";
import {
  Button,
  IconButton,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { CourseListItemData } from "@/lib/types";
import classNames from "classnames";

// modal to confirm user deletion:
function ConfirmDelModal({
  isOpen,
  onOpen,
  onClose,
  course,
}: {
  isOpen: any;
  onOpen: any;
  onClose: any;
  course: CourseListItemData;
}) {
  return (
    <>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent bg="hsl(var(--b1))">
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete the course:{" "}
            <span className={styles.name}>{course.name}</span>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={onClose}
              className={classNames(styles.delCourse, "clicky")}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default function CourseListItem({
  course,
}: {
  course: CourseListItemData;
}) {
  // item backend goes here
  const enrollmentMode = false;
  const {
    isOpen: isDelOpen,
    onOpen: onDelOpen,
    onClose: onDelClose,
  } = useDisclosure();

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
                onClick={onDelOpen}
              />
            </div>
          )}
        </div>
      </ListItem>

      <ConfirmDelModal
        isOpen={isDelOpen}
        onOpen={onDelOpen}
        onClose={onDelClose}
        course={course}
      />
    </div>
  );
}
