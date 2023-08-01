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
  useToast,
} from "@chakra-ui/react";

import React, { useState, useReducer, useEffect } from "react";
import styles from "./AddCourseModal.module.css";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { CourseCol, Day } from "@/lib/types";
type CourseData = Omit<
  CourseCol,
  "_id" | "faculties" | "students" | "lectures"
>;
function convertTimeToJSDate(timeStr: string) {
  // Split the time string into hours and minutes
  const [hours, minutes] = timeStr.split(":").map(Number);

  // Get the current date to set the year, month, and day in the Date object
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const day = currentDate.getDate();

  // Create a new Date object with the extracted time and the current date
  const jsDate = new Date(year, month, day, hours, minutes);

  return jsDate;
}
function convertTo24HourTime(jsDate: Date) {
  // Get the hours and minutes from the Date object
  const hours = jsDate.getHours();
  const minutes = jsDate.getMinutes();

  // Format the hours and minutes to ensure they have leading zeros if needed
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");

  // Combine the formatted hours and minutes into a 24-hour time string
  const timeStr = `${formattedHours}:${formattedMinutes}`;

  return timeStr;
}

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
      const data = courseData.schedule[day as Day]!.map((entry: any) => {
        return { day, ...entry };
      });

      return data;
    });
  }
  scheduleList = scheduleList.flat().reverse();

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
  useEffect(() => {
    setDay(entry.day);
    setStartTime(entry.startTime);
    setEndTime(entry.endTime);
  }, [entry]);

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
            setStartTime(convertTimeToJSDate(e.target.value));
          }}
          value={convertTo24HourTime(startTime)}
        />
        To
        <Input
          type="time"
          onChange={(e) => {
            setEndTime(convertTimeToJSDate(e.target.value));
          }}
          value={convertTo24HourTime(endTime)}
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
      let startTime = action.payload.startTime;
      let endTime = action.payload.endTime;
      let method = action.payload.method;
      if (Object.keys(state.schedule).includes(day)) {
        if (method === "add") {
          const stateClone = structuredClone(state);

          stateClone.schedule[day].push({ startTime, endTime });

          return stateClone;
        } else {
          const remainingEntries = state.schedule[day].filter((entry: any) => {
            return !(
              entry.startTime === startTime && entry.endTime === endTime
            );
          });

          if (remainingEntries.length === 0) {
            // If the last entry is being removed, do not update the state for that day.
            return state;
          } else {
            return {
              ...state,
              schedule: {
                ...state.schedule,
                [day]: remainingEntries,
              },
            };
          }
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

    case "reset":
      return action.payload;
    default:
      return state;
  }
}

async function postCourse(
  courseData: CourseData,
  toast: any,
  onClose: any,
  mutate: any,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  // remove empty array in schedule days
  Object.keys(courseData.schedule).forEach((day) => {
    if (courseData.schedule[day as Day]!.length === 0) {
      delete courseData.schedule[day as Day];
    }
  });

  setIsLoading(true);
  const res = await fetch("/api/course", {
    method: "POST",
    body: JSON.stringify(courseData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.status === 200) {
    toast({
      title: "Course Added",
      description: "Course has been added successfully",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  } else {
    toast({
      title: "Error",
      description: "Course could not be added",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }
  setIsLoading(false);
  onClose();
  mutate();
}

export default function AddCourseModal({
  isOpen,
  onClose,
  onOpen,
  mutate,
}: any) {
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
  const toast = useToast();
  useEffect(() => {
    dispatchData({ type: "reset", payload: initialData });
  }, [isOpen]);

  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        motionPreset="slideInBottom"
        size="3xl"
        scrollBehavior="inside"
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent bg="hsl(var(--b1))">
          {/* header */}
          <ModalHeader>Add Course</ModalHeader>

          {/* modal content */}
          <ModalBody className={styles.modalBody}>
            <div className={styles.modalBodyWrapper}>
              <CourseInfo courseData={courseData} dispatchData={dispatchData} />
              <div className={styles.when}>
                <div>
                  <ScheduleList
                    courseData={courseData}
                    dispatchData={dispatchData}
                  />
                </div>
              </div>
            </div>
          </ModalBody>

          {/* footer */}
          <ModalFooter className={styles.modalFooter}>
            <Button className="modalNoBtn" onClick={onClose}>
              Close
            </Button>
            <Button
              isLoading={isLoading}
              className="modalYesBtn"
              onClick={() =>
                postCourse(courseData, toast, onClose, mutate, setIsLoading)
              }
            >
              Add Course
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
