import { CourseNotifOnClient } from "@/lib/types";
import CourseNotifItem from "../CourseNotifListItem";
import styles from "./CourseNotifList.module.css";

export default function CourseNotifList({
  isLoading,
  error,
  notifications,
  mutate,
}: {
  isLoading: boolean;
  error: any;
  notifications: CourseNotifOnClient[];
  mutate: () => void;
}) {
  const transition = {
    duration: 0.3,
    ease: "easeInOut",
  };

  let componentsToRender;
  if (isLoading) {
    componentsToRender = <div>Loading...</div>;
  } else if (error) {
    componentsToRender = <div>Error</div>;
  } else {
    componentsToRender = notifications.map((notification, index) => {
      return (
        <>
          <CourseNotifItem
            key={notification._id.toString()}
            notification={notification}
            mutate={mutate}
            transition={{ ...transition, delay: index * 0.09 }}
          />
        </>
      );
    });
  }
  return <div className={styles.notifList}>{componentsToRender}</div>;
}
