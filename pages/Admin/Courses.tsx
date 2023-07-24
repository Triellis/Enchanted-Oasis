import CourseList from "@/components/CourseList/CourseList";
import Layout from "../Layout";

import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/functions";
import SearchBar from "@/components/SearchBar/SearchBar";
import Pagination from "@/components/Pagination/Pagination";

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
        <SearchBar searchQuery={search} setSearchQuery={setSearch} />
        {componentToRender}
        <Pagination items={courses} page={page} setPage={setPage} />
      </Layout>
    </>
  );
}
