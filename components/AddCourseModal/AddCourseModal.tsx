import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Textarea,
} from "@chakra-ui/react";

import React, { useState, useReducer } from "react";
import styles from "./AddCourseModal.module.css";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

type scheduleEntry = {
  day: string;
  startTime: string;
  endTime: string;
};
type scheduleList = scheduleEntry[];


// component for the scheduleList:
function ScheduleList() {
  return (
    <div className={styles.when}>
      <ScheduleEntry onAdd={() => {}} onRemove={() => {}} />
    </div>
  );
}


// component to for tne entries for the schedule:
function ScheduleEntry({ onAdd, onRemove }: any) {
  const week = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className={styles.time}>
      <div>
        <Select variant="filled" className={styles.days}>
          {week.map((day, index) => (
            <option className={styles.dayEntry} key={index} value={day}>
              {day}
            </option>
          ))}
        </Select>
      </div>
      <div className={styles.entry}>
        <Input type="time" />
        To
        <Input type="time" />
      </div>

      <div className={styles.dup}>
        <IconButton aria-label="Add Time" icon={<AddIcon />} onClick={onAdd} />
        <IconButton
          aria-label="Add Time"
          icon={<MinusIcon />}
          onClick={onRemove}
        />
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
          <NumberInput allowMouseWheel keepWithinRange defaultValue={0} min={0}>
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
        size={{ base: "full", md: "3xl" }}
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
                <ScheduleList />
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
