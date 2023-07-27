import CourseList from "@/components/CourseList/CourseList";
import Layout from "../Layout";

import { useState } from "react";
import useSWR from "swr";
import { fetcher, useCourses } from "@/lib/functions";
import SearchBar from "@/components/SearchBar/SearchBar";
import Pagination from "@/components/Pagination/Pagination";
import styles from "./Courses.module.css";

export default function Courses() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { courses, isLoading, error, mutate } = useCourses(page, search, "all");

  return (
    <>
      <Layout>
        <div className={styles.courses}>
          <SearchBar searchQuery={search} setSearchQuery={setSearch} />
          <CourseList
            courses={courses}
            isLoading={isLoading}
            error={error}
            mutate={mutate}
            adminMode={true}
          />
          <Pagination items={courses} page={page} setPage={setPage} />
        </div>
      </Layout>
    </>
  );
}
