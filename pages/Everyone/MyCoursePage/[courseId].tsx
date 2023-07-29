import CoursePlate from "@/components/CoursePlate/CoursePlate";
import Layout from "@/pages/Layout";
import { useCoursePage } from "@/lib/functions";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { MySession } from "@/lib/types";
import EnrollMemberModal from "@/components/EnrollMemberModal";
import FloatingButton from "@/components/FloatingButton";
import { useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
export default function MyCoursePage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const courseId = router.query.courseId;
  const { course, isLoading, error } = useCoursePage(courseId?.toString()!);
  const session = useSession().data as MySession;
  return (
    <Layout>
      <CoursePlate
        course={course}
        error={error}
        isLoading={isLoading}
        actionBtn={session?.user.role === "Student" ? "unenroll" : null}
        membersModal={true}
      />{" "}
      {session?.user.role === "Faculty" && (
        <FloatingButton
          onOpen={onOpen}
          SideIcon={AddIcon}
          HalfText="Enroll"
          RemainingText="New Users"
          initialWidth={6.3}
          finalWidth={11.4}
          rotateBy={180}
        />
      )}
      <EnrollMemberModal
        isOpen={isOpen}
        onClose={onClose}
        studentsOnly={session?.user.role === "Faculty"}
      />
    </Layout>
  );
}
