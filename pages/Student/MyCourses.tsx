import { useCourses } from "@/lib/functions";
import Layout from "../Layout";
import { useState } from "react";
import SearchBar from "@/components/SearchBar/SearchBar";
import CourseList from "@/components/CourseList/CourseList";

export default function MyCourses() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { courses, isLoading, error, mutate } = useCourses(
    page,
    search,
    "enrolled"
  );
  return (
    <Layout>
      <SearchBar searchQuery={search} setSearchQuery={setSearch} />
      <CourseList
        courses={courses}
        error={error}
        isLoading={isLoading}
        mutate={mutate}
      />
    </Layout>
  );
}
