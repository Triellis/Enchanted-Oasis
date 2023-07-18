import { fetcher } from "@/lib/functions";
import { AdminNotificationOnClient } from "@/lib/types";
import useSWR from "swr";
import NotifItem from "./NotifItem";
import { useState } from "react";
import Pagination from "./Pagination";

import styles from "./NotifList.module.css";

function useNotifications(page: number, unseenOnly: boolean) {
  const { data, error, mutate } = useSWR(
    `/api/notification?page=${page}&unseenOnly=${unseenOnly}`,
    fetcher,
    { refreshInterval: 1000 }
  );
  return {
    notifications: data as AdminNotificationOnClient[],
    isLoading: !error && !data,
    isError: error,

    mutate,
  };
}

export default function NotifList() {
  const [page, setPage] = useState(1);
  const [unseenOnly, setUnseenOnly] = useState(false);
  const { notifications, isLoading, isError, mutate } = useNotifications(
    page,
    unseenOnly
  );
  let componentToRender;
  if (isLoading) {
    componentToRender = <div>Loading...</div>;
  }
  if (isError) {
    componentToRender = <div>Error</div>;
  }
  if (notifications) {
    componentToRender = (
      <>
        {notifications.map((notification) => (
          <NotifItem
            key={notification._id.toString()}
            notification={notification}
          />
        ))}
      </>
    );
  }

  return (
    <div className={styles.notifList} >
      {componentToRender}
      <Pagination page={page} setPage={setPage} items={notifications} />
    </div>
  );
}
