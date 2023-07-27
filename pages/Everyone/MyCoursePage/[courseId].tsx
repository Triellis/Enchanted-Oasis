import CoursePlate from "@/components/CoursePlate/CoursePlate";
import Layout from "@/pages/Layout";
import { useCoursePage } from "@/lib/functions";
import { useRouter } from "next/router";
export default function MyCoursePage() {
  const router = useRouter();
  const courseId = router.query.courseId;
  const { course, isLoading, error } = useCoursePage(courseId?.toString()!);

  return (
    <Layout>
      <CoursePlate
        course={course}
        error={error}
        isLoading={isLoading}
        actionBtn={"unenroll"}
      />{" "}
    </Layout>
  );
}
