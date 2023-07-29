import { CourseNotifOnClient } from "@/lib/types";
import NotifItem from "../NotifItem/NotifItem";

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
  let componentsToRender;
  if (isLoading) {
    componentsToRender = <div>Loading...</div>;
  } else if (error) {
    componentsToRender = <div>Error</div>;
  } else {
    componentsToRender = notifications.map((notification) => {
      return <div>{"Yo"}</div>;
    });
  }
  return <div>{componentsToRender}</div>;
}
