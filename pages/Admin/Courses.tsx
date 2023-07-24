import Layout from "../Layout";
import styles from "./Courses.module.css";
import classNames from "classnames";

import CourseList from "@/components/CourseList/CourseList";
import SearchBar from "@/components/SearchBar/SearchBar";
import Pagination from "@/components/Pagination/Pagination";

import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/functions";

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

function useCourses(
  page: number,
  search: string,
  type: "all" | "enrolled" | "notenrolled" | "teaching"
) {
  const { data, isLoading, error, mutate } = useSWR(
    `/api/course/list?page=${page}&type=${type}&searchQuery=${search}`,
    fetcher
  );
  return {
    courses: data,
    isLoading,
    error,
    mutate,
  };
}

function AddCourseModal({ isOpen, onClose, onOpen }: any) {
  return (
    <>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>asdkjflasfdhkjh</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default function Courses() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { courses, isLoading, error, mutate } = useCourses(page, search, "all");

  // for the modal:
  const {
    isOpen: isAddCourseOpen,
    onOpen: onAddCourseOpen,
    onClose: onAddCourseClose,
  } = useDisclosure();

  let componentToRender;
  if (isLoading) {
    componentToRender = <div>Loading...</div>;
  } else if (error) {
    componentToRender = <div>Error</div>;
  } else {
    componentToRender = <CourseList courses={courses} />;
  }

  return (
    <>
      <Layout>
        <div className={styles.courses}>
          <SearchBar searchQuery={search} setSearchQuery={setSearch} />
          {componentToRender}
          <Pagination items={courses} page={page} setPage={setPage} />

          <Button
            className={classNames(styles.courseAdd, "clicky")}
            onClick={onAddCourseOpen}
          >
            Add course
          </Button>
        </div>

        <AddCourseModal
          isOpen={isAddCourseOpen}
          onClose={onAddCourseClose}
          onOpen={onAddCourseOpen}
        />
      </Layout>
    </>
  );
}
