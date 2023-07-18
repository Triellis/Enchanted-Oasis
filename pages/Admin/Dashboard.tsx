import { useSession } from "next-auth/react";
import Layout from "../Layout";
import { Button } from "@chakra-ui/react";
import styles from "./Dashboard.module.css";
import NotifItem from "@/components/NotifItem";

export default function Admin() {
  const session = useSession();
  let name = session.data?.user?.name;
  return (
    <>
      <Layout>
        {/* greetings part */}
        <div className={styles.greeting}>
          <span>
            Welcome <span className={styles.name}>{name}</span>!{" "}
          </span>
          Let <span className={styles.glowingText}>Lumos</span> illuminate your
          path at our
          <span className={styles.appName}> Enchanted Oasis!</span>
        </div>

        <div className={styles.notifications}>
          <NotifItem />
        </div>
      </Layout>
    </>
  );
}
