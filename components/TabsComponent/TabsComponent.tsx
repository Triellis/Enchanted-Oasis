import { Tabs, TabList, Tab, TabIndicator } from "@chakra-ui/react";
import styles from "./TabsComponent.module.css";
import { useState } from "react";
import { TabsType } from "@/lib/types";

interface TabsComponentProps {
  tab: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setTab: React.Dispatch<React.SetStateAction<string>>;
  tabs: TabsType;
}

function getColor(tabs: TabsType, value: string) {
  for (let i = 0; i < tabs.length; i++) {
    if (tabs[i].value === value) {
      return tabs[i].color;
    }
  }
}

export default function TabsComponent({
  setPage,
  setTab,
  tab,
  tabs,
}: TabsComponentProps) {
  return (
    <Tabs
      className={styles.tabGrp}
      position="relative"
      variant="unstyled"
      defaultIndex={0}
      onChange={(index) => {
        setTab(tabs[index].value); // Set the tab state to the selected tab value

        setPage(1); // Set the page state to 1 on click
      }}
    >
      <TabList className={styles.tabList}>
        {tabs.map((tab, index) => (
          <Tab key={tab.value}>{tab.label}</Tab>
        ))}
        <TabIndicator
          zIndex={-1}
          className={styles.tabIndicator}
          backgroundColor={getColor(tabs, tab)}
        />
      </TabList>
    </Tabs>
  );
}
