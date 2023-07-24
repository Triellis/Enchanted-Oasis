import {
  Button,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
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
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

// component to select days for the course
function Days() {
  return <div></div>;
}

// component to add times to the course
function Time() {
  return (
    <div className={styles.time}>
      <div className={styles.timeEntry}>
        <div>
          <label>Start</label>
          <Input type="time" />
        </div>
        <div>
          <label>End</label>
          <Input type="time" />
        </div>
      </div>
      <div className={styles.duplicate}>
        <IconButton aria-label="add time" icon={<AddIcon />} />
        <IconButton aria-label="add time" icon={<MinusIcon />} />
      </div>
    </div>
  );
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
              <Flex>
                <FormLabel>Time</FormLabel>
                <Time />
              </Flex>
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
