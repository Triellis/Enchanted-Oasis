import { fetcher } from "@/lib/functions";
import { AdminNotificationOnClient } from "@/lib/types";
import useSWR from "swr";
import NotifItem from "@/components/NotifItem";
import { useEffect, useMemo, useState } from "react";
import Pagination from "@/components/Pagination";

import styles from "./NotifList.module.css";
import {
  Divider,
} from "@chakra-ui/react";
import TabsComponent from "../TabsComponent/TabsComponent";

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

export default function NotifList({
  adminMode = false,
}: {
  adminMode?: boolean;
}) {
  const [page, setPage] = useState(1);
  const [inbox, setInbox] = useState("Unseen");

  const transition = {
    duration: 0.3,
    ease: "easeInOut",
  };

  const [unseenOnly, setUnseenOnly] = useState(false);
  const tabs = useMemo(
    () => [
      { value: "Unseen", label: "Unseen", color: "red.600" },
      { value: "All", label: "All", color: "Gray" },
    ],
    []
  );

  useEffect(() => {
    if (inbox === "Unseen") {
      setUnseenOnly(true);
    } else if (inbox === "All") {
      setUnseenOnly(false);
    }
  }, [inbox]);
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
    if (notifications.length === 0) {
      if (inbox === "Unseen") {
        componentToRender = <div>No New Notifications</div>;
      } else if (inbox === "All") {
        componentToRender = <div>No notifications</div>;
      }
    } else {
      componentToRender = (
        <>
          {notifications.map((notification, index) => (
            <NotifItem
              key={notification._id.toString()}
              notification={notification}
              adminMode={adminMode}
              transition={{ ...transition, delay: index * 0.09 }}
            />
          ))}
        </>
      );
    }
  }

  return (
    <div className={styles.parent}>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>Admin Notifications</h1>
        <Divider maxW={1080} />
      </div>

      {/* tabs here */}
      <div className={styles.wrapTab}>
        <TabsComponent
          tabs={tabs}
          setPage={setPage}
          setTab={setInbox}
          tab={inbox}
        />
      </div>

      <div className={styles.notifList}>{componentToRender}</div>
      <br />
      {notifications && notifications.length > 0 && (
        <Pagination page={page} setPage={setPage} items={notifications} />
      )}
    </div>
  );
}
