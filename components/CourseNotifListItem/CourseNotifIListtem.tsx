import { CourseNotifOnClient, MySession } from "@/lib/types";
import MotionDiv from "../MotionDiv";
import classNames from "classnames";
import {
  Avatar,
  Badge,
  Flex,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { formatDateTime, getRoleColor } from "@/lib/functions";
import AdminNotifStyles from "@/components/NotifItem/NotifItem.module.css";
import Link from "next/link";
import { DeleteIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { DeleteConfirmationModal } from "../NotifItem/NotifItem";
import { useSession } from "next-auth/react";
import FilePreview from "../FilePreview";

export default function CourseNotifItem({
  notification,
  mutate,
  transition,
}: {
  notification: CourseNotifOnClient;
  mutate: () => void;
  transition: any;
}) {
  const router = useRouter();
  const courseId = router.query.courseId as string;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const session = useSession().data as MySession;

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <MotionDiv
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      transition={{
        transition,
      }}
      className={classNames(AdminNotifStyles.notifItem)}
    >
      <div className={AdminNotifStyles.header}>
        {/* Avatar, name, email */}
        <Flex gap={4}>
          <Avatar src={notification.creator.profilePicture} />
          <div>
            <Text fontSize="sm">{notification.creator.name}</Text>
            <Text fontSize="sm" color={"hsl(var(--nc)  )"}>
              {notification.creator.email}
            </Text>
          </div>
        </Flex>
      </div>
      <Link
        className={AdminNotifStyles.link}
        href={`/Everyone/Notification/${notification._id}?courseId=${courseId}`}
      >
        <div className={AdminNotifStyles.body}>
          {/* Title and Content */}
          <span className={AdminNotifStyles.title}>
            <Text fontWeight="bold" fontSize="1.1em">
              {notification.title}
            </Text>
          </span>
          <Text fontSize="sm" color={"hsl(var(--pc) /70% )"}>
            {notification.body}
          </Text>
        </div>
      </Link>

      <div className={AdminNotifStyles.footer}>
        {/* Date and time without icons */}

        <Text fontSize="sm" color="hsl(var(--nc) )">
          {formatDateTime(new Date(notification.date))}
        </Text>

        {/* Badge */}
        <Flex>
          <div className={AdminNotifStyles.badgesWrapper}>
            <Badge colorScheme={notification.badgeColor}>
              {" "}
              {notification.badgeText}{" "}
            </Badge>
          </div>
          <Spacer />
          {session!.user.role === "Faculty" && (
            <button
              className={AdminNotifStyles.del}
              aria-label="delete"
              onClick={onOpen}
            >
              <DeleteIcon />
            </button>
          )}
          <DeleteConfirmationModal
            isOpen={isOpen}
            onClose={onClose}
            notificationId={notification._id.toString()}
            courseId={courseId}
            mutate={mutate}
          />
        </Flex>
      </div>

      {notification.attachment && <FilePreview url={notification.attachment} />}
    </MotionDiv>
  );
}
