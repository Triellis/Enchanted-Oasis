import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

import styles from "./Layout.module.css";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import SidebarItem from "../components/SidebarItem";
import { MySession } from "../lib/types";

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
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const session = useSession();

  const router = useRouter();
  if (session.status === "unauthenticated") {
    router.push("/");
  }

  const data = session.data as MySession;

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const handleToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  return (
    <>
      <Head>
        <title>Enchanted Oasis</title>
        <meta name="description" content="Cool! " />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.sidebar}>
          <Sidebar isOpen={isSidebarOpen}>
            {data &&
              navItems[data?.user.role!].map((i) => {
                return <SidebarItem {...i} key={i.linkTo} />;
              })}
          </Sidebar>
        </div>
        <div className={styles.content}>
          <Nav onToggle={handleToggle} />
          <div className={styles.childContent}>{children}</div>
        </div>
      </main>
    </>
  );
}
