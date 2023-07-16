import { Tabs, TabList, Tab, TabIndicator } from "@chakra-ui/react";
import styles from "./TabsComponent.module.css";
import { useState } from "react";

interface TabsComponentProps {
  role: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  isHousePage?: boolean;
}

export default function TabsComponent({
  setPage,
  setRole,
  role,
  isHousePage,
}: TabsComponentProps) {
  const [visibleTabs, setVisibleTabs] = useState(isHousePage);

  const tabs = [
    { label: "All", role: "All" },
    { label: "Student", role: "Student" },
    { label: "Faculty", role: "Faculty" },
    { label: "Admin", role: "Admin" },
  ];

  const filteredTabs = visibleTabs ? tabs.slice(0, 3) : tabs;

  return (
    <Tabs
      className={styles.tabGrp}
      position="relative"
      variant="unstyled"
      defaultIndex={0}
      onChange={(index) => {
        setRole(filteredTabs[index].role);
        setPage(1);
      }}
    >
      <TabList className={styles.tabList}>
        {filteredTabs.map((tab, index) => (
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