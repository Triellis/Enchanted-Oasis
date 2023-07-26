import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

import styles from "./Layout.module.css";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { useState, useRef } from "react";
import SidebarItem from "../components/SidebarItem";
import { MySession } from "../lib/types";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { toggleSidebar } from "@/lib/slices/isSidebarOpen";

const navItems: {
  [key: string]: {
    text: string;
    linkTo: string;
  }[];
} = {
  Admin: [
    { text: "Dashboard", linkTo: "/Admin/Dashboard" },
    { text: "Users", linkTo: "/Admin/Users" },
    { text: "Houses", linkTo: "/Everyone/Houses" },
    { text: "Courses", linkTo: "/Admin/Courses" },
  ],
  Student: [
    { text: "Dashboard", linkTo: "/Student/Dashboard" },
    { text: "Houses", linkTo: "/Everyone/Houses" },
  ],
  Faculty: [
    { text: "Dashboard", linkTo: "/Faculty/Dashboard" },
    { text: "Houses", linkTo: "/Everyone/Houses" },
  ],
};
function toggleTheme(mainRef: React.RefObject<HTMLDivElement>) {
  if (!mainRef.current) return;
  let theme = localStorage.getItem("data-theme");

  if (theme === "dark") {
    mainRef.current.setAttribute("data-theme", "light");
    localStorage.setItem("data-theme", "light");
    theme = "light";
  } else {
    mainRef.current.setAttribute("data-theme", "dark");
    localStorage.setItem("data-theme", "dark");
    theme = "dark";
  }
}
export default function Layout({ children }: { children: React.ReactNode }) {
  const session = useSession();

  const router = useRouter();
  if (session.status === "unauthenticated") {
    router.push("/");
  }

  const data = session.data as MySession;
  const isSidebarOpen = useAppSelector((state) => state.isSidebarOpen.value);
  const dispatch = useAppDispatch();

  const mainRef = useRef<HTMLDivElement>(null);
  // logic for changing the theme:

  return (
    <>
      <Head>
        <title>Enchanted Oasis</title>
        <meta name="description" content="Cool! " />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main} ref={mainRef}>
        <div className={styles.sidebar}>
          <Sidebar isOpen={isSidebarOpen}>
            {data &&
              navItems[data?.user.role!].map((i) => {
                return <SidebarItem {...i} key={i.linkTo} />;
              })}
          </Sidebar>
        </div>
        <div className={styles.content}>
          <Nav
            onToggle={() => dispatch(toggleSidebar())}
            toggleTheme={() => toggleTheme(mainRef)}
          />
          <div className={styles.childContent}>{children}</div>
        </div>
      </main>
    </>
  );
}
