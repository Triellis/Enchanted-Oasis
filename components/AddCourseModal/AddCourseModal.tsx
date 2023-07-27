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
import { CourseCol, Day } from "@/lib/types";
type CourseData = Omit<
  CourseCol,
  "_id" | "faculties" | "students" | "lectures"
>;

// component for the list of schedule entries:
function ScheduleList({
  courseData,
  dispatchData,
}: {
  courseData: CourseData;
  dispatchData: any;
}) {
  let scheduleList: any[] = [];
  if (courseData.schedule) {
    scheduleList = Object.keys(courseData.schedule).map((day) => {
      return courseData.schedule[day as Day]!.map((entry: any) => {
        return { day, ...entry };
      });
    });
  }
  return (
    <div className={styles.when}>
      {scheduleList.map((entry, index) => (
        <ScheduleEntry key={index} entry={entry} dispatchData={dispatchData} />
      ))}
    </div>
  );
}

// component to for tne entries for the schedule:
function ScheduleEntry({
  dispatchData,
  entry,
}: {
  dispatchData: any;
  entry: any;
}) {
  const week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [day, setDay] = useState(entry.day);
  const [startTime, setStartTime] = useState(entry.startTime);
  const [endTime, setEndTime] = useState(entry.endTime);
  const [method, setMethod] = useState("add");

  return (
    <div className={styles.time}>
      <div>
        <Select
          variant="filled"
          className={styles.days}
          onChange={(e) => {
            setDay(e.target.value);
          }}
          value={day}
        >
          {week.map((day, index) => (
            <option className={styles.dayEntry} key={index} value={day}>
              {day}
            </option>
          ))}
        </Select>
      </div>
      <div className={styles.entry}>
        <Input
          type="time"
          onChange={(e) => {
            setStartTime(e.target.value);
          }}
          value={startTime}
        />
        To
        <Input
          type="time"
          onChange={(e) => {
            setEndTime(e.target.value);
          }}
          value={endTime}
        />
      </div>

      <div className={styles.dup}>
        <IconButton
          aria-label="Add Time"
          icon={<AddIcon />}
          onClick={() => {
            dispatchData({
              type: "schedule",
              payload: { day, startTime, endTime, method },
            });
          }}
        />
        <IconButton
          aria-label="Add Time"
          icon={<MinusIcon />}
          onClick={() => {
            dispatchData({
              type: "schedule",
              payload: { day, startTime, endTime, method: "remove" },
            });
          }}
        />
      </div>
    </div>
  );
}

// component for the form for the course information:
function CourseInfo({
  courseData,
  dispatchData,
}: {
  courseData: CourseData;
  dispatchData: any;
}) {
  return (
    <div className={styles.info}>
      {/* course name */}
      <FormControl>
        <FormLabel>Course Name</FormLabel>
        <Input
          placeholder="Enter Course Name"
          value={courseData.name}
          onChange={(e) =>
            dispatchData({ type: "name", payload: e.target.value })
          }
        />
      </FormControl>

      <div className={styles.infoSub}>
        {/* course code */}
        <FormControl>
          <FormLabel>Course Code</FormLabel>
          <Input
            placeholder="Enter Course Name"
            value={courseData.code}
            onChange={(e) =>
              dispatchData({ type: "code", payload: e.target.value })
            }
          />
        </FormControl>

        {/* credits */}
        <FormControl>
          <FormLabel>Course Credits</FormLabel>
          <NumberInput
            allowMouseWheel
            keepWithinRange
            defaultValue={0}
            min={0}
            value={courseData.credits}
            onChange={(value: string) =>
              dispatchData({ type: "credits", payload: Number(value) })
            }
          >
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
        <Textarea
          placeholder="Here is a sample placeholder"
          value={courseData.description}
          onChange={(e) =>
            dispatchData({ type: "description", payload: e.target.value })
          }
        />
      </div>
    </div>
  );
}

function CourseDataReducer(state: any, action: any) {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };
    case "code":
      return { ...state, code: action.payload };
    case "credits":
      return { ...state, credits: action.payload };
    case "description":
      return { ...state, description: action.payload };
    case "schedule":
      let day = action.payload.day;
      console.log(day);
      let startTime = action.payload.startTime;
      let endTime = action.payload.endTime;
      let method = action.payload.method;
      console.log(state.schedule[day]);
      if (Object.keys(state.schedule).includes(day)) {
        if (method === "add") {
          return {
            ...state,
            schedule: {
              ...state.schedule,
              [day]: [...state.schedule[day], { startTime, endTime }],
            },
          };
        } else {
          return {
            ...state,
            schedule: {
              ...state.schedule,
              [day]: state.schedule[day].filter((entry: any) => {
                return (
                  entry.startTime !== startTime && entry.endTime !== endTime
                );
              }),
            },
          };
        }
      } else {
        return {
          ...state,
          schedule: {
            ...state.schedule,
            [day]: [{ startTime, endTime }],
          },
        };
      }
    default:
      return state;
  }
}

export default function AddCourseModal({ isOpen, onClose, onOpen }: any) {
  const initialData: CourseData = {
    name: "",
    code: "",
    credits: 0,
    description: "",
    schedule: {
      Mon: [
        {
          startTime: new Date(),
          endTime: new Date(),
        },
      ],
    },
  };

  const [courseData, dispatchData] = useReducer(CourseDataReducer, initialData);
  console.log(courseData);
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
            <CourseInfo courseData={courseData} dispatchData={dispatchData} />
            <div className={styles.when}>
              <div>
                <ScheduleList
                  courseData={courseData}
                  dispatchData={dispatchData}
                />
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
