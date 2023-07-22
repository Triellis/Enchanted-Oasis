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
      pages={2}
      style={{
        backgroundImage: "url(/assets/image/bg.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <ParallaxLayer offset={0} speed={0.5}>
        <div className={styles.heading}>
          <div className={styles.headerTxt}>Welcome to the</div>
          <div className={styles.appName}> Enchanted Oasis</div>
          <div className={styles.icon}>
            <ArrowRightIcon />
          </div>
        </div>
      </ParallaxLayer>

      <ParallaxLayer offset={1} speed={0.5}>
        <div className={styles.infoCard}>
          <Card
            direction={{ base: "column", sm: "row" }}
            variant="outline"
            className={styles.card}
          >
            <Stack>
              <CardBody className={styles.cardBody}>
                <div className={styles.imageWrapper}>
                  <Image
                    src="/assets/image/Trio.png"
                    alt="Picture of the author"
                    width={500}
                    height={500}
                  />
                </div>
                <div className={styles.txtWrap}>
                  <div className={styles.txt}>
                    Embark on a magical journey of discovery, where spells and
                    wonders await. Enter a realm of enchantment and unlock your
                    true potential. Step into the
                    <span className={styles.appNameTxt}> Enchanted Oasis </span>
                    and let the magic unfold.
                  </div>
                  <div className={styles.btnPos}>
                    <Button
                      size={"lg"}
                      onClick={() => signIn()}
                      className={styles.btn}
                      backgroundColor={"hsl(var(--s))"}
                    >
                      Sign in
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Stack>
          </Card>
        </div>
      </ParallaxLayer>
    </Parallax>
  );
}
