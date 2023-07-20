import { fetcher } from "@/lib/functions";
import { AdminNotificationOnClient } from "@/lib/types";
import useSWR from "swr";
import NotifItem from "./NotifItem";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";

import styles from "./NotifList.module.css";
import { Divider, Tab, TabIndicator, TabList, Tabs } from "@chakra-ui/react";

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

interface TabsComponentProps {
  inbox: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setInbox: React.Dispatch<React.SetStateAction<string>>;
}

function InboxTabs({ inbox, setPage, setInbox }: TabsComponentProps) {
  const tabs = [
    { label: "Unseen", inbox: "Unseen" },
    { label: "All", inbox: "All" },
  ];

  return (
    <Tabs
      className={styles.tabGrp}
      position="relative"
      variant="unstyled"
      defaultIndex={0}
      onChange={(index) => {
        if (index === 0) {
          setInbox("Unseen");
        } else if (index === 1) {
          setInbox("All");
        }
        setPage(1); // Set the page state to 1 on click
      }}
    >
      <TabList className={styles.tabList}>
        {tabs.map((tab, index) => (
          <Tab key={index}>{tab.label}</Tab>
        ))}
        <TabIndicator
          zIndex={-1}
          className={styles.tabIndicator}
          backgroundColor={inbox === "Unseen" ? "red.600" : "gray.600"}
        />
      </TabList>
    </Tabs>
  );
}

export default function NotifList() {
  const [page, setPage] = useState(1);
  const [inbox, setInbox] = useState("Unseen");

  const [unseenOnly, setUnseenOnly] = useState(false);
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
      componentToRender = <div>No notifications</div>;
    } else {
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
  }

  return (
    <div className={styles.parent}>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>Admin Notifications</h1>
      </div>

      {/* tabs here */}
      <Divider />
      <div className={styles.wrapTab}>
        <InboxTabs inbox={inbox} setPage={setPage} setInbox={setInbox} />
      </div>

      <div className={styles.notifList}>{componentToRender}</div>
      <br />
      {notifications && notifications.length > 0 && (
        <Pagination page={page} setPage={setPage} items={notifications} />
      )}
    </div>
  );
}
