import { Tabs, TabList, Tab, TabIndicator } from "@chakra-ui/react";
import styles from "./TabsComponent.module.css";
import { useState } from "react";

interface TabsComponentProps {
  role: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setRole: React.Dispatch<React.SetStateAction<string>>;
}

export default function TabsComponent({
  setPage,
  setRole,
  role,
}: TabsComponentProps) {
  const tabs = [
    { label: "All", role: "All" },
    { label: "Student", role: "Student" },
    { label: "Faculty", role: "Faculty" },
    { label: "Admin", role: "Admin" },
  ];

  return (
    <Tabs
      className={styles.tabGrp}
      position="relative"
      variant="unstyled"
      defaultIndex={0}
      onChange={(index) => {
        if (index === 0) {
          setRole("All");
        } else if (index === 1) {
          setRole("Student");
        } else if (index === 2) {
          setRole("Faculty");
        } else if (index === 3) {
          setRole("Admin");
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
          backgroundColor={
            role === "Student"
              ? "blue.600"
              : role === "Faculty"
              ? "green.600"
              : role === "Admin"
              ? "red.600"
              : "gray.600"
          }
        />
      </TabList>
    </Tabs>
  );
}
