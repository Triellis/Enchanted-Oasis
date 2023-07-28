import { useCourses } from "@/lib/functions";
import Layout from "../Layout";
import { useState } from "react";
import SearchBar from "@/components/SearchBar/SearchBar";
import CourseList from "@/components/CourseList/CourseList";
import Pagination from "@/components/Pagination";
import AdminCoursesStyle from "./../Admin/Courses.module.css";
export default function MyCourses() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { courses, isLoading, error, mutate } = useCourses(
    page,
    search,
    "notenrolled"
  );
  return (
    <Layout>
      <div className={AdminCoursesStyle.courses}>
        <SearchBar searchQuery={search} setSearchQuery={setSearch} />
        <CourseList
          courses={courses}
          error={error}
          isLoading={isLoading}
          mutate={mutate}
          linkMode="overview"
        />
        <Pagination items={courses} page={page} setPage={setPage} />
      </div>
    </Layout>
  );
}
