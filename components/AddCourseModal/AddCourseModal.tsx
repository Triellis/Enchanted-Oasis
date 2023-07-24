import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Textarea,
} from "@chakra-ui/react";

import React, { useState } from "react";
import styles from "./AddCourseModal.module.css";
import classNames from "classnames";

// component to select days for the course
function Days() {
  const [checkedItems, setCheckedItems] = useState([false, false]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div className={styles.days}>
      {daysOfWeek.map((day, i) => (
        <Checkbox
          key={i}
          isChecked={checkedItems[i]}
          onChange={(e) => {
            const newCheckedItems = [...checkedItems];
            newCheckedItems[i] = e.target.checked;
            setCheckedItems(newCheckedItems);
          }}
        >
          {day}
        </Checkbox>
      ))}
    </div>
  );
}

// component to add times to the course
function Time() {
  return <div className={styles.time}></div>;
}

// component for the form for the course information:
function CourseInfo() {
  return (
    <div className={styles.info}>
      {/* course name */}
      <FormControl>
        <FormLabel>Course Name</FormLabel>
        <Input placeholder="Enter Course Name" />
      </FormControl>

      <div className={styles.infoSub}>
        {/* course code */}
        <FormControl>
          <FormLabel>Course Code</FormLabel>
          <Input placeholder="Enter Course Name" />
        </FormControl>

        {/* credits */}
        <FormControl>
          <FormLabel>Course Credits</FormLabel>
          <NumberInput allowMouseWheel keepWithinRange min={0}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </div>

      {/* course description */}
      <div className={styles.infoDes}>
        <FormLabel>Description</FormLabel>
        <Textarea placeholder="Here is a sample placeholder" />
      </div>
    </div>
  );
}

export default function AddCourseModal({ isOpen, onClose, onOpen }: any) {
  return (
    <>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        motionPreset="slideInBottom"
        size={{ sm: "2xl", base: "xs", lg: "3xl" }}
        scrollBehavior={"inside"}
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent bg="hsl(var(--b1))">
          {/* header */}
          <ModalHeader>Add Course</ModalHeader>

          {/* modal content */}
          <ModalBody className={styles.modalBody}>
            <CourseInfo />
            <div className={styles.when}>
              <div>
                <FormLabel>Days</FormLabel>
                <Days />
              </div>
              <div>
                <FormLabel>Time</FormLabel>
                <Time />
              </div>
            </div>
          </ModalBody>

          {/* footer */}
          <ModalFooter className={styles.modalFooter}>
            <Button variant={"outline"} onClick={onClose}>
              Close
            </Button>
            <Button onClick={() => {}} bg="hsl(var(--s))">
              Add Course
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
