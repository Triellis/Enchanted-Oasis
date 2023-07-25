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
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // api call to delete course:
  async function deleteCourse(courseID: string) {
    setIsLoading(true);
    const res = await fetch(`/api/course/${courseID}`, {
      method: "DELETE",
    });

    console.log(courseID);

    if (res.ok) {
      toast({
        title: "Course deleted.",
        description: `The course ${course.name} has been deleted.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error deleting course.",
        description: `The course ${course.name} could not be deleted.`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    setIsLoading(false);
  }

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
              onClick={() => {
                deleteCourse(course._id.toString());
                onClose();
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
}: {
  course: CourseListItemData;
}) {
  const router = useRouter();
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
      />
    </div>
  );
}
