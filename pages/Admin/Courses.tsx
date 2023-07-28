import Layout from "../Layout";
import styles from "./Courses.module.css";
import classNames from "classnames";

import CourseList from "@/components/CourseList/CourseList";
import SearchBar from "@/components/SearchBar/SearchBar";
import Pagination from "@/components/Pagination/Pagination";
import AddCourseModal from "@/components/AddCourseModal/AddCourseModal";

import { useState } from "react";
import useSWR from "swr";
import { fetcher, useCourses } from "@/lib/functions";

import { Button, useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

export default function Courses() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { courses, isLoading, error, mutate } = useCourses(page, search, "all");

  // for the modal
  const {
    isOpen: isAddCourseOpen,
    onOpen: onAddCourseOpen,
    onClose: onAddCourseClose,
  } = useDisclosure();

  return (
    <>
      <Layout>
        <div className={styles.courses}>
          <SearchBar
            searchQuery={search}
            setSearchQuery={setSearch}
            setPage={setPage}
          />
          <CourseList
            courses={courses}
            isLoading={isLoading}
            error={error}
            mutate={mutate}
            adminMode={true}
          />
          <Pagination items={courses} page={page} setPage={setPage} />

          <button className={styles.courseAdd} onClick={onAddCourseOpen}>
            <AddIcon className={styles.icon} />
            Add{" "}
          </button>
        </div>

        <AddCourseModal
          isOpen={isAddCourseOpen}
          onClose={onAddCourseClose}
          onOpen={onAddCourseOpen}
          mutate={mutate}
        />
      </Layout>
    </>
  );
}
