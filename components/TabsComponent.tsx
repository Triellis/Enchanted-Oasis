import { Tabs, TabList, Tab, TabIndicator } from "@chakra-ui/react";
import styles from "./TabsComponent.module.css";
import { useState } from "react";

interface TabsComponentProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setRole: React.Dispatch<React.SetStateAction<string>>;
}

export default function TabsComponent({
  setPage,
  setRole,
}: TabsComponentProps) {
  const [role, setTabRole] = useState("All");

  return (
    <Tabs
      className={styles.tabGrp}
      position="relative"
      variant="unstyled"
      defaultIndex={0}
      onChange={(index) => {
        if (index === 0) {
          setTabRole("All");
        } else if (index === 1) {
          setTabRole("Student");
        } else if (index === 2) {
          setTabRole("Faculty");
        } else if (index === 3) {
          setTabRole("Admin");
        }
        setPage(1); // Set the page state to 1 on click
        setRole(role); // Set the role state based on the clicked tab
      }}
    >
      <TabList className={styles.tabList}>
        <Tab>All</Tab>
        <Tab>Student</Tab>
        <Tab>Faculty</Tab>
        <Tab>Admin</Tab>
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
