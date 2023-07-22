import Image from "next/image";
import { useRouter } from "next/router";
import {
  Button,
  useColorMode,
  Card,
  CardBody,
  CardFooter,
  Stack,
  Text,
} from "@chakra-ui/react";
import { MySession } from "../lib/types";

import styles from "./index.module.css";
import { useSession, signIn, signOut } from "next-auth/react";

import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import React from "react";
import { ArrowRightIcon } from "@chakra-ui/icons";

let x = 2;
if (typeof window !== "undefined") {
  if (window.innerWidth < 576) {
    x = 2.1;
  } else if (window.innerWidth < 768) {
    x = 2.2;
  } else if (window.innerWidth < 992) {
    x = 2.2;
  } else if (window.innerWidth < 1200) {
    x = 2;
  } else {
    x = 1.9; // Default value for larger screens
  }
}

export default function IndexPage() {
  const session = useSession();
  const sessionData = session.data as MySession;

  const router = useRouter();
  if (session.status === "authenticated") {
    router.push(`${sessionData?.user?.role}/Dashboard`);
  }

  // THE LANDING PAGE
  return (
    <Parallax
      pages={x}
      style={{
        backgroundImage: "url(/assets/image/bg.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <ParallaxLayer offset={0} speed={0.5}>
        <h1 className={styles.heading}>
          <span className={styles.headingTxt}>Welcome to the</span>
          <span className={styles.appName}> Enchanted Oasis</span>

          <div className={styles.icon}>
            <div className={styles.arrow}></div>
            <ArrowRightIcon />
          </div>
        </h1>
      </ParallaxLayer>

      <ParallaxLayer offset={1} speed={0.5}>
        <div className={styles.infoCard}>
          <Card
            direction={{ base: "column", sm: "row" }}
            variant="outline"
            className={styles.card}
          >
            <Stack>
              <div className={styles.imageBodyWrapper}>
                <CardBody>
                  <p className={styles.txt}>
                    <span>
                      Embark on a magical journey of discovery, where spells and
                      wonders await. Enter a realm of enchantment and unlock
                      your true potential. Step into the
                      <span className={styles.appNameTxt}>
                        {" "}
                        Enchanted Oasis{" "}
                      </span>
                      and let the magic unfold.
                    </span>

                    <Button
                      size={"lg"}
                      onClick={() => signIn()}
                      className={styles.btn}
                      backgroundColor={"hsl(var(--s))"}
                    >
                      Sign in
                    </Button>
                  </p>
                </CardBody>
                <div className={styles.imageWrapper}>
                  <Image
                    src="/assets/image/Trio.png"
                    alt="Picture of the author"
                    width={500}
                    height={500}
                  />
                </div>
              </div>
            </Stack>
          </Card>
        </div>
      </ParallaxLayer>

      <ParallaxLayer offset={2} speed={0.5} />
    </Parallax>
  );
}
