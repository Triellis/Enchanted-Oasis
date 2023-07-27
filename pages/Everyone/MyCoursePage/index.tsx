import CourseList from "@/components/CourseList/CourseList";
import Layout from "@/pages/Layout";

import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/functions";
import SearchBar from "@/components/SearchBar/SearchBar";
import Pagination from "@/components/Pagination/Pagination";
import styles from "./Courses.module.css";

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
          />
          <Pagination items={courses} page={page} setPage={setPage} />
        </div>
      </Layout>
    </>
  );
}
