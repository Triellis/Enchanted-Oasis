import React, { useState } from "react";

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
  useToast,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { CourseListItemData } from "@/lib/types";
import { useRouter } from "next/router";
import classNames from "classnames";
import { motion } from "framer-motion";
import MotionDiv from "../MotionDiv";

// api call to delete course:
async function deleteCourse(
  courseID: string,
  toast: any,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  course: CourseListItemData,
  mutate: any,
  onClose: any
) {
  setIsLoading(true);
  const res = await fetch(`/api/course/${courseID}`, {
    method: "DELETE",
  });

  if (res.ok) {
    toast({
      title: "Course deleted.",
      description: `The course ${course.name} has been deleted.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    mutate();
  } else {
    toast({
      title: "Error deleting course.",
      description: `The course ${course.name} could not be deleted.`,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }
  onClose();
  setIsLoading(false);
}

// modal to confirm user deletion:
function ConfirmDelModal({
  isOpen,
  onOpen,
  onClose,
  course,
  mutate,
}: {
  isOpen: any;
  onOpen: any;
  onClose: any;
  course: CourseListItemData;
  mutate: () => void;
}) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

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
              isLoading={isLoading}
              onClick={() => {
                deleteCourse(
                  course._id.toString(),
                  toast,
                  setIsLoading,
                  course,
                  mutate,
                  onClose
                );
              }}
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
  mutate,
  adminMode,
  linkMode,
  transition,
}: {
  course: CourseListItemData;
  mutate: () => void;
  linkMode: "overview" | "enrolled";
  adminMode?: boolean;
  transition?: any;
}) {
  const router = useRouter();
  // const adminMode = true;
  const {
    isOpen: isDelOpen,
    onOpen: onDelOpen,
    onClose: onDelClose,
  } = useDisclosure();

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  let link =
    linkMode == "overview"
      ? `/Everyone/CoursePage/${course._id} `
      : `/Everyone/MyCoursePage/${course._id}`;

  return (
    <MotionDiv
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      transition={transition}
      className={styles.courseListItem}
    >
      <ListItem border={"none"}>
        <div className={styles.itemWrapper}>
          <div
            className={styles.courseInfo}
            tabIndex={1}
            onClick={() => {
              router.push(link);
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

          {adminMode && (
            <div className={styles.coursePlay}>
              {/* add butotn */}
              <IconButton
                isRound
                variant="outline"
                aria-label="Add course"
                className={classNames(styles.courseDel, "clicky")}
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
        mutate={mutate}
      />
    </MotionDiv>
  );
}
