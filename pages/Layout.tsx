import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

import styles from "./Layout.module.css";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const session = useSession();

  const router = useRouter();
  if (session.status === "unauthenticated") {
    router.push("/");
  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
          <Sidebar isOpen={isSidebarOpen} />
        </div>
        <div className={styles.content}>
          <Nav onToggle={handleToggle} />
          <div>{children}</div>
        </div>
      </main>
    </>
  );
}
