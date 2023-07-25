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
  Stack,
  Textarea,
} from "@chakra-ui/react";

import React, { useReducer } from "react";
import styles from "./AddCourseModal.module.css";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

// initial state for the schedule list:
type ScheduleState = {
  count: number;
};

// type declaration for the actions of the schedule entry:
type ScheduleAction = { type: "ADD" } | { type: "DELETE"; index: number };

// initial state for the schedule list:
const initialState: ScheduleState = {
  count: 1,
};

// actions for the schedule entry:
function scheduleReducer(state: ScheduleState, action: ScheduleAction) {
  switch (action.type) {
    case "ADD":
      return { count: state.count + 1 };
    case "DELETE":
      if (state.count > 1) {
        return { count: state.count - 1 };
      } else {
        return state;
      }
    default:
      return state;
  }
}

// component for the list of schedule entries:
function ScheduleList() {
  const [state, dispatch] = useReducer(scheduleReducer, initialState);

  const handleAdd = () => {
    dispatch({ type: "ADD" });
  };

  const handleDelete = (index: number) => {
    dispatch({ type: "DELETE", index });
  };

  return (
    <div className={styles.scheduleList}>
      {[...Array(state.count)].map((_, index) => (
        <Schedule
          key={index}
          onAdd={handleAdd}
          onRemove={() => handleDelete(index)}
        />
      ))}
    </div>
  );
}

// component to for tne entries for the schedule:
function Schedule({ onAdd, onRemove }: any) {
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
                <FormLabel>Schedule</FormLabel>
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
