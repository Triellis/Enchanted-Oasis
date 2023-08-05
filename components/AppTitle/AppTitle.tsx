import React from "react";
import styles from "./AppTitle.module.css";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { MySession } from "@/lib/types";

export default function AppTitle({ sizeNumber }: { sizeNumber?: number }) {
  const titleSize = {
    fontSize: `${sizeNumber}em`,
  };

  const router = useRouter();
  const session = useSession().data as MySession;

  return (
    <div className={styles.appTitle}>
      <button
        style={titleSize}
        className={styles.appName}
        onClick={() => {
          router.push(`/${session?.user.role}/Dashboard`);
        }}
      >
        Enchanted Oasis
      </button>
    </div>
  );
}
